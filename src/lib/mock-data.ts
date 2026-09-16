export interface ProjectFile {
  path: string;
  name: string;
  content: string;
  language: string;
}

export interface CodeChange {
  id: string;
  file: string;
  type: 'Created' | 'Updated' | 'Deleted' | 'Renamed';
  summary: string;
  explanation: string;
  timestamp: string;
}

export interface ActivityLog {
  id: string;
  type: 'create' | 'task' | 'fix' | 'review' | 'deploy';
  title: string;
  description: string;
  timestamp: string;
  agent?: 'Coder' | 'Debugger' | 'Planner' | 'Reviewer' | 'Deployer';
}

export interface Deployment {
  id: string;
  environment: 'Development' | 'Preview' | 'Production';
  status: 'Successful' | 'Building' | 'Failed';
  version: string;
  timestamp: string;
  commitMessage: string;
}

export interface ProjectMemory {
  purpose: string;
  architecture: string;
  preferences: string;
  knownIssues: string;
}

export interface VexaProject {
  id: string;
  name: string;
  description: string;
  status: 'Idle' | 'Thinking' | 'Coding' | 'Reviewing' | 'Deploying';
  recentActivity: string;
  files: ProjectFile[];
  changes: CodeChange[];
  activities: ActivityLog[];
  deployments: Deployment[];
  memory: ProjectMemory;
}

export const INITIAL_PROJECTS: VexaProject[] = [
  {
    id: 'vexa-core',
    name: 'Vexa SaaS Platform Core',
    description: 'Next.js 15 app router system with ultra premium developer workspace metrics and integration layers.',
    status: 'Idle',
    recentActivity: 'Deployment to production completed successfully',
    memory: {
      purpose: 'Provide autonomous high-velocity software engineering automation agents directly inside browser workspaces.',
      architecture: 'Next.js App Router, Tailwind CSS, ShadCN components, and Genkit intelligence Plugins.',
      preferences: 'Strict TypeScript usage, functional code modularity, and clear logging.',
      knownIssues: 'Minor hydration discrepancy when pulling real-time timestamp seeds on the server edge.'
    },
    files: [
      { 
        path: 'src/app/page.tsx', 
        name: 'page.tsx', 
        language: 'typescript',
        content: `"use client"
import React from 'react';
import { VexaSidebar } from '@/components/layout/sidebar';

export default function VexaDashboard() {
  return (
    <div className="flex min-h-screen bg-[#09090b]">
      <VexaSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Welcome back, Engineer</h1>
      </main>
    </div>
  );
}`
      },
      { 
        path: 'src/lib/auth.ts', 
        name: 'auth.ts', 
        language: 'typescript',
        content: `export const getAuthSession = async () => {
  // TODO: Implement actual clerk/auth.js integration
  return { user: { name: 'Vexa User', role: 'admin' } };
};`
      },
      { 
        path: 'package.json', 
        name: 'package.json', 
        language: 'json',
        content: `{
  "name": "vexa-core",
  "dependencies": {
    "next": "15.0.0",
    "react": "19.0.0",
    "genkit": "1.0.0",
    "lucide-react": "^0.450.0"
  }
}`
      }
    ],
    changes: [
      {
        id: 'c1',
        file: 'src/lib/auth.ts',
        type: 'Created',
        summary: 'Scaffold authorization provider matrix middleware',
        explanation: 'Enables high security claim inspection protocols requested by the project roadmap specification.',
        timestamp: '10 mins ago'
      }
    ],
    activities: [
      { id: 'act-1', type: 'create', title: 'Project Initialized', description: 'Vexa Workspace configured and structure mapped.', timestamp: '2 hours ago' },
      { id: 'act-2', type: 'task', title: 'Feature Request: Add Auth Scaffolding', description: 'Vexa assigned Planner to partition the work, Coder to formulate logic.', timestamp: '45 mins ago', agent: 'Planner' }
    ],
    deployments: [
      { id: 'd-1', environment: 'Production', status: 'Successful', version: 'v1.4.0', timestamp: '10 mins ago', commitMessage: 'Merge feature/auth-scaffolding into main' }
    ]
  },
  {
    id: 'ai-scraper',
    name: 'Python Intelligence Agent',
    description: 'High performance concurrent crawler with semantic chunking and automated vector ingestion capabilities.',
    status: 'Thinking',
    recentActivity: 'Inspecting error reports in core collector threads',
    memory: {
      purpose: 'Extract technical release schedules from code repositories dynamically.',
      architecture: 'Python 3.11, Asyncio, Playwright, Genkit SDK pipelines.',
      preferences: 'Pydantic validation paradigms for all intermediate states.',
      knownIssues: 'Rate limits encountered during bulk requests to remote domain registries.'
    },
    files: [
      { 
        path: 'main.py', 
        name: 'main.py', 
        language: 'python',
        content: `import asyncio
from crawler.engine import Scraper

async def main():
    scraper = Scraper(concurrent=True)
    await scraper.start()`
      }
    ],
    changes: [],
    activities: [
      { id: 'act-s1', type: 'create', title: 'Python Crawler Created', description: 'Scaffolder set up virtual environments and requirements indices.', timestamp: 'Yesterday' }
    ],
    deployments: []
  }
];
