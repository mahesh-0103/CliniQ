
import Link from 'next/link';
import { Chatbot } from "@/components/chatbot";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function AssistantPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
       <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
        <Logo />
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </header>
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">AI Medical Assistant</h1>
        </div>
        <p className="text-muted-foreground mb-8">Ask questions about pneumonia symptoms, treatment, and prevention</p>
        
        <div className="flex-1 flex flex-col">
            <Chatbot />
        </div>
      </main>
    </div>
  );
}
