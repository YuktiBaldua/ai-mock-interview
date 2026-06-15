import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createInterview = mutation({
  args: {
    userId: v.id("users"),
    jobRole: v.string(),
    experienceLevel: v.string(),
    interviewType: v.string(),
    duration: v.number(),
  },
  handler: async (ctx, args) => {
    const interviewId = await ctx.db.insert("interviews", {
      userId: args.userId,
      jobRole: args.jobRole,
      experienceLevel: args.experienceLevel,
      interviewType: args.interviewType,
      duration: args.duration,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    });

    return interviewId;
  },
});

export const getInterviewsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("interviews")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getInterview = query({
  args: { interviewId: v.id("interviews") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.interviewId);
  },
});

export const updateInterviewStatus = mutation({
  args: {
    interviewId: v.id("interviews"),
    status: v.union(v.literal("scheduled"), v.literal("in_progress"), v.literal("completed"), v.literal("cancelled")),
    score: v.optional(v.number()),
    feedback: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updates: any = { status: args.status };
    
    if (args.score !== undefined) updates.score = args.score;
    if (args.feedback !== undefined) updates.feedback = args.feedback;
    if (args.status === "completed") updates.completedAt = new Date().toISOString();

    await ctx.db.patch(args.interviewId, updates);
    return args.interviewId;
  },
});

export const getRecentInterviews = query({
  args: { userId: v.id("users"), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 5;
    return await ctx.db
      .query("interviews")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);
  },
});
