import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createQuestion = mutation({
  args: {
    interviewId: v.id("interviews"),
    questionText: v.string(),
    questionType: v.union(v.literal("behavioral"), v.literal("technical"), v.literal("case_study")),
    order: v.number(),
    expectedAnswer: v.optional(v.string()),
    difficulty: v.union(v.literal("easy"), v.literal("medium"), v.literal("hard")),
  },
  handler: async (ctx, args) => {
    const questionId = await ctx.db.insert("questions", {
      interviewId: args.interviewId,
      questionText: args.questionText,
      questionType: args.questionType,
      order: args.order,
      expectedAnswer: args.expectedAnswer,
      difficulty: args.difficulty,
    });

    return questionId;
  },
});

export const getQuestionsByInterview = query({
  args: { interviewId: v.id("interviews") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("questions")
      .withIndex("by_interview", (q) => q.eq("interviewId", args.interviewId))
      .order("asc")
      .collect();
  },
});

export const generateQuestions = mutation({
  args: {
    interviewId: v.id("interviews"),
    jobRole: v.string(),
    experienceLevel: v.string(),
    interviewType: v.string(),
    count: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const count = args.count || 5;
    const questions = generateQuestionsForRole(args.jobRole, args.experienceLevel, args.interviewType, count);
    
    const questionIds = [];
    for (let i = 0; i < questions.length; i++) {
      const questionId = await ctx.db.insert("questions", {
        interviewId: args.interviewId,
        questionText: questions[i].text,
        questionType: questions[i].type,
        order: i + 1,
        expectedAnswer: questions[i].expectedAnswer,
        difficulty: questions[i].difficulty,
      });
      questionIds.push(questionId);
    }

    return questionIds;
  },
});

function generateQuestionsForRole(jobRole: string, experienceLevel: string, interviewType: string, count: number) {
  const questionBank = {
    behavioral: [
      {
        text: "Tell me about yourself and your background.",
        type: "behavioral" as const,
        difficulty: "easy" as const,
        expectedAnswer: "Should include relevant experience, skills, and career goals"
      },
      {
        text: "Describe a challenging project you've worked on and how you overcame obstacles.",
        type: "behavioral" as const,
        difficulty: "medium" as const,
        expectedAnswer: "Should demonstrate problem-solving skills and resilience"
      },
      {
        text: "Tell me about a time when you had to work with a difficult team member.",
        type: "behavioral" as const,
        difficulty: "medium" as const,
        expectedAnswer: "Should show interpersonal skills and conflict resolution"
      },
      {
        text: "How do you handle working under pressure and tight deadlines?",
        type: "behavioral" as const,
        difficulty: "medium" as const,
        expectedAnswer: "Should demonstrate stress management and prioritization skills"
      },
      {
        text: "Where do you see yourself in 5 years?",
        type: "behavioral" as const,
        difficulty: "easy" as const,
        expectedAnswer: "Should align with career progression and company growth"
      }
    ],
    technical: [
      {
        text: "Explain the difference between SQL and NoSQL databases.",
        type: "technical" as const,
        difficulty: "medium" as const,
        expectedAnswer: "Should cover structure, scalability, and use cases"
      },
      {
        text: "How would you optimize a slow-performing web application?",
        type: "technical" as const,
        difficulty: "hard" as const,
        expectedAnswer: "Should cover caching, database optimization, and code efficiency"
      },
      {
        text: "What is the difference between authentication and authorization?",
        type: "technical" as const,
        difficulty: "easy" as const,
        expectedAnswer: "Authentication verifies identity, authorization controls access"
      },
      {
        text: "Explain the concept of microservices architecture.",
        type: "technical" as const,
        difficulty: "hard" as const,
        expectedAnswer: "Should cover benefits, challenges, and implementation considerations"
      }
    ],
    case_study: [
      {
        text: "How would you design a system to handle 1 million concurrent users?",
        type: "case_study" as const,
        difficulty: "hard" as const,
        expectedAnswer: "Should cover scalability, load balancing, and system architecture"
      },
      {
        text: "A client wants to reduce their customer acquisition cost by 50%. What would you recommend?",
        type: "case_study" as const,
        difficulty: "medium" as const,
        expectedAnswer: "Should analyze current metrics and propose data-driven solutions"
      }
    ]
  };

  let selectedQuestions = [];
  
  if (interviewType === "mixed") {
    const behavioralCount = Math.ceil(count / 2);
    const technicalCount = count - behavioralCount;
    selectedQuestions = [
      ...questionBank.behavioral.slice(0, behavioralCount),
      ...questionBank.technical.slice(0, technicalCount)
    ];
  } else if (interviewType === "behavioral") {
    selectedQuestions = questionBank.behavioral.slice(0, count);
  } else if (interviewType === "technical") {
    selectedQuestions = questionBank.technical.slice(0, count);
  } else if (interviewType === "case") {
    selectedQuestions = questionBank.case_study.slice(0, count);
  }

  return selectedQuestions.slice(0, count);
}
