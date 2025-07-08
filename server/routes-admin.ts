import type { Express } from "express";
import Stripe from "stripe";
import { storage } from "./storage";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

export function registerAdminRoutes(app: Express) {
  // Admin dashboard stats
  app.get("/api/admin/dashboard-stats", async (req, res) => {
    try {
      // In a real app, you'd check admin authentication here
      
      // Get payment statistics from Stripe
      const charges = await stripe.charges.list({
        limit: 100,
        created: {
          gte: Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60), // Last 30 days
        },
      });

      const totalRevenue = charges.data
        .filter(charge => charge.status === 'succeeded')
        .reduce((sum, charge) => sum + charge.amount, 0) / 100; // Convert from cents

      const totalStudents = await getTotalStudents();
      const totalCourses = 3; // General English, CEFR, Combo
      const monthlyGrowth = calculateMonthlyGrowth(charges.data);

      const recentPayments = charges.data.slice(0, 10).map(charge => ({
        id: charge.id,
        customerEmail: charge.billing_details?.email || 'N/A',
        customerName: charge.billing_details?.name || 'N/A',
        amount: charge.amount / 100,
        currency: charge.currency,
        status: charge.status,
        courseType: charge.metadata?.courseType || 'General English',
        planDuration: charge.metadata?.planDuration || '1 month',
        createdAt: new Date(charge.created * 1000).toISOString(),
        stripePaymentId: charge.id
      }));

      res.json({
        totalRevenue,
        totalStudents,
        totalCourses,
        monthlyGrowth,
        recentPayments
      });
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error fetching dashboard stats: " + error.message 
      });
    }
  });

  // Get all payments for admin management
  app.get("/api/admin/payments", async (req, res) => {
    try {
      const charges = await stripe.charges.list({
        limit: 100,
        expand: ['data.customer']
      });

      const payments = charges.data.map(charge => ({
        id: charge.id,
        customerEmail: charge.billing_details?.email || 'N/A',
        customerName: charge.billing_details?.name || 'N/A',
        amount: charge.amount / 100,
        currency: charge.currency,
        status: charge.status,
        courseType: charge.metadata?.courseType || 'General English',
        planDuration: charge.metadata?.planDuration || '1 month',
        createdAt: new Date(charge.created * 1000).toISOString(),
        stripePaymentId: charge.id,
        refunded: charge.refunded
      }));

      res.json(payments);
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error fetching payments: " + error.message 
      });
    }
  });

  // Process refund
  app.post("/api/admin/payments/:paymentId/refund", async (req, res) => {
    try {
      const { paymentId } = req.params;
      
      const refund = await stripe.refunds.create({
        charge: paymentId,
      });

      res.json({
        success: true,
        refund: {
          id: refund.id,
          amount: refund.amount / 100,
          status: refund.status,
          created: new Date(refund.created * 1000).toISOString()
        }
      });
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error processing refund: " + error.message 
      });
    }
  });

  // Get customer details
  app.get("/api/admin/customers", async (req, res) => {
    try {
      const customers = await stripe.customers.list({
        limit: 100,
      });

      const customerData = customers.data.map(customer => ({
        id: customer.id,
        email: customer.email,
        name: customer.name,
        created: new Date(customer.created * 1000).toISOString(),
        subscriptions: customer.subscriptions?.data?.length || 0
      }));

      res.json(customerData);
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error fetching customers: " + error.message 
      });
    }
  });

  // Webhook endpoint for Stripe events
  app.post("/api/webhooks/stripe", async (req, res) => {
    try {
      const sig = req.headers['stripe-signature'];
      
      // In production, you should verify the webhook signature
      // const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
      
      const event = req.body;

      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log('Payment succeeded:', paymentIntent.id);
          // Handle successful payment (e.g., grant course access)
          break;
        
        case 'payment_intent.payment_failed':
          const failedPayment = event.data.object;
          console.log('Payment failed:', failedPayment.id);
          // Handle failed payment
          break;
        
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (error: any) {
      res.status(400).json({ 
        message: "Webhook error: " + error.message 
      });
    }
  });
}

// Helper functions
async function getTotalStudents(): Promise<number> {
  // In a real app, this would query your user database
  // For now, return a mock number based on enrollments
  try {
    const charges = await stripe.charges.list({
      limit: 100,
      status: 'succeeded'
    });
    
    const uniqueEmails = new Set(
      charges.data
        .filter(charge => charge.billing_details?.email)
        .map(charge => charge.billing_details!.email)
    );
    
    return uniqueEmails.size;
  } catch {
    return 0;
  }
}

function calculateMonthlyGrowth(charges: Stripe.Charge[]): number {
  const now = new Date();
  const thisMonth = charges.filter(charge => {
    const chargeDate = new Date(charge.created * 1000);
    return chargeDate.getMonth() === now.getMonth() && 
           chargeDate.getFullYear() === now.getFullYear();
  });
  
  const lastMonth = charges.filter(charge => {
    const chargeDate = new Date(charge.created * 1000);
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);
    return chargeDate.getMonth() === lastMonthDate.getMonth() && 
           chargeDate.getFullYear() === lastMonthDate.getFullYear();
  });
  
  if (lastMonth.length === 0) return 100;
  
  const growth = ((thisMonth.length - lastMonth.length) / lastMonth.length) * 100;
  return Math.round(growth);
}