'use server';
/**
 * @fileOverview VEXA AI V1 Brain - The core reasoning engine for VEXA.
 * 
 * This flow handles natural language engineering requests, analyzes project context,
 * and generates structured plans and code changes.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input: What the user wants and the current project state
const VexaBrainInputSchema = z.object({
  projectId: z.string(),
  userQuery: z.string(),
  fileMetadata: z.array(z.object({
    path: z.string(),
    name: z.string(),
    language: z.string()
  })).describe('List of files available in the project structure.'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).optional()
});

export type VexaBrainInput = z.infer<typeof VexaBrainInputSchema>;

// Output: Structured engineering response
const VexaBrainOutputSchema = z.object({
  analysis: z.string().describe('Deep analysis of the request and project state.'),
  plan: z.array(z.string()).describe('Step-by-step engineering plan.'),
  suggestedChanges: z.array(z.object({
    file: z.string(),
    type: z.enum(['Created', 'Updated', 'Deleted', 'Renamed']),
    summary: z.string(),
    explanation: z.string(),
    codeSnippet: z.string().optional()
  })).describe('Specific code modifications proposed by the AI.'),
  tasks: z.array(z.object({
    label: z.string(),
    status: z.enum(['complete', 'active', 'pending'])
  })).describe('Workflow status for the agent UI.')
});

export type VexaBrainOutput = z.infer<typeof VexaBrainOutputSchema>;

/**
 * VEXA AI System Instructions
 */
const VEXA_SYSTEM_PROMPT = `
You are VEXA V1, a high-velocity autonomous AI Software Engineer. 
Your goal is to help users build, fix, and understand software projects.

GUIDELINES:
1. ANALYSIS: Carefully analyze the user's request against the provided file structure.
2. PLANNING: Break down complex tasks into logical development steps (Planner role).
3. CODE GENERATION: Provide high-quality, modern, and performant code (Coder role).
4. EXPLANATION: Clearly explain WHY changes are being made.
5. SECURITY: Identify and avoid common vulnerabilities (Reviewer role).

You act as a bridge between the user's vision and a working codebase. 
Always return structured engineering data.
`;

/**
 * VEXA Brain Flow
 */
export async function runVexaBrain(input: VexaBrainInput): Promise<VexaBrainOutput> {
  const flow = ai.defineFlow(
    {
      name: 'vexaBrainFlow',
      inputSchema: VexaBrainInputSchema,
      outputSchema: VexaBrainOutputSchema,
    },
    async (input) => {
      const { output } = await ai.generate({
        system: VEXA_SYSTEM_PROMPT,
        prompt: `
          PROJECT CONTEXT:
          Files: ${JSON.stringify(input.fileMetadata)}
          
          USER REQUEST:
          "${input.userQuery}"
          
          Provide a detailed engineering analysis, a step-by-step plan, and specific code changes if applicable.
        `,
        output: { schema: VexaBrainOutputSchema }
      });

      if (!output) throw new Error('VEXA AI failed to generate a response.');
      return output;
    }
  );

  return flow(input);
}
