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
  import fs from 'fs';

  // Configuration GENKIT
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

// Defining flow functions for the GENKIT application by assigning them directly to functions.
defineFlow({name: "index"}, async () => {
    const pdfText = await pdf(fs.readFileSync("example.pdf"));
    const chunks = chunk(pdfText.text, {
        minLength: 1000,
        maxLength: 2000,
        splitter: 'sentence',
        overlap: 100,
        delimiters: ""
    });

    // Index function that's provided by GENKIT.
    // Conveting pdf content to the document with different chunks.
    await index({
        indexer: demoIdx,
        documents: chunks.map(c => Document.fromText(c)),
    })
})

// Defining a flow that prompts an LLM to generate RAG Q&A.
defineFlow(
  {
    name: 'RAGSoruCevap',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    // Here is retrieve function from GENKIT.
    // Retriever takes in the query and returns as three documents.
    // Prompt is sent to our LLM as it is.
      const docs = await retrieve({
          retriever:demoRtr,
          query: prompt,
          options: {
              k: 5
          },
      })

    // Construct a request and send it to the model API.
    // Prompt is sent to context.
    // We are just going to take upper docs and pass them in as context.
    const response = await generate({
      model: gemini15Flash,
      prompt: prompt,
      context: docs
    });

    // Handle the response from the model API.
    return response.text();
  }
);

  // Defining flow functions for the NEXT.JS web application by assigning them directly to functions.
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

  // Call functions to the page.tsx file to enable question and answer by uploading a pdf on the web side
  export async function callRAGSoruCevap(prompt: string) {
    try {
      const response = await RAGSoruCevapFlow(prompt);
      return response;
    } catch (error) {
      console.error("Error calling RAGSoruCevap:", error);
      throw error;
    }
  }

  export async function callIndexFlow(pdfContent: string) {
    try {
      const indexing = await indexFlow(pdfContent);
      return indexing;
    } catch (error) {
      console.error("Error calling index flow:", error);
      throw error;
    }
  }
