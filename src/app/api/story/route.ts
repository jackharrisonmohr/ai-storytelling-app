import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt, currentStory } = await req.json();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative storytelling assistant. Generate three possible next sentences for a story, each continuing the narrative in a different direction. Make them engaging and distinct."
        },
        {
          role: "user",
          content: `Current story: ${currentStory}. Based on this, generate three different possible next sentences.`
        }
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '';
    const sentences = content.split(/\d+\.\s+/).filter(Boolean).map(s => s.trim());
    
    return NextResponse.json({ sentences });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate story options' }, { status: 500 });
  }
}