
"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Send, 
  Terminal, 
  FileCode, 
  Layers, 
  Cpu, 
  ShieldCheck,
  Zap,
  Play,
  CheckCircle2,
  FolderOpen,
  Code2,
  Rocket,
  Search,
  Eye,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { INITIAL_PROJECTS } from '@/lib/mock-data';
import { VexaSidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';
import { runVexaBrain } from '@/ai/flows/vexa-brain';
import { useToast } from '@/hooks/use-toast';
import { useSidebar } from '@/components/layout/sidebar-context';

type AgentRole = 'Planner' | 'Coder' | 'Debugger' | 'Reviewer' | 'Deployer' | 'VEXA AI';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'agent-status';
  agent?: AgentRole;
  status?: 'thinking' | 'implementing' | 'reviewing' | 'complete';
}

export default function WorkspacePage() {
  const { id } = useParams();
  const project = INITIAL_PROJECTS.find(p => p.id === id) || INITIAL_PROJECTS[0];
  const { toast } = useToast();
  const { isCollapsed } = useSidebar();
  
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello! I'm VEXA V1, your autonomous engineering agent. I've indexed **${project.name}**. How can I help you build today?`, type: 'text', agent: 'VEXA AI' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeView, setActiveView] = useState<'code' | 'preview'>('code');
  const [currentTasks, setCurrentTasks] = useState([
    { id: 1, status: 'complete', label: 'Understanding Request' },
    { id: 2, status: 'pending', label: 'Inspecting Project' },
    { id: 3, status: 'pending', label: 'Implementation Plan' },
    { id: 4, status: 'pending', label: 'Review & Test' },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    const userQuery = input;
    const userMessage: Message = { role: 'user', content: userQuery, type: 'text' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    setCurrentTasks([
      { id: 1, status: 'active', label: 'Understanding Request' },
      { id: 2, status: 'pending', label: 'Inspecting Project' },
      { id: 3, status: 'pending', label: 'Implementation Plan' },
      { id: 4, status: 'pending', label: 'Review & Test' },
    ]);

    try {
      const aiResponse = await runVexaBrain({
        projectId: project.id,
        userQuery: userQuery,
        files: project.files,
        history: messages.filter(m => m.type === 'text').map(m => ({ role: m.role, content: m.content }))
      });

      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: aiResponse.analysis, 
          type: 'text', 
          agent: 'VEXA AI' 
        }
      ]);

      if (aiResponse.plan.length > 0) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: `PLANNING:\n${aiResponse.plan.map((step, i) => `${i + 1}. ${step}`).join('\n')}`,
            type: 'agent-status',
            agent: 'Planner',
            status: 'complete'
          }
        ]);
      }

      setCurrentTasks(aiResponse.tasks.map((t, i) => ({ id: i + 1, ...t })));

    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "System Error: VEXA AI encountered an issue processing that request. Please try again.", type: 'text' }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeploy = () => {
    toast({
      title: "Deployment Initiated",
      description: `VEXA is building a preview for ${project.name}...`,
    });
  };

  const handleShowLogs = () => {
    toast({
      title: "Log Stream Connected",
      description: "Real-time build logs are now streaming to the console.",
    });
  };

  return (
    <div className="flex h-screen bg-[#09090b] overflow-hidden">
      <VexaSidebar />

      <main className={cn(
        "flex-1 flex flex-col h-full transition-all duration-300 ease-in-out",
        isCollapsed ? "lg:ml-20" : "lg:ml-64"
      )}>
        {/* Workspace Header */}
        <header className="h-14 border-b border-zinc-800/50 bg-[#09090b] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">{project.name}</span>
            </div>
            
            <div className="flex items-center bg-zinc-900/50 p-1 rounded-lg border border-zinc-800">
              <button 
                onClick={() => setActiveView('code')}
                className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all",
                  activeView === 'code' ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <FileCode className="w-3 h-3" /> Code
              </button>
              <button 
                onClick={() => setActiveView('preview')}
                className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all",
                  activeView === 'preview' ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Monitor className="w-3 h-3" /> Preview
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShowLogs}
              className="h-8 rounded-lg border-zinc-800 gap-2 text-[10px] font-bold uppercase hover:bg-zinc-900"
            >
              <Terminal className="w-3.5 h-3.5" /> Logs
            </Button>
            <Button 
              size="sm" 
              onClick={handleDeploy}
              className="h-8 rounded-lg gap-2 text-[10px] font-bold uppercase bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800"
            >
              <Rocket className="w-3.5 h-3.5 text-zinc-400" /> Deploy
            </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Area: Chat or Preview */}
          <div className="flex-1 flex flex-col border-r border-zinc-800/50 bg-[#09090b]">
            {activeView === 'code' ? (
              <>
                <ScrollArea className="flex-1" viewportRef={scrollRef}>
                  <div className="max-w-3xl mx-auto p-6 space-y-8">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={cn(
                        "flex flex-col gap-3",
                        msg.role === 'user' ? "items-end" : "items-start"
                      )}>
                        {msg.role === 'assistant' && msg.agent && (
                          <div className="flex items-center gap-2 mb-1">
                            <div className={cn(
                              "w-5 h-5 rounded-md flex items-center justify-center",
                              msg.agent === 'Planner' ? 'bg-amber-500/20 text-amber-500' :
                              msg.agent === 'Coder' ? 'bg-primary/20 text-primary' :
                              msg.agent === 'Reviewer' ? 'bg-emerald-500/20 text-emerald-500' :
                              msg.agent === 'VEXA AI' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-zinc-800 text-zinc-400'
                            )}>
                              {msg.agent === 'Planner' ? <Layers className="w-3 h-3" /> :
                               msg.agent === 'Coder' ? <Code2 className="w-3 h-3" /> :
                               msg.agent === 'Reviewer' ? <ShieldCheck className="w-3 h-3" /> :
                               <Cpu className="w-3 h-3" />}
                            </div>
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{msg.agent} Agent</span>
                            {msg.status && msg.status !== 'complete' && (
                              <div className="flex gap-1">
                                <span className="w-1 h-1 bg-zinc-700 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1 h-1 bg-zinc-700 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1 h-1 bg-zinc-700 rounded-full animate-bounce" />
                              </div>
                            )}
                          </div>
                        )}
                        <div className={cn(
                          "px-5 py-3.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed max-w-[90%] shadow-sm",
                          msg.role === 'user' 
                            ? "bg-primary text-white font-medium" 
                            : "bg-zinc-900/80 border border-zinc-800/50 text-zinc-200"
                        )}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-6 border-t border-zinc-800/50 bg-[#09090b]">
                  <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative group">
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isProcessing}
                      placeholder="Ask VEXA V1 to build, fix, or explain..."
                      className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl py-4 pl-5 pr-14 text-sm resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 min-h-[56px] custom-scrollbar transition-all group-hover:bg-zinc-900 disabled:opacity-50"
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="absolute right-2.5 top-2.5 h-8 w-8 rounded-xl bg-primary hover:bg-primary/90"
                      disabled={!input.trim() || isProcessing}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-3">
                    <QuickAction icon={<ShieldCheck className="w-3 h-3" />} label="Fix Bug" onClick={() => setInput("Identify and fix potential issues in the codebase.")} />
                    <QuickAction icon={<Zap className="w-3 h-3" />} label="Explain Project" onClick={() => setInput("Explain the current project architecture based on the files you see.")} />
                    <QuickAction icon={<FileCode className="w-3 h-3" />} label="Security Audit" onClick={() => setInput("Perform a security review of the authentication logic.")} />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-[#050505] p-12">
                <div className="max-w-2xl w-full space-y-8 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
                    <Monitor className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-white">Application Preview</h2>
                  <p className="text-zinc-500 text-lg">
                    This view displays the real-time build of <span className="text-white font-mono">{project.name}</span>. 
                    VEXA is currently synchronizing local changes.
                  </p>
                  <div className="pt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 text-left">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Status</p>
                      <p className="text-sm font-semibold text-emerald-500">Live & Syncing</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 text-left">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Environment</p>
                      <p className="text-sm font-semibold text-zinc-300">Local Development</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-zinc-800 text-zinc-400" onClick={() => setActiveView('code')}>
                    Return to Editor
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Context Sidebar */}
          <div className="w-80 hidden xl:flex flex-col bg-[#0b0b0d] shrink-0 border-l border-zinc-800/50">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Project Context</span>
              <Layers className="w-3.5 h-3.5 text-zinc-500" />
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-8">
                <section className="space-y-4">
                  <h4 className="text-xs font-semibold text-zinc-400">Current Workflow</h4>
                  <div className="space-y-3">
                    {currentTasks.map(task => (
                      <TaskItem key={task.id} status={task.status as any} label={task.label} />
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-semibold text-zinc-400">Recent Files</h4>
                  <div className="space-y-1">
                    {project.files.map(file => (
                      <div key={file.path} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50 cursor-pointer text-xs group">
                        <FileCode className="w-3.5 h-3.5 text-zinc-500 group-hover:text-primary transition-colors" />
                        <span className="text-zinc-400 truncate">{file.name}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-semibold text-zinc-400">Project Memory</h4>
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 space-y-3">
                    <div>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Architecture</p>
                      <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">{project.memory.architecture}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Known Issues</p>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{project.memory.knownIssues}</p>
                    </div>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
}

function TaskItem({ status, label }: { status: 'complete' | 'active' | 'pending', label: string }) {
  return (
    <div className="flex items-center gap-3">
      {status === 'complete' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :
       status === 'active' ? <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" /> :
       <div className="w-4 h-4 rounded-full border-2 border-zinc-800" />}
      <span className={cn(
        "text-xs font-medium",
        status === 'complete' ? "text-zinc-500 line-through" :
        status === 'active' ? "text-primary" : "text-zinc-600"
      )}>{label}</span>
    </div>
  );
}

function QuickAction({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all text-[10px] font-semibold text-zinc-400 hover:text-zinc-200"
    >
      {icon}
      {label}
    </button>
  );
}
