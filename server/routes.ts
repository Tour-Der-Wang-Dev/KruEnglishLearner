import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { registerAdminRoutes } from "./routes-admin";
import { insertUserSchema, insertContactSchema, insertLevelTestSchema } from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching courses: " + error.message });
    }
  });

  // Get course by ID
  app.get("/api/courses/:id", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching course: " + error.message });
    }
  });

  // Get all teachers
  app.get("/api/teachers", async (req, res) => {
    try {
      const teachers = await storage.getAllTeachers();
      res.json(teachers);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching teachers: " + error.message });
    }
  });

  // Get schedules by course type
  app.get("/api/schedules/:courseType", async (req, res) => {
    try {
      const courseType = req.params.courseType;
      const schedules = await storage.getSchedulesByCourseType(courseType);
      
      // Join with teacher data
      const schedulesWithTeachers = await Promise.all(
        schedules.map(async (schedule) => {
          const teacher = await storage.getTeacher(schedule.teacherId!);
          return { ...schedule, teacher };
        })
      );
      
      res.json(schedulesWithTeachers);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching schedules: " + error.message });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ message: "ข้อความของคุณถูกส่งแล้ว เราจะติดต่อกลับโดยเร็วที่สุด", contact });
    } catch (error: any) {
      res.status(400).json({ message: "Error submitting contact form: " + error.message });
    }
  });

  // Submit level test
  app.post("/api/level-test", async (req, res) => {
    try {
      const { userId, answers } = req.body;
      
      // Simple scoring logic (you can make this more sophisticated)
      const score = answers.filter((answer: string) => answer === "correct").length;
      let level = "A1";
      if (score >= 15) level = "B1";
      else if (score >= 10) level = "A2";

      const levelTestData = {
        userId: userId || null,
        level,
        score
      };

      const levelTest = await storage.createLevelTest(levelTestData);
      res.json({ level, score, recommendation: getRecommendation(level) });
    } catch (error: any) {
      res.status(500).json({ message: "Error processing level test: " + error.message });
    }
  });

  // Create payment intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, courseId, userEmail, userName } = req.body;
      
      let user = await storage.getUserByEmail(userEmail);
      if (!user) {
        user = await storage.createUser({
          email: userEmail,
          name: userName,
          phone: null
        });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to satang (Thai currency cents)
        currency: "thb",
        metadata: {
          courseId: courseId.toString(),
          userId: user.id.toString()
        }
      });

      // Create enrollment record
      await storage.createEnrollment({
        userId: user.id,
        courseId,
        status: "pending",
        paymentIntentId: paymentIntent.id,
        endDate: null
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id 
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Confirm payment and activate enrollment
  app.post("/api/confirm-payment", async (req, res) => {
    try {
      const { paymentIntentId } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === "succeeded") {
        const enrollment = await storage.getEnrollmentByPaymentIntent(paymentIntentId);
        if (enrollment) {
          // Update enrollment status (in a real implementation, you'd update the database)
          res.json({ 
            success: true, 
            message: "การชำระเงินสำเร็จ คุณสามารถเข้าเรียนได้แล้ว",
            enrollmentId: enrollment.id 
          });
        } else {
          res.status(404).json({ message: "Enrollment not found" });
        }
      } else {
        res.status(400).json({ message: "Payment not completed" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Error confirming payment: " + error.message });
    }
  });

  // Get user enrollments
  app.get("/api/enrollments/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const enrollments = await storage.getUserEnrollments(userId);
      
      // Join with course data
      const enrollmentsWithCourses = await Promise.all(
        enrollments.map(async (enrollment) => {
          const course = await storage.getCourse(enrollment.courseId!);
          return { ...enrollment, course };
        })
      );
      
      res.json(enrollmentsWithCourses);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching enrollments: " + error.message });
    }
  });

  // Register admin routes
  registerAdminRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}

function getRecommendation(level: string): string {
  switch (level) {
    case "A1":
      return "แนะนำให้เริ่มต้นด้วย General English เพื่อสร้างพื้นฐานที่แข็งแกรง";
    case "A2":
      return "เหมาะสำหรับ CEFR Platinum English เพื่อพัฒนาสู่ระดับ B1";
    case "B1":
      return "คุณมีพื้นฐานที่ดีแล้ว แนะนำ Combo Small Group เพื่อพัฒนาการสนทนา";
    default:
      return "แนะนำให้เริ่มต้นด้วย General English";
  }
}
