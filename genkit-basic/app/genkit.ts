
"use server";

import * as z from 'zod';

import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer, runFlow } from '@genkit-ai/flow';

import {
  googleAI,
  gemini15Flash,
  gemini15Pro,
} from '@genkit-ai/googleai';

configureGenkit({
  plugins: [
    googleAI()
  ],
  logLevel: "debug",
  enableTracingAndMetrics: true,
});

// Define a simple flow that prompts an LLM to generate turkish food recipes.
const menuSuggestionFlow = defineFlow(
  {
    name: 'Türk Yemekleri',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `Bana restaurantlarda veya evlerde yapılan ${subject} yemeğinin tarfini yaz.`,
      model: gemini15Flash,
      config: {
        temperature: 1,
      },
    });

    return llmResponse.text();
  }
);

export async function callMenuSuggestionFlow(theme: string) {
  const flowResponse = await runFlow(menuSuggestionFlow, theme);
  console.log(flowResponse);
  return flowResponse;
}
