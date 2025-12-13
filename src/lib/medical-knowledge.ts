
export const MEDICAL_KNOWLEDGE = {
  overview: {
    definition: "Pneumonia is a serious infection that inflames the air sacs (alveoli) in one or both lungs. The air sacs may fill with fluid or pus (purulent material), causing cough with phlegm or pus, fever, chills, and difficulty breathing. It can be life-threatening to anyone, but particularly to infants, young children, people older than age 65, and people with health problems or weakened immune systems.",
    types: ["Community-acquired pneumonia (CAP)", "Hospital-acquired pneumonia (HAP)", "Ventilator-associated pneumonia (VAP)", "Aspiration pneumonia"],
    causes: ["Bacteria (most common, e.g., Streptococcus pneumoniae)", "Viruses (e.g., influenza, COVID-19, RSV)", "Fungi (rare, typically in immunocompromised individuals)", "Chemical irritants or aspiration of foreign material"],
    atypicalPneumonia: "So-called 'walking pneumonia' is a non-medical term for a mild case of bacterial pneumonia, often caused by Mycoplasma pneumoniae. Symptoms are typically milder than other types of pneumonia, such as low-grade fever, dry cough, and fatigue, but may not be severe enough to require bed rest or hospitalization.",
    covidPneumonia: "Yes, pneumonia is a common and serious complication of COVID-19. It typically affects both lungs and can cause widespread inflammation, leading to severe shortness of breath and low oxygen levels, potentially progressing to Acute Respiratory Distress Syndrome (ARDS)."
  },
  symptoms: {
    common: [
      "Productive cough, which may produce greenish, yellow, or even bloody mucus (sputum)",
      "Fever, sweating, and shaking chills",
      "Shortness of breath (dyspnea), which may only occur with exertion initially",
      "Sharp or stabbing chest pain that gets worse when you breathe deeply or cough (pleuritic chest pain)",
      "Loss of appetite, low energy, and significant fatigue (malaise)",
      "Confusion or changes in mental awareness (especially in adults age 65 and older)",
    ],
    severity: {
      mild: "Mild symptoms may resemble a severe cold or flu, but they are more persistent and intense. You may feel unwell but can manage activities at home.",
      moderate: "Moderate symptoms include more persistent fever, pronounced shortness of breath during light activity, significant chest discomfort, and higher fatigue.",
      severe: "Severe symptoms are a medical emergency and include difficulty breathing even at rest, rapid heart rate, low blood pressure, high respiratory rate, and bluish skin color (cyanosis) from lack of oxygen.",
    },
  },
  riskFactors: {
    general: [
      "Age (infants under 2 and people over 65 are most at risk)",
      "Chronic diseases like asthma, COPD, bronchiectasis, or heart disease",
      "Weakened or suppressed immune system (due to HIV/AIDS, chemotherapy, organ transplant, or long-term steroid use)",
      "Smoking, which damages your lungs' natural defenses against respiratory infections",
      "Recent respiratory infection like a cold, laryngitis, or the flu",
      "Difficulty swallowing (dysphagia), which can lead to aspiration",
      "Hospitalization, especially if in an intensive care unit (ICU) or on a ventilator",
    ],
  },
  diagnosis: {
    methods: [
      "Physical Exam: A doctor will listen to your lungs with a stethoscope for abnormal bubbling or crackling sounds (rales) that suggest pneumonia.",
      "Chest X-ray: This is the primary imaging test to confirm the presence, location, and extent of lung inflammation or fluid.",
      "Blood Tests: A complete blood count (CBC) can show if your immune system is actively fighting an infection (e.g., high white blood cell count).",
      "Pulse Oximetry: This measures the oxygen saturation level in your blood to assess how well your lungs are functioning.",
      "Sputum Test: A sample of mucus from your cough can be analyzed to identify the specific bacteria or virus causing the infection, guiding treatment.",
      "CT Scan: Provides a more detailed image of the lungs and may be used if the pneumonia is not responding to treatment.",
      "AI indicators on an X-ray often look for opacities, consolidations, or infiltrates in specific lung regions, which appear as white or hazy areas where they should be clear.",
    ],
  },
  treatment: {
    antibiotics: ["For bacterial pneumonia, antibiotics are the primary treatment. Common choices include Amoxicillin, Doxycycline, or Azithromycin ('Z-Pak').", "For more severe cases, intravenous (IV) antibiotics in a hospital may be required.", "It is absolutely crucial to complete the entire course of antibiotics as prescribed, even if you start to feel better, to prevent recurrence and antibiotic resistance."],
    antivirals: ["If a virus like influenza is the cause, antiviral medications such as oseltamivir (Tamiflu) may be prescribed, which are most effective if started within 48 hours of symptom onset."],
    antifungals: "In the rare case of fungal pneumonia, antifungal medications like fluconazole or amphotericin B are used.",
    supportiveCare: ["Getting plenty of rest to help your body fight the infection.", "Drinking lots of fluids (especially water) to stay hydrated and loosen mucus.", "Using over-the-counter fever reducers and pain relievers like acetaminophen (Tylenol) or ibuprofen (Advil).", "Using a humidifier to help clear your lungs."],
    hospitalization: ["Hospitalization is necessary for severe cases, the very young or old, or those with significant underlying health issues. Treatment may include IV antibiotics, oxygen therapy, and respiratory support."],
  },
  prevention: {
    vaccination: ["Pneumococcal vaccines (PCV13, PCV15, PCV20, and PPSV23) are highly effective and recommended for children under 2, adults 65 or older, and individuals with certain chronic health conditions.", "Annual flu shots are important, as pneumonia is a common complication of influenza."],
    hygiene: ["Wash your hands frequently and thoroughly with soap and water, or use an alcohol-based hand sanitizer.", "Avoid touching your eyes, nose, and mouth.", "Clean and disinfect frequently touched surfaces regularly."],
    lifestyle: ["Do not smoke. Smoking is a major risk factor for pneumonia.", "Maintain a healthy diet, get regular exercise, and ensure adequate sleep to keep your immune system strong."],
  },
  recovery: {
    timeline: [
      "Week 1: With treatment, fever should improve within 2-3 days. You will likely still feel very tired and have a persistent cough.",
      "Weeks 2-4: You should begin to feel significantly better. Your energy levels will slowly increase, but fatigue and cough can linger.",
      "1-3 Months: Most symptoms should be resolved, but it's not uncommon for fatigue to persist. A follow-up chest X-ray may be done to ensure the infection has cleared.",
      "Up to 6 Months: For older adults or those with chronic illness, it can take six months or longer to feel back to normal. Full lung recovery can be a slow process.",
    ],
    complications: ["Potential complications include lung abscesses (pus-filled cavities in the lung), bacteremia (infection spreading to the bloodstream), pleural effusion (fluid around the lungs), and acute respiratory distress syndrome (ARDS), a form of lung failure."],
  },
  pediatric: {
    symptoms: ["In children, especially infants, symptoms can be non-specific. Look for rapid or difficult breathing, nasal flaring, grunting with breaths, decreased appetite or poor feeding, irritability, and fever or an unusually low body temperature."],
    treatment: ["Treatment is similar to adults but dosages are adjusted for weight. Hospitalization is more common for infants and young children to monitor breathing and hydration."],
  },
  elderly: {
    symptoms: ["Older adults may have fewer or milder classic symptoms like high fever or cough. The most prominent sign can be sudden confusion, delirium, or a change in mental awareness. They may also experience falls or worsening of other chronic health conditions."],
    risks: ["The elderly are at a much higher risk of severe complications, hospitalization, and death from pneumonia due to weaker immune systems and a higher likelihood of coexisting medical conditions like heart or lung disease."],
  },
  emergency: {
    whenToSeekHelp: [
      "Severe difficulty breathing or gasping for air",
      "Bluish or purple color of the lips, face, or nail beds (cyanosis)",
      "Sharp, persistent chest pain",
      "High fever (above 102.5°F or 39.2°C) that does not respond to medication",
      "Sudden confusion, disorientation, or difficulty staying awake",
    ],
  },
};


export const CLINICAL_REFERENCES = {
  normalXRayFindings: [
    "Lungs are clear and well-aerated bilaterally.",
    "No evidence of focal consolidation, infiltrate, or pleural effusion.",
    "The cardiomediastinal silhouette and pulmonary vasculature are within normal limits for the patient's age.",
    "Bony structures of the thoracic cage appear intact and without acute fracture.",
  ],
  pneumoniaFindings: {
    mild: [
      "Focal opacity or subtle infiltrate noted, often in a single lobe (e.g., right lower lobe), suggesting early or mild bronchopneumonia.",
      "Minimal peribronchial thickening or interstitial markings may be present.",
      "No significant pleural effusion or widespread consolidation is seen.",
      "The diaphragm and costophrenic angles are sharp.",
    ],
    moderate: [
      "Well-defined lobar or segmental consolidation is present, consistent with typical bacterial pneumonia (e.g., complete opacification of a lobe).",
      "Air-bronchograms (dark, branching lines of air-filled bronchi against opaque, fluid-filled alveoli) are likely visible within the area of consolidation.",
      "Potential for a small, associated parapneumonic pleural effusion.",
    ],
    severe: [
      "Widespread, bilateral, or multi-lobar opacities, often with a patchy or diffuse appearance, indicative of severe or atypical pneumonia (e.g., ARDS).",
      "Signs may be consistent with Acute Respiratory Distress Syndrome (ARDS), showing diffuse ground-glass opacities.",
      "Significant pleural effusion or empyema (pus in the pleural space) may be present.",
      "Loss of clear cardiac and diaphragmatic borders due to extensive opacification.",
    ],
  },
};

export const MEDICAL_DISCLAIMER = "This report is generated by an AI model for clinical decision support and is intended for use by qualified medical professionals. It is not a substitute for a definitive diagnosis by a licensed radiologist or physician. All AI-generated findings require clinical correlation with the patient's history, symptoms, and other diagnostic tests. The interpreting physician must review the source images to verify and confirm all findings before making any clinical decisions.";
