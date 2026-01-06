import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
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
        { error: 'Assistant not configured. Please run setup script.' },
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

    // Create a run with streaming
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const run = openai.beta.threads.runs.stream(currentThreadId, {
            assistant_id: assistantId,
          });

          let responseText = '';

          run.on('textDelta', (textDelta) => {
            let chunk = textDelta.value || '';
            // Remove citation annotations like 【8:0†services.pdf】
            chunk = chunk.replace(/【\d+:\d+†[^】]+】/g, '');
            responseText += chunk;
            if (chunk) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type: 'text', content: chunk })}\n\n`)
              );
            }
          });

          run.on('messageDone', async () => {
            // Send completion message
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ 
                type: 'done', 
                threadId: currentThreadId,
                fullResponse: responseText 
              })}\n\n`)
            );
            controller.close();
          });

          run.on('error', (error) => {
            console.error('Stream error:', error);
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`)
            );
            controller.close();
          });

        } catch (error: any) {
          console.error('Error in stream:', error);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

