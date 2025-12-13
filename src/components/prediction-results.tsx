"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Legend,
} from "recharts";
import { Loader2, AlertTriangle, ShieldCheck, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PredictionResponse } from "@/lib/types";
import { Button } from "./ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { RadiologyReport } from "./radiology-report";

interface PredictionResultsProps {
  prediction: PredictionResponse | null;
  isLoading: boolean;
}

export function PredictionResults({ prediction, isLoading }: PredictionResultsProps) {
  if (isLoading) {
    return (
      <Card className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <h3 className="text-xl font-semibold">Analyzing Image...</h3>
        <p className="text-muted-foreground">The AI is processing the X-ray. This may take a moment.</p>
      </Card>
    );
  }

  if (!prediction) {
    return null;
  }

  const { diagnosis, confidence_level, findings } = prediction;
  const isPneumonia = diagnosis === "PNEUMONIA DETECTED";
  const confidence = confidence_level || 0;
  const displayFindings = Array.isArray(findings) ? findings : [];

  const radialData = [{ name: "confidence", value: confidence, fill: isPneumonia ? "hsl(var(--destructive))" : "hsl(var(--accent))" }];
  
  const severityData = [
    { name: 'Interpretation', Normal: 50, Moderate: 35, High: 15, indicator: confidence },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={cn("w-full", isPneumonia ? "border-destructive/50" : "border-accent/50")}>
          <CardHeader>
             <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Diagnostic Results</CardTitle>
                {typeof window !== 'undefined' && prediction.patient_data && (
                  <PDFDownloadLink
                    document={<RadiologyReport prediction={prediction} />}
                    fileName={`CliniQ-Report-${prediction.patient_data.patient_id}.pdf`}
                  >
                    {({ loading }) =>
                      <Button variant="outline" size="sm" disabled={loading}>
                        <Download className="mr-2 h-4 w-4" />
                        {loading ? 'Generating...' : 'Download Report'}
                      </Button>
                    }
                  </PDFDownloadLink>
                )}
             </div>
             <CardDescription>Patient ID: {prediction.patient_data?.patient_id}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={cn("p-4 text-center flex flex-col justify-center", isPneumonia ? "bg-destructive/10" : "bg-accent/10")}>
                <h3 className="text-lg font-semibold">Status</h3>
                <div className={cn("flex items-center justify-center gap-2 text-2xl font-bold", isPneumonia ? "text-destructive" : "text-accent")}>
                  {isPneumonia ? <AlertTriangle /> : <ShieldCheck />}
                  <span>{diagnosis}</span>
                </div>
              </Card>
              <Card className="p-4 flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold mb-2">AI Confidence Level</h3>
                <ResponsiveContainer width="100%" height={150}>
                    <RadialBarChart
                        innerRadius="70%"
                        outerRadius="90%"
                        data={radialData}
                        startAngle={180}
                        endAngle={0}
                        barSize={20}
                    >
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar background dataKey="value" cornerRadius={10} />
                        <text
                            x="50%"
                            y="75%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-foreground text-3xl font-bold"
                        >
                            {(confidence || 0).toFixed(1)}%
                        </text>
                    </RadialBarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-2">Severity Interpretation</h3>
                <ResponsiveContainer width="100%" height={80}>
                   <BarChart data={severityData} layout="vertical" margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" hide />
                    <Legend iconType="circle" align="center" verticalAlign="top" wrapperStyle={{top: 0}} />
                    <Bar dataKey="Normal" stackId="a" fill="hsl(var(--chart-2))" radius={[5, 0, 0, 5]} barSize={20} />
                    <Bar dataKey="Moderate" stackId="a" fill="hsl(var(--chart-3))" barSize={20} />
                    <Bar dataKey="High" stackId="a" fill="hsl(var(--chart-1))" radius={[0, 5, 5, 0]} barSize={20} />
                     <Bar dataKey="indicator" stackId="b" fill="hsl(var(--card))" barSize={30} radius={[2,2,2,2]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold">AI Findings</h3>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    {displayFindings.map((finding, index) => (
                        <li key={index}>{finding}</li>
                    ))}
                </ul>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
