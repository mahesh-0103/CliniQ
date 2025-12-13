"use client";

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PredictionResponse } from '@/lib/types';
import { CLINICAL_REFERENCES, MEDICAL_DISCLAIMER } from '@/lib/medical-knowledge';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v11/v7_lq_QdGXV3yv7-T_W-DQ.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/helvetica/v11/v7_pq_QdGXV3yv7-T__-ClE.ttf', fontWeight: 'bold' },
  ],
});


const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 35,
    color: '#334155', // slate-700
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1E40AF',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E40AF',
    fontFamily: 'Helvetica-Bold',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: '#1E3A8A', // blue-800
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE', // blue-100
    paddingBottom: 3,
  },
  patientInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  patientInfoItem: {
    width: '50%',
    marginBottom: 4,
    flexDirection: 'row',
  },
  labelText: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#475569', // slate-600
    marginRight: 5,
  },
  valueText: {
    color: '#1E293B', // slate-800
  },
  diagnosisCard: {
    padding: 12,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  diagnosisText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  findingsList: {
    paddingLeft: 10,
  },
  findingItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  findingText: {
    flex: 1,
  },
  recommendations: {
    backgroundColor: '#EFF6FF', // blue-50
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB', // blue-600
    padding: 10,
    borderRadius: 3,
  },
  disclaimer: {
    marginTop: 20,
    fontSize: 8,
    color: '#64748B', // slate-500
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0', // slate-200
    paddingTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 35,
    right: 35,
    textAlign: 'center',
    fontSize: 8,
    color: '#94A3B8', // slate-400
  },
});


interface RadiologyReportProps {
  prediction: PredictionResponse;
}

export const RadiologyReport = ({ prediction }: RadiologyReportProps) => {
  const { patient_data, diagnosis, confidence_level, findings, recommendations } = prediction;
  const isPneumonia = diagnosis === 'PNEUMONIA DETECTED';

  const getClinicalRefs = () => {
    if (isPneumonia) {
      if (confidence_level > 90) return CLINICAL_REFERENCES.pneumoniaFindings.severe;
      if (confidence_level > 70) return CLINICAL_REFERENCES.pneumoniaFindings.moderate;
      return CLINICAL_REFERENCES.pneumoniaFindings.mild;
    }
    return CLINICAL_REFERENCES.normalXRayFindings;
  };
  
  const reportFindings = findings.length > 0 ? findings : getClinicalRefs();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>CliniQ AI Radiology Report</Text>
          <Text style={{ fontSize: 9, color: '#64748B' }}>CONFIDENTIAL</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient & Study Information</Text>
          <View style={styles.patientInfoGrid}>
            <View style={styles.patientInfoItem}><Text style={styles.labelText}>Patient Name:</Text><Text style={styles.valueText}>{patient_data.patient_name}</Text></View>
            <View style={styles.patientInfoItem}><Text style={styles.labelText}>Patient ID:</Text><Text style={styles.valueText}>{patient_data.patient_id}</Text></View>
            <View style={styles.patientInfoItem}><Text style={styles.labelText}>Age:</Text><Text style={styles.valueText}>{patient_data.patient_age}</Text></View>
            <View style={styles.patientInfoItem}><Text style={styles.labelText}>Gender:</Text><Text style={styles.valueText}>{patient_data.patient_gender}</Text></View>
             <View style={styles.patientInfoItem}><Text style={styles.labelText}>Report Date:</Text><Text style={styles.valueText}>{new Date().toLocaleDateString()}</Text></View>
            <View style={styles.patientInfoItem}><Text style={styles.labelText}>Study Type:</Text><Text style={styles.valueText}>Chest X-Ray AI Analysis</Text></View>
          </View>
          <Text style={{ marginTop: 8 }}><Text style={styles.labelText}>Reported Symptoms:</Text> <Text style={styles.valueText}>{patient_data.symptoms}</Text></Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Diagnostic Analysis</Text>
          <View style={{...styles.diagnosisCard, backgroundColor: isPneumonia ? '#DC2626' : '#10B981' }}>
             <Text style={styles.diagnosisText}>{diagnosis}</Text>
          </View>
          <View style={styles.patientInfoGrid}>
              <View style={styles.patientInfoItem}><Text style={styles.labelText}>Confidence Score:</Text><Text style={styles.valueText}>{(confidence_level || 0).toFixed(1)}%</Text></View>
              <View style={styles.patientInfoItem}><Text style={styles.labelText}>Interpretation:</Text><Text style={styles.valueText}>{isPneumonia ? 'Positive for Pneumonia' : 'Negative for Pneumonia'}</Text></View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Radiological Findings</Text>
          <View style={styles.findingsList}>
            {reportFindings.map((finding, i) => (
              <View key={i} style={styles.findingItem}>
                <Text style={styles.bulletPoint}>• </Text>
                <Text style={styles.findingText}>{finding}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clinical Recommendations</Text>
          <View style={styles.recommendations}>
             <Text>{recommendations}</Text>
          </View>
        </View>
        
        <View style={styles.disclaimer}>
            <Text style={{fontWeight: 'bold', fontFamily: 'Helvetica-Bold'}}>Disclaimer:</Text>
            <Text>{MEDICAL_DISCLAIMER}</Text>
        </View>

        <View style={styles.footer}>
          <Text>
            Report Generated by CliniQ AI | Page 1 of 1
          </Text>
          <Text>
            Timestamp: {new Date().toISOString()}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
