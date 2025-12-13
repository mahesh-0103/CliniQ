"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { PredictionForm } from "@/components/prediction-form";
import { PredictionResults } from "@/components/prediction-results";
import { SessionHistory } from "@/components/session-history";
import type { PredictionResponse } from "@/lib/types";
import { Logo } from "@/components/logo";
import { Card } from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, ShieldCheck, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function DashboardPage() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
         <Logo />
         <nav>
           <Button variant="ghost" asChild>
             <Link href="/assistant">
                <MessageSquare className="mr-2 h-4 w-4" />
                AI Assistant
              </Link>
           </Button>
         </nav>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <PredictionForm
              setPrediction={setPrediction}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-8 flex flex-col gap-8">
            <AnimatePresence>
                {!prediction && !isLoading && (
                    <Card className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center bg-card/60">
                        <div className="flex flex-col items-center gap-2">
                            <div className="rounded-full bg-primary/10 p-4">
                            <ShieldCheck className="h-12 w-12 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mt-4">Awaiting Diagnosis</h3>
                            <p className="text-muted-foreground">
                                Your AI-powered diagnostic results will appear here.
                            </p>
                        </div>
                    </Card>
                )}
            </AnimatePresence>
            <PredictionResults prediction={prediction} isLoading={isLoading} />
            
            { (prediction || isLoading) && 
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="history">
                      <History className="mr-2 h-4 w-4" />
                      Session History
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="history">
                    <SessionHistory />
                  </TabsContent>
                </Tabs>
            }
          </div>
        </div>
      </main>
    </div>
  );
}
