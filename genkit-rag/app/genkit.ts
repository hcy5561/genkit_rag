
'use server'

import * as z from 'zod';
import { index, generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow } from '@genkit-ai/flow';
import { googleAI } from '@genkit-ai/googleai';
import pdf from 'pdf-parse/lib/pdf-parse';
import { Document } from '@genkit-ai/ai/retriever';
import { retrieve } from '@genkit-ai/ai/retriever';
import { chunk } from 'llm-chunk';
import devLocalVectorstore, { devLocalIndexerRef, devLocalRetrieverRef } from "@genkit-ai/dev-local-vectorstore";
import { textEmbeddingGecko001, gemini15Flash } from '@genkit-ai/googleai';

// Genkit yapılandırması
configureGenkit({
  plugins: [
    googleAI(),
    devLocalVectorstore([
      {
        embedder: textEmbeddingGecko001,
        indexName: "facts",
      },
    ]),
  ],
  logLevel: "debug",
  enableTracingAndMetrics: true,
});

const demoRtr = devLocalRetrieverRef("facts");
const demoIdx = devLocalIndexerRef("facts");

// Akış fonksiyonlarını doğrudan fonksiyonlara atayarak tanımlayalım

export const indexFlow = async (pdfContent: string) => {
  try {
    const pdfBuffer = Buffer.from(pdfContent, 'base64');
    const pdfText = await pdf(pdfBuffer);
    const chunks = chunk(pdfText.text, {
      minLength: 1000,
      maxLength: 2000,
      splitter: 'sentence',
      overlap: 100,
      delimiters: ""
    });

    await index({
      indexer: demoIdx,
      documents: chunks.map(c => Document.fromText(c)),
    });
  } catch (error) {
    console.error("Error in index flow:", error);
    throw error;
  }
};

export const RAGSoruCevapFlow = async (prompt: string) => {
  try {
    const docs = await retrieve({
      retriever: demoRtr,
      query: prompt,
      options: {
        k: 5
      },
    });

    const response = await generate({
      model: gemini15Flash,
      prompt: prompt,
      context: docs
    });

    return response.text();
  } catch (error) {
    console.error("Error in RAGSoruCevap flow:", error);
    throw error;
  }
};

// Çağrı işlevleri
export async function callRAGSoruCevap(prompt: string) {
  try {
    const response = await RAGSoruCevapFlow(prompt);  // RAGSoruCevapFlow doğrudan çağrılıyor
    return response;
  } catch (error) {
    console.error("Error calling RAGSoruCevap:", error);
    throw error;
  }
}

export async function callIndexFlow(pdfContent: string) {
  try {
    const indexing = await indexFlow(pdfContent);  // indexFlow doğrudan çağrılıyor
    return indexing;
  } catch (error) {
    console.error("Error calling index flow:", error);
    throw error;
  }
}