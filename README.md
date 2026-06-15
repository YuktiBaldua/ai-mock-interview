# AI Mock Interview Platform

A comprehensive AI-powered mock interview platform built with Next.js, featuring real-time streaming avatars, automated workflows, and advanced analytics.

## 🚀 Features

- **AI-Powered Interviews**: Realistic mock interviews with AI streaming avatars powered by Akool
- **Real-time Interaction**: Live video/audio sessions with instant feedback
- **Secure Authentication**: User management with Clerk
- **Scalable Backend**: Real-time data management with Convex
- **Advanced Security**: Rate limiting and protection with ArcJet
- **Automated Workflows**: n8n integration for interview automation
- **Comprehensive Analytics**: Performance tracking and insights
- **Modern UI**: Beautiful, responsive design with Tailwind CSS

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Backend**: Convex (real-time database)
- **AI Avatars**: Akool Streaming Avatars
- **Security**: ArcJet (rate limiting, bot detection)
- **Automation**: n8n workflows
- **Deployment**: Vercel/Netlify ready

## 📋 Prerequisites

Before running this application, you'll need:

- Node.js 18+ installed
- API keys for the following services:
  - Clerk (authentication)
  - Convex (backend)
  - Akool (streaming avatars)
  - ArcJet (security)
  - n8n (automation workflows)
  - OpenAI (optional, for enhanced question generation)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-mock-interview
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your API keys in `.env.local`:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
   CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

   # Convex Backend
   CONVEX_DEPLOYMENT=your_convex_deployment_name
   NEXT_PUBLIC_CONVEX_URL=https://your_convex_deployment.convex.cloud

   # Akool Streaming Avatars
   AKOOL_API_KEY=your_akool_api_key

   # ArcJet Security
   ARCJET_KEY=your_arcjet_key

   # n8n Automation
   N8N_WEBHOOK_URL=https://your_n8n_instance.com/webhook/interview

   # OpenAI (optional)
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Initialize Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── dashboard/         # User dashboard
│   ├── interview/         # Interview pages
│   ├── analytics/         # Analytics dashboard
│   └── interviews/        # Interview history
├── components/            # Reusable components
├── lib/                   # Utility libraries
│   ├── akool.ts          # Akool API integration
│   ├── arcjet.ts         # ArcJet security
│   └── n8n.ts            # n8n workflow management
├── providers/             # Context providers
└── convex/               # Convex backend schema and functions
```

## 🔑 API Configuration

### Clerk Setup
1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Configure OAuth providers (Google, GitHub, etc.)
3. Set up webhooks for user events

### Convex Setup
1. Create a Convex project at [convex.dev](https://convex.dev)
2. Deploy your schema: `npx convex deploy`
3. Configure authentication with Clerk

### Akool Setup
1. Sign up at [akool.com](https://akool.com)
2. Create an avatar project
3. Get your API key and avatar IDs

### ArcJet Setup
1. Create an account at [arcjet.com](https://arcjet.com)
2. Configure rate limiting rules
3. Set up bot detection

### n8n Setup
1. Deploy n8n instance (self-hosted or cloud)
2. Create workflows for interview automation
3. Set up webhook endpoints

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm start
```

## 🔄 n8n Workflows

The platform includes several automated workflows:

- **User Registration**: Welcome emails and onboarding
- **Interview Scheduling**: Calendar integration and reminders
- **Performance Tracking**: Score analysis and improvement suggestions
- **Feedback Generation**: Automated feedback based on performance
- **Analytics Reports**: Daily/weekly performance summaries

## 📊 Features Overview

### Interview Types
- **Behavioral**: Focus on past experiences and soft skills
- **Technical**: Technical questions and problem-solving
- **Case Study**: Business analysis and strategic thinking
- **Mixed**: Combination of behavioral and technical

### Scoring System
- Real-time performance analysis
- Skill-based breakdown (Communication, Technical, Problem-solving)
- Improvement recommendations
- Progress tracking over time

### Security Features
- Rate limiting on API endpoints
- Bot detection and prevention
- User authentication and authorization
- Data encryption and secure storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

## 🔮 Future Enhancements

- Multi-language support
- Advanced AI question generation
- Video recording and playback
- Integration with job boards
- Mobile application
- Advanced analytics and ML insights

---

Built with ❤️ using Next.js, Convex, Akool, and modern web technologies.
