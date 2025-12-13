"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, X, Loader2, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { PatientFormData, PatientDataSchema, PredictionResponse, ApiPredictionResponse } from "@/lib/types";
import { fetchPredict } from "@/lib/fetch-predict";
import { usePredictionStore } from "@/lib/store";

interface PredictionFormProps {
  setPrediction: (prediction: PredictionResponse | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

export function PredictionForm({ setPrediction, setIsLoading, isLoading }: PredictionFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const { toast } = useToast();
  const { addPrediction, predictions } = usePredictionStore();

  const form = useForm<PatientFormData>({
    resolver: zodResolver(PatientDataSchema),
    defaultValues: {
      patient_name: "",
      age: undefined,
      gender: "Male",
      symptoms: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageBase64(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    const fileInput = document.getElementById("xray-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = async (values: PatientFormData) => {
    if (!imageBase64) {
      toast({
        title: "Image Missing",
        description: "Please upload an X-ray image to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setPrediction(null);

    try {
      const patientIdCounter = predictions.length + 1;
      const pid = `PID-${String(patientIdCounter).padStart(4, '0')}`;
      
      const apiResponse: ApiPredictionResponse = await fetchPredict(imageBase64, { ...values, patient_id: pid });
      
      const fullPrediction: PredictionResponse = {
        diagnosis: apiResponse.label === 'PNEUMONIA' ? 'PNEUMONIA DETECTED' : 'NORMAL FINDINGS',
        confidence_level: apiResponse.confidence,
        findings: apiResponse.findings || ["No specific findings were detailed by the model."],
        recommendations: apiResponse.recommendations || "Consult with a radiologist for a definitive diagnosis.",
        patient_data: {
            patient_name: values.patient_name, 
            patient_age: values.age,
            patient_gender: values.gender,
            symptoms: values.symptoms,
            patient_id: pid
        }
      };

      setPrediction(fullPrediction);
      addPrediction(fullPrediction);

    } catch (error) {
      console.error("Diagnosis failed:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "Diagnosis Failed",
        description: `Could not get a response from the AI model. ${errorMessage}`,
        variant: "destructive",
      });
      setPrediction(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>1. Upload X-Ray Image</CardTitle>
            <CardDescription>
              Select a chest X-ray image for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <label
                htmlFor="xray-upload"
                className={cn(
                  "group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-8 transition-colors hover:border-primary hover:bg-muted/50",
                  imagePreview && "p-0"
                )}
              >
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="X-ray preview"
                      width={400}
                      height={400}
                      className="h-auto w-full max-h-[400px] rounded-md object-contain"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 rounded-full z-10"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 font-semibold text-primary">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                )}
              </label>
              <Input
                id="xray-upload"
                type="file"
                className="sr-only"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Patient Information</CardTitle>
            <CardDescription>
              Enter the patient's details for the report.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="patient_name">Full Name</Label>
                <Input id="patient_name" {...form.register("patient_name")} disabled={isLoading} />
                {form.formState.errors.patient_name && <p className="text-sm text-destructive mt-1">{form.formState.errors.patient_name.message}</p>}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" {...form.register("age")} disabled={isLoading} />
                  {form.formState.errors.age && <p className="text-sm text-destructive mt-1">{form.formState.errors.age.message}</p>}
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>                   <Controller
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  {form.formState.errors.gender && <p className="text-sm text-destructive mt-1">{form.formState.errors.gender.message}</p>}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea id="symptoms" rows={3} {...form.register("symptoms")} disabled={isLoading} />
              {form.formState.errors.symptoms && <p className="text-sm text-destructive mt-1">{form.formState.errors.symptoms.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Diagnosing...
                </>
              ) : (
                <>
                  <FlaskConical className="mr-2 h-4 w-4" />
                  Run Diagnostic Analysis
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </motion.div>
  );
}
