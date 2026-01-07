import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize OpenAI client only if API key is available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Check if OpenAI is configured
    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI is not configured. Please set OPENAI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const { message, threadId } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!assistantId) {
      return NextResponse.json(
        { error: 'Assistant not configured. Please set OPENAI_ASSISTANT_ID environment variable.' },
        { status: 500 }
      );
    }

    // Create or use existing thread
    let currentThreadId = threadId;
    if (!currentThreadId) {
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
    }

    // Add message to thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant (non-streaming for Netlify compatibility)
    const run = await openai.beta.threads.runs.createAndPoll(currentThreadId, {
      assistant_id: assistantId,
    });

    // Get the assistant's response
    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(currentThreadId);
      const lastMessage = messages.data[0];
      
      if (lastMessage.role === 'assistant' && lastMessage.content[0]?.type === 'text') {
        let responseText = lastMessage.content[0].text.value;
        
        // Remove citation annotations like 【8:0†services.pdf】
        responseText = responseText.replace(/【\d+:\d+†[^】]+】/g, '');
        
        return NextResponse.json({
          response: responseText,
          threadId: currentThreadId,
        });
      }
    }

    // If run failed or no response
    return NextResponse.json(
      { error: 'Failed to get response from assistant', threadId: currentThreadId },
      { status: 500 }
    );

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
