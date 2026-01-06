# NestAid AI Assistant Setup Guide

## Step 1: Add OpenAI API Key to .env.local

Add this line to your `.env.local` file:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

## Step 2: Run the Setup Script

This will create the OpenAI Assistant and upload your PDF knowledge base:

```bash
npm run setup-assistant
```

This script will:
- ✅ Create an AI assistant named "Nessa"
- ✅ Upload your 5 PDF files (services, getting started, pricing, safety, caregiver training)
- ✅ Create a vector store for intelligent document search
- ✅ Save the Assistant ID to your .env.local automatically

## Step 3: Start Your Development Server

```bash
npm run dev
```

## What Happens Next?

Your chatbot will now:
- 🤖 Respond intelligently based on your PDF documents
- 💬 Maintain conversation context across messages
- ⚡ Stream responses in real-time for better UX
- 📚 Search through all uploaded PDFs to answer questions
- 🎯 Provide accurate information about NestAid services

## Testing the Chatbot

1. Open your website homepage
2. Click the chat widget in the bottom-right corner
3. Send a message like:
   - "What services do you offer?"
   - "How much does care cost?"
   - "Are caregivers background checked?"
   - "How quickly can care start?"

Nessa will respond based on your PDF knowledge base!

## Updating the Knowledge Base

If you need to update or add PDFs:
1. Add new PDFs to `app/Nessa/` folder
2. Update the `pdfFiles` array in `scripts/setup-assistant.ts`
3. Run `npm run setup-assistant` again

## Troubleshooting

- **"Assistant not configured" error**: Run the setup script first
- **No response from chatbot**: Check that OPENAI_API_KEY is set correctly
- **Slow responses**: Normal for first message; subsequent messages are faster

## Cost Estimates

Using GPT-4o with file search:
- ~$0.01-0.05 per conversation (very affordable)
- File storage: $0.10/GB/day (your 5 PDFs are tiny)

