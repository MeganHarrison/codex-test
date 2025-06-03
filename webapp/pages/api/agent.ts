import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { supabase } from '../../lib/supabaseClient';

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'query missing' });
  }

  // fetch vector data from Supabase
  const { data: vectors } = await supabase
    .from('documents')
    .select('content, embedding')
    .limit(10);

  const prompt = `You are a business strategist AI. Use the following documents to answer:\n${vectors
    ?.map((v: any) => v.content)
    .join('\n')}\nQuestion: ${query}`;

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  const answer = completion.data.choices[0].message?.content;
  res.status(200).json({ answer });
}
