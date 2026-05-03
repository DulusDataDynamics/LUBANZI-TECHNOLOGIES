'use server';
/**
 * @fileOverview This file provides an AI flow for suggesting short, brand-aligned word combinations or initials for letter beads.
 *
 * - suggestLetterBeads - A function that handles the letter bead suggestion process.
 * - LetterBeadSuggestionInput - The input type for the suggestLetterBeads function.
 * - LetterBeadSuggestionOutput - The return type for the suggestLetterBeads function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LetterBeadSuggestionInputSchema = z.object({
  context: z
    .string()
    .optional()
    .describe('Optional context or theme for the letter bead suggestions.'),
  itemType: z
    .string()
    .optional()
    .describe('Optional type of item the letter beads are for (e.g., "bracelet", "keychain").'),
});
export type LetterBeadSuggestionInput = z.infer<
  typeof LetterBeadSuggestionInputSchema
>;

const LetterBeadSuggestionOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of suggested letter bead combinations.'),
});
export type LetterBeadSuggestionOutput = z.infer<
  typeof LetterBeadSuggestionOutputSchema
>;

export async function suggestLetterBeads(
  input: LetterBeadSuggestionInput
): Promise<LetterBeadSuggestionOutput> {
  return suggestLetterBeadsFlow(input);
}

const suggestLetterBeadsPrompt = ai.definePrompt({
  name: 'suggestLetterBeadsPrompt',
  input: {schema: LetterBeadSuggestionInputSchema},
  output: {schema: LetterBeadSuggestionOutputSchema},
  prompt: `You are a creative assistant for 'Niki’s Charms', a brand specializing in handmade, sentimental accessories. The brand vibe is whimsical, cozy, nostalgic, and slightly ethereal, like a diary mixed with a dreamy afternoon. Your task is to suggest short, brand-aligned word combinations or initials for letter beads, suitable for items like friendship bracelets or custom keychains. The suggestions should be meaningful, aesthetically pleasing, and concise.

Consider the following context if provided: {{{context}}}
The item type for these beads is: {{{itemType}}}

Provide 3 to 5 distinct suggestions. Each suggestion should be a single string.`,
});

const suggestLetterBeadsFlow = ai.defineFlow(
  {
    name: 'suggestLetterBeadsFlow',
    inputSchema: LetterBeadSuggestionInputSchema,
    outputSchema: LetterBeadSuggestionOutputSchema,
  },
  async (input) => {
    const {output} = await suggestLetterBeadsPrompt(input);
    return output!;
  }
);
