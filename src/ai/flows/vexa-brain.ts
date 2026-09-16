'use server';
/**
 * @fileOverview VEXA AI V1 Brain - The core reasoning engine for VEXA.
 * 
 * This flow handles natural language engineering requests, analyzes project context,
 * and generates structured plans and code changes based on actual file content.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input: What the user wants and the current project state (including code)
const VexaBrainInputSchema = z.object({
  projectId: z.string(),
  userQuery: z.string(),
  files: z.array(z.object({
    path: z.string(),
    name: z.string(),
    language: z.string(),
    content: z.string()
  })).describe('The full source code context of the project.'),
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

ENGINEERING PRINCIPLES:
1. CODE AWARENESS: You are provided with the full content of relevant project files. Analyze the logic, imports, and architecture across these files to understand the system.
2. SELECTIVE ANALYSIS: Focus your analysis on the files that are directly related to the user's request.
3. PLANNING: Break down complex engineering tasks into logical development steps (Planner role).
4. ARCHITECTURAL INTEGRITY: Ensure your suggestions follow the project's existing style and architecture.
5. EXPLANATION: Clearly explain WHY you are proposing specific changes based on the code you read.

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
          Below are the files currently in the project workspace:
          
          ${input.files.map(f => `--- FILE: ${f.path} (${f.language}) ---\n${f.content}`).join('\n\n')}
          
          USER REQUEST:
          "${input.userQuery}"
          
          Analyze the request using the provided code context. Identify relevant logic, plan the necessary steps, and explain how the project functions.
        `,
        output: { schema: VexaBrainOutputSchema }
      });

      if (!output) throw new Error('VEXA AI failed to generate a response.');
      return output;
    }
  );

  return flow(input);
}
