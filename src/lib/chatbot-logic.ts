
import { MEDICAL_KNOWLEDGE } from './medical-knowledge';

export const QUICK_TOPICS = [
    "What are the main symptoms of pneumonia?", 
    "How is bacterial pneumonia treated?", 
    "What are the risks for elderly people?", 
    "How long does it take to recover?",
    "What is 'walking pneumonia'?",
    "Can you get pneumonia from COVID-19?",
];

export function getBotResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("symptom")) {
    if (q.includes("adult")) return MEDICAL_KNOWLEDGE.symptoms.common.join('\n') + '\n\n' + MEDICAL_KNOWLEDGE.symptoms.severity.mild;
    if (q.includes("child") || q.includes("pediatric")) return MEDICAL_KNOWLEDGE.pediatric.symptoms.join('\n');
    if (q.includes("elderly") || q.includes("old")) return MEDICAL_KNOWLEDGE.elderly.symptoms.join('\n');
    return `Pneumonia symptoms can vary by age and health. Common signs include:\n\n${MEDICAL_KNOWLEDGE.symptoms.common.join('\n')}\n\nAre you asking about a specific age group, like children or the elderly?`;
  }
  
  if (q.includes("treat")) {
     if (q.includes("bacterial")) return MEDICAL_KNOWLEDGE.treatment.antibiotics.join('\n');
     if (q.includes("viral")) return MEDICAL_KNOWLEDGE.treatment.antivirals.join('\n');
     if (q.includes("fungal")) return MEDICAL_KNOWLEDGE.treatment.antifungals;
     return `Treatment depends on the cause:\n\n- For bacterial pneumonia, doctors prescribe antibiotics.\n- For viral pneumonia, antivirals may be used.\n- General supportive care includes: ${MEDICAL_KNOWLEDGE.treatment.supportiveCare.join(', ')}.`;
  }

  if (q.includes("risk") || q.includes("complication")) {
     if (q.includes("elderly") || q.includes("old")) return MEDICAL_KNOWLEDGE.elderly.risks.join('\n');
     if (q.includes("child")) return "Children, especially under 2, are at higher risk due to their developing immune systems. Complications can include bloodstream infections or fluid around the lungs.";
    return `General risk factors include:\n\n${MEDICAL_KNOWLEDGE.riskFactors.general.join('\n')}`;
  }
  
  if (q.includes("recover") || q.includes("prognosis") || q.includes("long")) {
    return MEDICAL_KNOWLEDGE.recovery.timeline.join('\n');
  }

  if (q.includes("prevent")) {
    return `Key prevention strategies include:\n\n- Vaccinations: ${MEDICAL_KNOWLEDGE.prevention.vaccination.join(' ')}\n\n- Hygiene: ${MEDICAL_KNOWLEDGE.prevention.hygiene.join(' ')}\n\n- Lifestyle: ${MEDICAL_KNOWLEDGE.prevention.lifestyle.join(' ')}`;
  }
  
  if (q.includes("emergency") || q.includes("urgent") || q.includes("hospital")) {
      return `Seek emergency medical care immediately for these severe symptoms:\n\n${MEDICAL_KNOWLEDGE.emergency.whenToSeekHelp.join('\n')}`;
  }

  if (q.includes("diagnos") || q.includes("test")) {
    return `Doctors diagnose pneumonia using several methods:\n\n- ${MEDICAL_KNOWLEDGE.diagnosis.methods.join('\n- ')}`;
  }

  if (q.includes("walking pneumonia") || q.includes("atypical")) {
      return MEDICAL_KNOWLEDGE.overview.atypicalPneumonia;
  }

  if (q.includes("covid") || q.includes("coronavirus")) {
      return MEDICAL_KNOWLEDGE.overview.covidPneumonia;
  }

  return "I can provide expert information on pneumonia symptoms, causes, treatment, and recovery. Please ask a specific question or choose a quick topic.";
}
