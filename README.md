# Codex Test

This repository contains a simple Next.js app integrated with Supabase for authentication and an AI agent. The agent acts as a business strategist that reads documents from a Supabase vector store and uses OpenAI to answer questions.

## Getting Started

1. Install dependencies:
   ```bash
   cd webapp
   npm install
   ```

2. Set environment variables in `.env`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   OPENAI_API_KEY=your-openai-key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` in your browser.

The `/api/agent` endpoint accepts a JSON body with a `query` field and returns an answer using the AI agent.
