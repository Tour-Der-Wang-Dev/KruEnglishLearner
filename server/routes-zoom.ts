import type { Express } from "express";
import { ZoomService } from "./services/ZoomService";
import { storage } from "./storage";

export function registerZoomRoutes(app: Express) {
  const zoomService = ZoomService.getInstance();

  // Test Zoom connection
  app.get("/api/zoom/test", async (req, res) => {
    try {
      const result = await zoomService.testConnection();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  });

  // Create Zoom meeting for a course
  app.post("/api/zoom/create-meeting", async (req, res) => {
    try {
      const { courseId, courseName, schedule, duration, startTime } = req.body;

      if (!courseName) {
        return res.status(400).json({ error: "Course name is required" });
      }

      // Create the meeting
      const meeting = await zoomService.createClassMeeting(
        courseName,
        schedule || "",
        duration || 60
      );

      // Update course with Zoom link if courseId is provided
      if (courseId) {
        try {
          const course = await storage.getCourse(courseId);
          if (course) {
            // Note: You'll need to add updateCourse method to storage
            // await storage.updateCourse(courseId, { 
            //   zoomLink: meeting.join_url,
            //   zoomMeetingId: meeting.id 
            // });
          }
        } catch (updateError) {
          console.warn("Could not update course with Zoom link:", updateError);
        }
      }

      res.json({
        success: true,
        meeting: {
          id: meeting.id,
          topic: meeting.topic,
          join_url: meeting.join_url,
          password: meeting.password,
          start_time: meeting.start_time,
          duration: meeting.duration,
          status: meeting.status
        }
      });
    } catch (error: any) {
      console.error("Create meeting error:", error);
      res.status(500).json({ 
        error: "Failed to create Zoom meeting",
        message: error.message 
      });
    }
  });

  // Get meeting details
  app.get("/api/zoom/meeting/:meetingId", async (req, res) => {
    try {
      const { meetingId } = req.params;
      const meeting = await zoomService.getMeeting(meetingId);
      
      res.json({
        success: true,
        meeting: {
          id: meeting.id,
          topic: meeting.topic,
          join_url: meeting.join_url,
          password: meeting.password,
          start_time: meeting.start_time,
          duration: meeting.duration,
          status: meeting.status
        }
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to get meeting details",
        message: error.message 
      });
    }
  });

  // List all meetings
  app.get("/api/zoom/meetings", async (req, res) => {
    try {
      const meetings = await zoomService.listMeetings();
      
      res.json({
        success: true,
        meetings: meetings.map(meeting => ({
          id: meeting.id,
          topic: meeting.topic,
          join_url: meeting.join_url,
          start_time: meeting.start_time,
          duration: meeting.duration,
          status: meeting.status
        }))
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to list meetings",
        message: error.message 
      });
    }
  });

  // Update meeting
  app.patch("/api/zoom/meeting/:meetingId", async (req, res) => {
    try {
      const { meetingId } = req.params;
      const updateData = req.body;

      await zoomService.updateMeeting(meetingId, updateData);
      
      res.json({
        success: true,
        message: "Meeting updated successfully"
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to update meeting",
        message: error.message 
      });
    }
  });

  // Delete meeting
  app.delete("/api/zoom/meeting/:meetingId", async (req, res) => {
    try {
      const { meetingId } = req.params;
      await zoomService.deleteMeeting(meetingId);
      
      res.json({
        success: true,
        message: "Meeting deleted successfully"
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to delete meeting",
        message: error.message 
      });
    }
  });

  // Generate Zoom link for existing course
  app.post("/api/zoom/generate-link/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await storage.getCourse(parseInt(courseId));
      
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      const meeting = await zoomService.createClassMeeting(
        course.name,
        course.schedule || "",
        60
      );

      res.json({
        success: true,
        zoomLink: meeting.join_url,
        meetingId: meeting.id,
        password: meeting.password,
        message: "Zoom link generated successfully"
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to generate Zoom link",
        message: error.message 
      });
    }
  });

  // Bulk create meetings for multiple courses
  app.post("/api/zoom/bulk-create", async (req, res) => {
    try {
      const { courses } = req.body;
      
      if (!Array.isArray(courses)) {
        return res.status(400).json({ error: "Courses array is required" });
      }

      const results = [];
      
      for (const courseData of courses) {
        try {
          const meeting = await zoomService.createClassMeeting(
            courseData.name,
            courseData.schedule || "",
            courseData.duration || 60
          );
          
          results.push({
            courseId: courseData.id,
            courseName: courseData.name,
            success: true,
            meetingId: meeting.id,
            joinUrl: meeting.join_url,
            password: meeting.password
          });
        } catch (error: any) {
          results.push({
            courseId: courseData.id,
            courseName: courseData.name,
            success: false,
            error: error.message
          });
        }
      }

      res.json({
        success: true,
        results,
        summary: {
          total: courses.length,
          successful: results.filter(r => r.success).length,
          failed: results.filter(r => !r.success).length
        }
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: "Bulk creation failed",
        message: error.message 
      });
    }
  });
}