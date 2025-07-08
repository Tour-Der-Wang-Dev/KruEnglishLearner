import { 
  users, courses, enrollments, teachers, schedules, levelTests, contacts,
  type User, type InsertUser, type Course, type InsertCourse,
  type Enrollment, type InsertEnrollment, type Teacher, type InsertTeacher,
  type Schedule, type InsertSchedule, type LevelTest, type InsertLevelTest,
  type Contact, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(id: number, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User>;

  // Courses
  getAllCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Enrollments
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  getUserEnrollments(userId: number): Promise<Enrollment[]>;
  getEnrollmentByPaymentIntent(paymentIntentId: string): Promise<Enrollment | undefined>;

  // Teachers
  getAllTeachers(): Promise<Teacher[]>;
  getTeacher(id: number): Promise<Teacher | undefined>;
  createTeacher(teacher: InsertTeacher): Promise<Teacher>;

  // Schedules
  getSchedulesByTeacher(teacherId: number): Promise<Schedule[]>;
  getSchedulesByCourseType(courseType: string): Promise<Schedule[]>;
  createSchedule(schedule: InsertSchedule): Promise<Schedule>;

  // Level Tests
  createLevelTest(levelTest: InsertLevelTest): Promise<LevelTest>;
  getUserLevelTests(userId: number): Promise<LevelTest[]>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private enrollments: Map<number, Enrollment>;
  private teachers: Map<number, Teacher>;
  private schedules: Map<number, Schedule>;
  private levelTests: Map<number, LevelTest>;
  private contacts: Map<number, Contact>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.enrollments = new Map();
    this.teachers = new Map();
    this.schedules = new Map();
    this.levelTests = new Map();
    this.contacts = new Map();
    this.currentId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample courses
    const sampleCourses: Course[] = [
      {
        id: 1,
        name: "General English",
        type: "general",
        price: 390,
        duration: "1 เดือน",
        description: "เรียนทุกวัน 2 ชั่วโมง",
        features: ["เรียนทุกวัน 2 ชั่วโมง", "เอกสารประกอบการเรียนฟรี", "วิดีโอย้อนหลัง 24/7"],
        isPopular: false,
      },
      {
        id: 2,
        name: "CEFR Platinum English",
        type: "cefr",
        price: 590,
        duration: "ต่อเดือน (4 เดือน)",
        description: "A1-B1 พร้อมใบเซอร์",
        features: ["120 ชั่วโมงเรียน", "สัปดาห์ละ 2 ชั่วโมง", "วัดระดับก่อนเรียน", "รับใบเซอร์ระดับโลก"],
        isPopular: true,
      },
      {
        id: 3,
        name: "Combo Small Group",
        type: "combo",
        price: 1500,
        duration: "8 ชั่วโมง",
        description: "กลุ่มเล็ก 5 คน",
        features: ["กลุ่มเล็ก 5 คนเท่านั้น", "เน้นการสนทนา", "จัดกลุ่มตามระดับ", "ความสนใจส่วนตัวสูง"],
        isPopular: false,
      }
    ];

    // Sample teachers
    const sampleTeachers: Teacher[] = [
      {
        id: 1,
        name: "ครู John",
        type: "native",
        specialty: "เน้นการออกเสียงและสำเนียง",
        schedule: "จันทร์-ศุกร์ 19:00-21:00",
        bio: "Native English speaker from USA with 10+ years teaching experience",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 2,
        name: "ครูมาริสา",
        type: "thai",
        specialty: "ไวยากรณ์และโครงสร้างประโยค",
        schedule: "เสาร์-อาทิตย์ 14:00-16:00",
        bio: "ครูไทยที่มีประสบการณ์สอนภาษาอังกฤษมากว่า 8 ปี",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616c5e25900?w=150&h=150&fit=crop&crop=face"
      }
    ];

    // Sample schedules
    const sampleSchedules: Schedule[] = [
      {
        id: 1,
        teacherId: 1,
        courseType: "general",
        dayOfWeek: "Monday",
        startTime: "19:00",
        endTime: "21:00",
        zoomLink: "https://zoom.us/j/1234567890"
      },
      {
        id: 2,
        teacherId: 2,
        courseType: "cefr",
        dayOfWeek: "Saturday",
        startTime: "14:00",
        endTime: "16:00",
        zoomLink: "https://zoom.us/j/0987654321"
      }
    ];

    sampleCourses.forEach(course => this.courses.set(course.id, course));
    sampleTeachers.forEach(teacher => this.teachers.set(teacher.id, teacher));
    sampleSchedules.forEach(schedule => this.schedules.set(schedule.id, schedule));
    this.currentId = 4;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      phone: insertUser.phone || null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStripeInfo(id: number, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { 
      ...user, 
      stripeCustomerId,
      stripeSubscriptionId: stripeSubscriptionId || user.stripeSubscriptionId
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentId++;
    const course: Course = { 
      ...insertCourse, 
      id,
      features: Array.isArray(insertCourse.features) ? [...insertCourse.features] : [],
      isPopular: insertCourse.isPopular || false
    };
    this.courses.set(id, course);
    return course;
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = this.currentId++;
    const enrollment: Enrollment = { 
      ...insertEnrollment, 
      id, 
      startDate: new Date(),
      endDate: null,
      status: insertEnrollment.status || "active",
      userId: insertEnrollment.userId || null,
      courseId: insertEnrollment.courseId || null,
      paymentIntentId: insertEnrollment.paymentIntentId || null
    };
    this.enrollments.set(id, enrollment);
    return enrollment;
  }

  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(e => e.userId === userId);
  }

  async getEnrollmentByPaymentIntent(paymentIntentId: string): Promise<Enrollment | undefined> {
    return Array.from(this.enrollments.values()).find(e => e.paymentIntentId === paymentIntentId);
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return Array.from(this.teachers.values());
  }

  async getTeacher(id: number): Promise<Teacher | undefined> {
    return this.teachers.get(id);
  }

  async createTeacher(insertTeacher: InsertTeacher): Promise<Teacher> {
    const id = this.currentId++;
    const teacher: Teacher = { 
      ...insertTeacher, 
      id,
      bio: insertTeacher.bio || null,
      imageUrl: insertTeacher.imageUrl || null
    };
    this.teachers.set(id, teacher);
    return teacher;
  }

  async getSchedulesByTeacher(teacherId: number): Promise<Schedule[]> {
    return Array.from(this.schedules.values()).filter(s => s.teacherId === teacherId);
  }

  async getSchedulesByCourseType(courseType: string): Promise<Schedule[]> {
    return Array.from(this.schedules.values()).filter(s => s.courseType === courseType);
  }

  async createSchedule(insertSchedule: InsertSchedule): Promise<Schedule> {
    const id = this.currentId++;
    const schedule: Schedule = { 
      ...insertSchedule, 
      id,
      teacherId: insertSchedule.teacherId || null,
      zoomLink: insertSchedule.zoomLink || null
    };
    this.schedules.set(id, schedule);
    return schedule;
  }

  async createLevelTest(insertLevelTest: InsertLevelTest): Promise<LevelTest> {
    const id = this.currentId++;
    const levelTest: LevelTest = { 
      ...insertLevelTest, 
      id, 
      completedAt: new Date(),
      userId: insertLevelTest.userId || null
    };
    this.levelTests.set(id, levelTest);
    return levelTest;
  }

  async getUserLevelTests(userId: number): Promise<LevelTest[]> {
    return Array.from(this.levelTests.values()).filter(t => t.userId === userId);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
