
"use client";

import { usePredictionStore } from "@/lib/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Info } from "lucide-react";

export function SessionHistory() {
  const predictions = usePredictionStore((state) => state.predictions);

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>Current Session History</CardTitle>
        <CardDescription>
          A log of diagnoses from this session. Data will be cleared when you close the tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {predictions.length === 0 ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>No Diagnoses Yet</AlertTitle>
            <AlertDescription>
              Run a new diagnosis to see the results here.
            </AlertDescription>
          </Alert>
        ) : (
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead className="text-right">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {predictions.map((p, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{p.patient_data.patient_id}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          p.diagnosis === "PNEUMONIA DETECTED"
                            ? "destructive"
                            : "secondary"
                        }
                        className={p.diagnosis === 'NORMAL FINDINGS' ? "bg-emerald-900/50 text-emerald-300" : ""}
                      >
                        {p.diagnosis}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {(p.confidence_level || 0).toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
