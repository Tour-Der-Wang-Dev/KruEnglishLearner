import Stripe from 'stripe';

export interface IPaymentService {
  createPaymentIntent(amount: number, currency?: string): Promise<string>;
  confirmPayment(paymentIntentId: string): Promise<boolean>;
  createCustomer(email: string, name: string): Promise<string>;
  createSubscription(customerId: string, priceId: string): Promise<{
    subscriptionId: string;
    clientSecret: string;
  }>;
}

export class StripePaymentService implements IPaymentService {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2025-06-30.basil',
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'thb'): Promise<string> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to smallest currency unit
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      if (!paymentIntent.client_secret) {
        throw new Error('Failed to create payment intent');
      }

      return paymentIntent.client_secret;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<boolean> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent.status === 'succeeded';
    } catch (error) {
      console.error('Error confirming payment:', error);
      return false;
    }
  }

  async createCustomer(email: string, name: string): Promise<string> {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
      });

      return customer.id;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Failed to create customer');
    }
  }

  async createSubscription(customerId: string, priceId: string): Promise<{
    subscriptionId: string;
    clientSecret: string;
  }> {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: priceId,
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;

      if (!paymentIntent.client_secret) {
        throw new Error('Failed to create subscription payment intent');
      }

      return {
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
      };
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error('Failed to create subscription');
    }
  }
}

export class PaymentServiceFactory {
  private static instance: IPaymentService;

  static getInstance(): IPaymentService {
    if (!this.instance) {
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeSecretKey) {
        throw new Error('STRIPE_SECRET_KEY environment variable is required');
      }
      this.instance = new StripePaymentService(stripeSecretKey);
    }
    return this.instance;
  }
}