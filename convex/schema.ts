import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.optional(v.string()),
    createdAt: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  interviews: defineTable({
    userId: v.id("users"),
    jobRole: v.string(),
    experienceLevel: v.string(),
    interviewType: v.string(),
    duration: v.number(),
    status: v.union(v.literal("scheduled"), v.literal("in_progress"), v.literal("completed"), v.literal("cancelled")),
    score: v.optional(v.number()),
    feedback: v.optional(v.string()),
    createdAt: v.string(),
    completedAt: v.optional(v.string()),
  }).index("by_user", ["userId"]).index("by_status", ["status"]),

  questions: defineTable({
    interviewId: v.id("interviews"),
    questionText: v.string(),
    questionType: v.union(v.literal("behavioral"), v.literal("technical"), v.literal("case_study")),
    order: v.number(),
    expectedAnswer: v.optional(v.string()),
    difficulty: v.union(v.literal("easy"), v.literal("medium"), v.literal("hard")),
  }).index("by_interview", ["interviewId"]),

  responses: defineTable({
    interviewId: v.id("interviews"),
    questionId: v.id("questions"),
    responseText: v.optional(v.string()),
    audioUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    score: v.optional(v.number()),
    feedback: v.optional(v.string()),
    duration: v.number(),
    createdAt: v.string(),
  }).index("by_interview", ["interviewId"]).index("by_question", ["questionId"]),

  avatarSessions: defineTable({
    interviewId: v.id("interviews"),
    akoolSessionId: v.string(),
    avatarId: v.string(),
    status: v.union(v.literal("initializing"), v.literal("active"), v.literal("ended")),
    streamUrl: v.optional(v.string()),
    createdAt: v.string(),
  }).index("by_interview", ["interviewId"]).index("by_akool_session", ["akoolSessionId"]),

  analytics: defineTable({
    userId: v.id("users"),
    interviewId: v.id("interviews"),
    metric: v.string(),
    value: v.number(),
    timestamp: v.string(),
  }).index("by_user", ["userId"]).index("by_interview", ["interviewId"]),
});
