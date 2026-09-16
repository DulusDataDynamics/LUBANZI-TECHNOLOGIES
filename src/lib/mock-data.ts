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
      architecture: 'Next.js App Router, Tailwind CSS, ShadCN components, state machine providers, and Genkit intelligence Plugins.',
      preferences: 'Strict TypeScript usage, functional code modularity, minimal reliance on bulky client libraries, clear logs.',
      knownIssues: 'Minor hydration discrepancy when pulling real-time timestamp seeds on the server edge.'
    },
    files: [
      { path: 'src/app/page.tsx', name: 'page.tsx', content: `'use client';\nexport default function Home() {\n  return <main>Welcome to Next Auth Dashboard</main>;\n}`, language: 'typescript' },
      { path: 'src/components/navbar.tsx', name: 'navbar.tsx', content: `export function Navbar() {\n  return <nav className="p-4 bg-zinc-900 border-b">Logo</nav>;\n}`, language: 'typescript' },
      { path: 'src/lib/auth.ts', name: 'auth.ts', content: `export const authOptions = {\n  secret: process.env.NEXTAUTH_SECRET,\n  providers: []\n};`, language: 'typescript' },
      { path: 'package.json', name: 'package.json', content: `{\n  "name": "vexa-core",\n  "version": "1.4.0"\n}`, language: 'json' }
    ],
    changes: [
      {
        id: 'c1',
        file: 'src/lib/auth.ts',
        type: 'Created',
        summary: 'Scaffold authorization provider matrix middleware',
        explanation: 'Enables high security claim inspection protocols requested by the project roadmap specification.',
        timestamp: '10 mins ago'
      },
      {
        id: 'c2',
        file: 'src/components/navbar.tsx',
        type: 'Updated',
        summary: 'Inject live state indicators into code explorer headers',
        explanation: 'Improves clarity for developers checking deployment conditions in real-time streams.',
        timestamp: '1 hour ago'
      }
    ],
    activities: [
      { id: 'act-1', type: 'create', title: 'Project Initialized', description: 'Vexa Workspace configured and structure mapped.', timestamp: '2 hours ago' },
      { id: 'act-2', type: 'task', title: 'Feature Request: Add Auth Scaffolding', description: 'Vexa assigned Planner to partition the work, Coder to formulate logic.', timestamp: '45 mins ago', agent: 'Planner' },
      { id: 'act-3', type: 'review', title: 'Code Review Approved', description: 'Reviewer checked safety guidelines and verified zero vulnerable packages.', timestamp: '15 mins ago', agent: 'Reviewer' },
      { id: 'act-4', type: 'deploy', title: 'Production Deploy Initiated', description: 'Deployer bundled edge routes into static optimize files.', timestamp: '10 mins ago', agent: 'Deployer' }
    ],
    deployments: [
      { id: 'd-1', environment: 'Production', status: 'Successful', version: 'v1.4.0', timestamp: '10 mins ago', commitMessage: 'Merge feature/auth-scaffolding into main' },
      { id: 'd-2', environment: 'Preview', status: 'Successful', version: 'v1.4.0-rc1', timestamp: '25 mins ago', commitMessage: 'Drafting new middleware verification layers' },
      { id: 'd-3', environment: 'Development', status: 'Successful', version: 'v1.3.9', timestamp: '1 hour ago', commitMessage: 'Update workspace parameters' }
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
      { path: 'main.py', name: 'main.py', content: `import asyncio\nasync def main():\n    print("Starting concurrent agent system...")\n\nif __name__ == "__main__":\n    asyncio.run(main())`, language: 'python' },
      { path: 'utils/chunker.py', name: 'chunker.py', content: `def chunk_text(text: str, size: int = 500):\n    return [text[i:i+size] for i in range(0, len(text), size)]`, language: 'python' }
    ],
    changes: [
      {
        id: 'cs-1',
        file: 'utils/chunker.py',
        type: 'Updated',
        summary: 'Fix split index out of bounds glitch',
        explanation: 'Encountered variable length input batches which caused negative index calculation slice failures.',
        timestamp: 'Yesterday'
      }
    ],
    activities: [
      { id: 'act-s1', type: 'create', title: 'Python Crawler Created', description: 'Scaffolder set up virtual environments and requirements indices.', timestamp: 'Yesterday' },
      { id: 'act-s2', type: 'fix', title: 'Bug Identified: Out of Bounds', description: 'Debugger tracked crash site to chunker offset index 42.', timestamp: 'Yesterday', agent: 'Debugger' }
    ],
    deployments: [
      { id: 'd-s1', environment: 'Development', status: 'Successful', version: 'v0.1.2', timestamp: 'Yesterday', commitMessage: 'Resolve splitter calculation crashes' }
    ]
  }
];