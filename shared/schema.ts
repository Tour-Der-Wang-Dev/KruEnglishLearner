import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'general', 'cefr', 'combo'
  price: integer("price").notNull(),
  duration: text("duration").notNull(),
  description: text("description").notNull(),
  features: json("features").$type<string[]>().notNull(),
  isPopular: boolean("is_popular").default(false),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  courseId: integer("course_id").references(() => courses.id),
  status: text("status").notNull().default("active"), // 'active', 'completed', 'cancelled'
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  paymentIntentId: text("payment_intent_id"),
});

export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'native', 'thai'
  specialty: text("specialty").notNull(),
  schedule: text("schedule").notNull(),
  bio: text("bio"),
  imageUrl: text("image_url"),
});

export const schedules = pgTable("schedules", {
  id: serial("id").primaryKey(),
  teacherId: integer("teacher_id").references(() => teachers.id),
  courseType: text("course_type").notNull(),
  dayOfWeek: text("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  zoomLink: text("zoom_link"),
});

export const levelTests = pgTable("level_tests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  level: text("level").notNull(), // 'A1', 'A2', 'B1'
  score: integer("score").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  startDate: true,
});

export const insertTeacherSchema = createInsertSchema(teachers).omit({
  id: true,
});

export const insertScheduleSchema = createInsertSchema(schedules).omit({
  id: true,
});

export const insertLevelTestSchema = createInsertSchema(levelTests).omit({
  id: true,
  completedAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;

export type Teacher = typeof teachers.$inferSelect;
export type InsertTeacher = z.infer<typeof insertTeacherSchema>;

export type Schedule = typeof schedules.$inferSelect;
export type InsertSchedule = z.infer<typeof insertScheduleSchema>;

export type LevelTest = typeof levelTests.$inferSelect;
export type InsertLevelTest = z.infer<typeof insertLevelTestSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
