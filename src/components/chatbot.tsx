
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Trash2, BrainCircuit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBotResponse, QUICK_TOPICS } from "@/lib/chatbot-logic";

type Message = {
  text: string;
  sender: "user" | "bot";
  isGreeting?: boolean;
};

const GREETING_MESSAGE: Message = { 
  sender: 'bot', 
  text: "Hello! I'm your pneumonia medical assistant. As an AI, I can provide information based on established medical knowledge. I can help you with:\n\n- Common symptoms and warning signs\n- Treatment options and medications\n- Prevention strategies\n- Risk factors\n- Recovery timelines\n- When to seek emergency care\n\nAsk me anything, or select a quick topic to get started.",
  isGreeting: true
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([GREETING_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (query?: string) => {
    const text = query || inputValue;
    if (!text.trim()) return;

    const userMessage: Message = { text, sender: "user" };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate bot thinking
    setTimeout(() => {
        const botMessage: Message = { text: getBotResponse(text), sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInputValue("");
  };
  
  const handleClearHistory = () => {
    setMessages([GREETING_MESSAGE]);
  };

  const handleQuickTopic = (topic: string) => {
    handleSendMessage(topic);
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollableView = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (scrollableView) {
             scrollableView.scrollTop = scrollableView.scrollHeight;
        }
    }
  }, [messages]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full flex-1">
      {/* Left Column: Chat Interface */}
      <div className="md:col-span-2 flex flex-col bg-card rounded-lg p-4 border h-full">
        <ScrollArea className="flex-1 space-y-4 pr-4 -mr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === 'bot' && (
                   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-5 w-5" />
                   </div>
                )}
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-4 flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="e.g., What are the symptoms of pneumonia?"
            className="bg-background focus:ring-primary"
          />
          <Button onClick={() => handleSendMessage()} size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
           <Button onClick={handleClearHistory} variant="outline" size="icon" className="shrink-0">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Right Column: Quick Questions */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BrainCircuit className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Quick Questions</h2>
        </div>
        <p className="text-sm text-muted-foreground">Click any question below to ask the AI:</p>
        <div className="flex flex-col gap-3">
          {QUICK_TOPICS.map(topic => (
            <button 
              key={topic} 
              onClick={() => handleQuickTopic(topic)}
              className="w-full text-left p-3 rounded-md bg-muted/50 hover:bg-muted text-foreground transition-colors text-sm"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
