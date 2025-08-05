import OpenAI from "openai";
import { NextRequest, NextResponse } from 'next/server';


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//  POST
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ result });
  } catch (err) {
    console.error("OpenAI Error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
