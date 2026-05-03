'use server';
/**
 * @fileOverview A Genkit flow for suggesting gift notes based on recipient, occasion, and gift type.
 *
 * - suggestGiftNote - A function that handles the gift note suggestion process.
 * - SuggestGiftNoteInput - The input type for the suggestGiftNote function.
 * - SuggestGiftNoteOutput - The return type for the suggestGiftNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestGiftNoteInputSchema = z.object({
  recipient: z
    .string()
    .describe('The person the gift is for (e.g., "friend", "mom", "partner").'),
  occasion: z
    .string()
    .describe('The occasion for the gift (e.g., "birthday", "anniversary", "just because").'),
  giftType: z
    .string()
    .describe('The type of charm or accessory being gifted (e.g., "friendship bracelet", "keychain", "photocard").'),
});
export type SuggestGiftNoteInput = z.infer<typeof SuggestGiftNoteInputSchema>;

const SuggestGiftNoteOutputSchema = z.object({
  giftNote: z.string().describe('A suggested short, whimsical, or sentimental message for a gift tag.'),
});
export type SuggestGiftNoteOutput = z.infer<typeof SuggestGiftNoteOutputSchema>;

export async function suggestGiftNote(
  input: SuggestGiftNoteInput
): Promise<SuggestGiftNoteOutput> {
  return suggestGiftNoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestGiftNotePrompt',
  input: {schema: SuggestGiftNoteInputSchema},
  output: {schema: SuggestGiftNoteOutputSchema},
  prompt: `You are a creative assistant for Niki's Charms, a brand known for whimsical, cozy, nostalgic, and ethereal handmade accessories.

Your task is to generate a short, heartfelt, whimsical, or sentimental message for a gift tag based on the provided details.

The gift is for a {{{recipient}}} for their {{{occasion}}}.
It is a {{{giftType}}}.

Craft a message that captures the magic and sentiment of Niki's Charms. Make it brief and sweet, suitable for a small gift tag. Just provide the note itself, without any extra commentary.`,
});

const suggestGiftNoteFlow = ai.defineFlow(
  {
    name: 'suggestGiftNoteFlow',
    inputSchema: SuggestGiftNoteInputSchema,
    outputSchema: SuggestGiftNoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
