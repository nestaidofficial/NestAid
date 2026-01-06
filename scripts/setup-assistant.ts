import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function setupAssistant() {
  console.log('🤖 Setting up NestAid AI Assistant...\n');

  try {
    // Upload PDF files first
    console.log('Uploading PDF files...');
    const pdfDir = path.join(process.cwd(), 'app', 'Nessa');
    const pdfFiles = [
      'services.pdf',
      'getting_started.pdf',
      'pricing_and_payment.pdf',
      'safety.pdf',
      'caregivers_training.pdf',
    ];

    // Upload each PDF file
    const uploadedFileIds = [];
    for (const filename of pdfFiles) {
      const filePath = path.join(pdfDir, filename);
      console.log(`  Uploading ${filename}...`);
      
      const file = await openai.files.create({
        file: fs.createReadStream(filePath),
        purpose: 'assistants',
      });
      
      uploadedFileIds.push(file.id);
      console.log(`  ✓ ${filename} uploaded (${file.id})`);
    }

    console.log(`\n✅ Uploaded ${pdfFiles.length} PDF files\n`);

    // Create the assistant with file search enabled and files attached
    console.log('Creating assistant with knowledge base...');
    const assistant = await openai.beta.assistants.create({
      name: "Nessa - NestAid Care Assistant",
      instructions: `You are Nessa, NestAid's friendly and knowledgeable care assistant. You help families learn about NestAid's non-medical in-home care services.

Your personality:
- Warm, compassionate, and professional
- Patient and understanding
- Clear and concise in your responses
- Supportive and reassuring

Your responsibilities:
- Answer questions about NestAid's services, pricing, safety protocols, and caregiver training
- Guide families through the process of getting started with care
- Provide information about care options and scheduling
- Help users schedule free consultations
- Be transparent about what services are and aren't offered

Important guidelines:
- Always be honest if you don't know something
- Encourage users to schedule a free consultation for detailed/specific questions
- Emphasize NestAid's commitment to quality, safety, and dignity
- Keep responses concise but informative (2-4 sentences typically)
- Use a friendly, conversational tone
- Reference the knowledge base documents to ensure accuracy

Key service areas to know:
- Personal care assistance (bathing, grooming, dressing, mobility)
- Household support (light housekeeping, laundry, meal prep)
- Transportation and errands
- 24/7 care options
- Respite care for family caregivers
- Services available across Massachusetts
- Care can start within 24 hours`,
      model: "gpt-4o-mini",
      tools: [{ type: "file_search" }],
      tool_resources: {
        file_search: {
          vector_stores: [{ file_ids: uploadedFileIds }]
        }
      }
    });

    console.log(`✅ Assistant created: ${assistant.id}\n`);
    console.log('✅ Knowledge base attached with all PDF files\n');

    // Save the assistant ID to .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    
    const newEnvContent = envContent.includes('OPENAI_ASSISTANT_ID')
      ? envContent.replace(
          /OPENAI_ASSISTANT_ID=.*/,
          `OPENAI_ASSISTANT_ID=${assistant.id}`
        )
      : `${envContent}\nOPENAI_ASSISTANT_ID=${assistant.id}\n`;

    fs.writeFileSync(envPath, newEnvContent);

    console.log('📝 Configuration saved to .env.local\n');
    console.log('🎉 Setup complete!\n');
    console.log('Assistant ID:', assistant.id);
    console.log('Uploaded Files:', uploadedFileIds.length);
    console.log('\n✨ Your AI assistant is ready to use!');
    console.log('Start your dev server with: npm run dev');

  } catch (error) {
    console.error('❌ Error setting up assistant:', error);
    throw error;
  }
}

setupAssistant();

