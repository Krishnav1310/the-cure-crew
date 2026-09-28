// CAREVAULT Synthetic Healthcare & Epidemiology Dataset
// STRICT NOTICE: DEMO DATA — NO REAL PATIENT INFORMATION

export const PATIENTS = {
  'PT-2048': {
    id: 'PT-2048',
    qrCodeId: 'CV-QR-PT2048-SEC998',
    demographics: {
      name: 'Aarav Sharma', // Hidden from admin; shown to authorized clinician
      age: 38,
      sex: 'Male',
      bloodGroup: 'O+',
      contact: '+91 98201 44821',
      facility: 'CityCare Hospital, Pune',
      primaryCarePhysician: 'Dr. Ananya Kulkarni',
    },
    consent: {
      status: 'ACTIVE',
      grantedAt: '2026-08-15T09:00:00Z',
      expiresAt: '2026-12-31T23:59:59Z',
      allowedPurposes: ['Treatment', 'Follow-up', 'Emergency'],
      allowedScopes: ['Medical history', 'Prescriptions', 'Recent observations', 'Allergies'],
      revocableByPatient: true,
    },
    // Critical safety information (accessible during Break-Glass)
    criticalSafety: {
      bloodGroup: 'O+',
      criticalAllergies: [
        { allergen: 'Penicillin', reaction: 'Severe Anaphylaxis / Bronchospasm', severity: 'HIGH' },
        { allergen: 'Sulfa Drugs', reaction: 'Angioedema & Diffuse Urticaria', severity: 'MODERATE' },
      ],
      currentMedications: [
        { name: 'Metformin Hydrochloride', dosage: '500 mg', frequency: 'Twice daily after meals', purpose: 'Glycemic control' },
        { name: 'Telmisartan', dosage: '40 mg', frequency: 'Once daily morning', purpose: 'Hypertension management' },
      ],
      criticalAlerts: [
        'History of severe penicillin allergy. Do not administer beta-lactam antibiotics.',
        'Diabetic management: Monitor fasting glucose levels.',
      ],
    },
    // Longitudinal Clinical Record (Full clinical view for authorized clinician)
    timeline: [
      {
        id: 'VST-2026-0918',
        date: '2026-09-18',
        facility: 'CityCare Hospital, Pune',
        clinician: 'Dr. Ananya Kulkarni (General Medicine)',
        type: 'Outpatient Visit',
        chiefComplaint: 'High-grade fever with severe retro-orbital pain and myalgia for 4 days',
        diagnosis: {
          code: 'A90',
          condition: 'Dengue Fever (Non-severe with warning signs)',
          category: 'Vector-Borne Infection',
          notes: 'Tourniquet test positive. Mild petechial rash observed on lower extremities.',
        },
        vitals: {
          temperature: '102.4 °F',
          bloodPressure: '118/76 mmHg',
          pulse: '98 bpm',
          respiratoryRate: '18 bpm',
          spO2: '98% on room air',
        },
        prescriptions: [
          { drug: 'Paracetamol', dosage: '650 mg', route: 'Oral', frequency: 'TDS (Three times daily)', duration: '5 days', instructions: 'Strictly avoid NSAIDs like Ibuprofen/Aspirin' },
          { drug: 'Oral Rehydration Salts (ORS)', dosage: '1 packet in 1L water', route: 'Oral', frequency: 'Ad libitum', duration: '5 days', instructions: 'Maintain adequate hydration (>2.5L/day)' },
        ],
        observations: [
          { test: 'Platelet Count', result: '112,000 /µL', normalRange: '150,000 - 450,000 /µL', flag: 'LOW', interpretation: 'Thrombocytopenia secondary to dengue' },
          { test: 'Dengue NS1 Antigen (Rapid)', result: 'POSITIVE', normalRange: 'Negative', flag: 'ABNORMAL', interpretation: 'Acute dengue viremia' },
          { test: 'Hematocrit (PCV)', result: '42%', normalRange: '38 - 50%', flag: 'NORMAL', interpretation: 'No hemoconcentration' },
        ],
      },
      {
        id: 'VST-2026-0829',
        date: '2026-08-29',
        facility: 'CityCare Hospital, Pune',
        clinician: 'Dr. Ananya Kulkarni',
        type: 'Routine Follow-up',
        chiefComplaint: 'Quarterly diabetic check-up & prescription refill',
        diagnosis: {
          code: 'E11.9',
          condition: 'Type 2 Diabetes Mellitus without complications',
          category: 'Endocrine & Metabolic',
          notes: 'Well-controlled fasting sugar. Dietary compliance satisfactory.',
        },
        vitals: {
          temperature: '98.4 °F',
          bloodPressure: '124/82 mmHg',
          pulse: '74 bpm',
          respiratoryRate: '16 bpm',
          spO2: '99%',
        },
        prescriptions: [
          { drug: 'Metformin Hydrochloride', dosage: '500 mg', route: 'Oral', frequency: 'BD (Twice daily)', duration: '90 days', instructions: 'Take with or after breakfast and dinner' },
        ],
        observations: [
          { test: 'Fasting Blood Glucose', result: '128 mg/dL', normalRange: '70 - 100 mg/dL', flag: 'SLIGHTLY_ELEVATED', interpretation: 'Target reached for diabetic management' },
          { test: 'HbA1c', result: '6.7%', normalRange: '< 5.7%', flag: 'ELEVATED', interpretation: 'Satisfactory long-term glycemic control' },
          { test: 'Serum Creatinine', result: '0.9 mg/dL', normalRange: '0.7 - 1.2 mg/dL', flag: 'NORMAL', interpretation: 'Normal renal function' },
        ],
      },
      {
        id: 'VST-2026-0710',
        date: '2026-07-10',
        facility: 'CityCare Hospital, Pune',
        clinician: 'Dr. Vikram Seth (Pulmonology)',
        type: 'Consultation',
        chiefComplaint: 'Persistent dry cough following seasonal change',
        diagnosis: {
          code: 'J20.9',
          condition: 'Acute Bronchitis',
          category: 'Respiratory Infection',
          notes: 'Bilateral vesicular breath sounds. No wheezing.',
        },
        vitals: {
          temperature: '99.1 °F',
          bloodPressure: '120/80 mmHg',
          pulse: '80 bpm',
          respiratoryRate: '17 bpm',
          spO2: '98%',
        },
        prescriptions: [
          { drug: 'Levosalbutamol + Guaiphenesin syrup', dosage: '10 ml', route: 'Oral', frequency: 'TDS', duration: '7 days', instructions: 'Take after food' },
        ],
        observations: [
          { test: 'Chest X-Ray PA View', result: 'Clear lung fields', normalRange: 'Clear', flag: 'NORMAL', interpretation: 'No consolidation or infiltration' },
        ],
      },
    ],
  },
  'PT-1001': {
    id: 'PT-1001',
    qrCodeId: 'CV-QR-PT1001-SEC512',
    demographics: {
      name: 'Priya Patel',
      age: 29,
      sex: 'Female',
      bloodGroup: 'B+',
      contact: '+91 98334 11204',
      facility: 'Metro General Hospital, Mumbai',
      primaryCarePhysician: 'Dr. Sameer Rao',
    },
    consent: {
      status: 'ACTIVE',
      grantedAt: '2026-08-01T10:00:00Z',
      expiresAt: '2026-12-31T23:59:59Z',
      allowedPurposes: ['Treatment', 'Follow-up', 'Emergency'],
      allowedScopes: ['Medical history', 'Prescriptions', 'Recent observations'],
      revocableByPatient: true,
    },
    criticalSafety: {
      bloodGroup: 'B+',
      criticalAllergies: [
        { allergen: 'No Known Drug Allergies (NKDA)', reaction: 'None documented', severity: 'NONE' },
      ],
      currentMedications: [
        { name: 'Ferrous Ascorbate + Folic Acid', dosage: '100 mg / 1.5 mg', frequency: 'Once daily after lunch', purpose: 'Gestational nutritional supplement' },
        { name: 'Calcium Carbonate + Vit D3', dosage: '500 mg', frequency: 'Once daily bedtime', purpose: 'Maternal bone support' },
      ],
      criticalAlerts: [
        'Second trimester pregnancy (22 weeks). G1P0. Teratogenic medication restriction.',
      ],
    },
    timeline: [
      {
        id: 'VST-1001-0902',
        date: '2026-09-02',
        facility: 'Metro General Hospital, Mumbai',
        clinician: 'Dr. Sameer Rao (Infectious Diseases)',
        type: 'Urgent Care Visit',
        chiefComplaint: 'Tertian chills, high spiking fever, and severe headache for 3 days',
        diagnosis: {
          code: 'B54',
          condition: 'Plasmodium Vivax Malaria',
          category: 'Vector-Borne Infection',
          notes: 'Peripheral blood film confirmed trophozoites of P. vivax. Parasitemia <1%.',
        },
        vitals: {
          temperature: '103.1 °F',
          bloodPressure: '112/72 mmHg',
          pulse: '104 bpm',
          respiratoryRate: '20 bpm',
          spO2: '99%',
        },
        prescriptions: [
          { drug: 'Chloroquine Phosphate', dosage: '600 mg base stat, followed by 300 mg at 6h, 24h, 48h', route: 'Oral', frequency: 'Standard regimen', duration: '3 days', instructions: 'Take with meal. Primaquine deferred post-delivery.' },
          { drug: 'Paracetamol', dosage: '500 mg', route: 'Oral', frequency: 'SOS (as needed for fever)', duration: '3 days', instructions: 'Max 2g/day' },
        ],
        observations: [
          { test: 'Malaria Rapid Diagnostic Test (RDT)', result: 'POSITIVE (Pv LDH)', normalRange: 'Negative', flag: 'ABNORMAL', interpretation: 'Confirmed vivax malaria' },
          { test: 'Hemoglobin (Hb)', result: '10.2 g/dL', normalRange: '11.5 - 15.0 g/dL', flag: 'LOW', interpretation: 'Mild normocytic normochromic anemia' },
          { test: 'Platelet Count', result: '168,000 /µL', normalRange: '150,000 - 450,000 /µL', flag: 'NORMAL', interpretation: 'Normal platelet count' },
        ],
      },
      {
        id: 'VST-1001-0814',
        date: '2026-08-14',
        facility: 'Metro General Hospital, Mumbai',
        clinician: 'Dr. Neha Shah (Obstetrics & Gynecology)',
        type: 'Antenatal Consultation',
        chiefComplaint: 'Routine 20-week anomaly scan and maternal wellness visit',
        diagnosis: {
          code: 'Z34.8',
          condition: 'Normal 2nd Trimester Pregnancy (Gravida 1)',
          category: 'Obstetrics & Maternal Care',
          notes: 'Fetal anatomy survey normal. Estimated fetal weight 360g. Fundal height corresponds to dates.',
        },
        vitals: {
          temperature: '98.2 °F',
          bloodPressure: '110/70 mmHg',
          pulse: '76 bpm',
          respiratoryRate: '16 bpm',
          spO2: '100%',
        },
        prescriptions: [
          { drug: 'Ferrous Ascorbate + Folic Acid', dosage: '100 mg / 1.5 mg', route: 'Oral', frequency: 'OD (Once daily)', duration: '60 days', instructions: 'Take with orange juice or water' },
        ],
        observations: [
          { test: 'Obstetric Ultrasound (Level II Anomaly)', result: 'No gross congenital anomalies', normalRange: 'Normal', flag: 'NORMAL', interpretation: 'Single active intrauterine fetus' },
          { test: 'Fasting Blood Sugar', result: '86 mg/dL', normalRange: '< 92 mg/dL', flag: 'NORMAL', interpretation: 'Gestational diabetes screen negative' },
        ],
      },
    ],
  },
  'PT-1002': {
    id: 'PT-1002',
    qrCodeId: 'CV-QR-PT1002-SEC409',
    demographics: {
      name: 'Rohan Joshi',
      age: 45,
      sex: 'Male',
      bloodGroup: 'A+',
      contact: '+91 94220 89112',
      facility: 'Western Medical, Nashik',
      primaryCarePhysician: 'Dr. Meera Sen',
    },
    consent: {
      status: 'ACTIVE',
      grantedAt: '2026-07-20T08:00:00Z',
      expiresAt: '2026-11-30T23:59:59Z',
      allowedPurposes: ['Treatment', 'Follow-up', 'Emergency'],
      allowedScopes: ['Medical history', 'Prescriptions', 'Recent observations', 'Allergies'],
      revocableByPatient: true,
    },
    criticalSafety: {
      bloodGroup: 'A+',
      criticalAllergies: [
        { allergen: 'Aspirin (Acetylsalicylic Acid)', reaction: 'Acute Severe Bronchospasm & Facial Angioedema', severity: 'HIGH' },
        { allergen: 'Ibuprofen', reaction: 'Cross-reactive bronchoconstriction', severity: 'MODERATE' },
      ],
      currentMedications: [
        { name: 'Telmisartan', dosage: '40 mg', frequency: 'Once daily morning', purpose: 'Essential hypertension' },
        { name: 'Amlodipine', dosage: '5 mg', frequency: 'Once daily morning', purpose: 'Blood pressure control' },
        { name: 'Atorvastatin', dosage: '20 mg', frequency: 'Once daily bedtime', purpose: 'Hypercholesterolemia' },
      ],
      criticalAlerts: [
        'Aspirin-exacerbated respiratory disease (AERD). Strict contraindication for all COX-1 inhibitors/NSAIDs.',
      ],
    },
    timeline: [
      {
        id: 'VST-1002-0910',
        date: '2026-09-10',
        facility: 'Western Medical, Nashik',
        clinician: 'Dr. Meera Sen (Cardiovascular Care)',
        type: 'Outpatient Follow-up',
        chiefComplaint: 'Bilateral occipital morning headaches and mild exertional fatigue',
        diagnosis: {
          code: 'I10',
          condition: 'Primary Essential Hypertension (Stage 2 uncontrolled)',
          category: 'Cardiovascular Disorder',
          notes: 'Repeated clinic BP average 154/96 mmHg. Added Amlodipine 5mg to existing ARB regimen.',
        },
        vitals: {
          temperature: '98.6 °F',
          bloodPressure: '154/96 mmHg',
          pulse: '84 bpm',
          respiratoryRate: '16 bpm',
          spO2: '97%',
        },
        prescriptions: [
          { drug: 'Telmisartan + Amlodipine', dosage: '40 mg / 5 mg', route: 'Oral', frequency: 'OD (Once daily in morning)', duration: '60 days', instructions: 'Take regularly at 8 AM. Monitor for pedal edema.' },
          { drug: 'Atorvastatin', dosage: '20 mg', route: 'Oral', frequency: 'OD (Bedtime)', duration: '60 days', instructions: 'Lipid lowering' },
        ],
        observations: [
          { test: 'Lipid Profile - Total Cholesterol', result: '238 mg/dL', normalRange: '< 200 mg/dL', flag: 'ELEVATED', interpretation: 'Hypercholesterolemia' },
          { test: 'Lipid Profile - LDL Cholesterol', result: '162 mg/dL', normalRange: '< 100 mg/dL', flag: 'HIGH', interpretation: 'Atherogenic risk factor' },
          { test: 'Serum Creatinine', result: '1.0 mg/dL', normalRange: '0.7 - 1.2 mg/dL', flag: 'NORMAL', interpretation: 'Adequate renal filtration' },
          { test: '12-Lead ECG', result: 'Normal sinus rhythm. No LVH voltage criteria.', normalRange: 'Normal', flag: 'NORMAL', interpretation: 'Stable cardiac rhythm' },
        ],
      },
    ],
  },
  'PT-1003': {
    id: 'PT-1003',
    qrCodeId: 'CV-QR-PT1003-SEC881',
    demographics: {
      name: 'Sneha Kulkarni',
      age: 34,
      sex: 'Female',
      bloodGroup: 'AB+',
      contact: '+91 97654 33219',
      facility: 'CityCare Hospital, Pune',
      primaryCarePhysician: 'Dr. Ananya Kulkarni',
    },
    consent: {
      status: 'ACTIVE',
      grantedAt: '2026-09-01T09:00:00Z',
      expiresAt: '2026-10-31T23:59:59Z',
      allowedPurposes: ['Treatment', 'Follow-up', 'Emergency'],
      allowedScopes: ['Medical history', 'Prescriptions', 'Recent observations'],
      revocableByPatient: true,
    },
    criticalSafety: {
      bloodGroup: 'AB+',
      criticalAllergies: [
        { allergen: 'Shellfish / Crustaceans', reaction: 'Periorbital Edema & Urticaria', severity: 'MODERATE' },
      ],
      currentMedications: [
        { name: 'Levothyroxine Sodium', dosage: '50 mcg', frequency: 'Once daily empty stomach', purpose: 'Primary hypothyroidism' },
        { name: 'Sumatriptan Succinate', dosage: '50 mg', frequency: 'PRN at migraine onset', purpose: 'Acute abortive migraine therapy' },
      ],
      criticalAlerts: [
        'Take Levothyroxine at least 45 minutes before morning tea/breakfast for optimal absorption.',
      ],
    },
    timeline: [
      {
        id: 'VST-1003-0915',
        date: '2026-09-15',
        facility: 'CityCare Hospital, Pune',
        clinician: 'Dr. Ananya Kulkarni (General Medicine)',
        type: 'Neurology Consultation',
        chiefComplaint: 'Unilateral throbbing frontotemporal headache with photophobia and nausea',
        diagnosis: {
          code: 'G43.1',
          condition: 'Migraine with Visual Aura',
          category: 'Neurological Condition',
          notes: 'Scintillating scotoma prior to headache onset lasting 30 minutes. Non-responsive to paracetamol.',
        },
        vitals: {
          temperature: '98.4 °F',
          bloodPressure: '118/74 mmHg',
          pulse: '78 bpm',
          respiratoryRate: '15 bpm',
          spO2: '99%',
        },
        prescriptions: [
          { drug: 'Sumatriptan', dosage: '50 mg', route: 'Oral', frequency: 'Stat at aura onset, may repeat in 2h if needed (Max 200mg/24h)', duration: '5 doses', instructions: 'Rest in a dark, quiet room' },
          { drug: 'Naproxen Sodium', dosage: '250 mg', route: 'Oral', frequency: 'BD with meals during headache', duration: '3 days', instructions: 'Take with food' },
        ],
        observations: [
          { test: 'Thyroid Stimulating Hormone (TSH)', result: '5.8 mIU/L', normalRange: '0.4 - 4.2 mIU/L', flag: 'ELEVATED', interpretation: 'Subclinical hypothyroidism under-treated' },
          { test: 'Serum 25-OH Vitamin D', result: '16.4 ng/mL', normalRange: '30 - 100 ng/mL', flag: 'LOW', interpretation: 'Vitamin D insufficiency' },
        ],
      },
    ],
  },
  'PT-1004': {
    id: 'PT-1004',
    qrCodeId: 'CV-QR-PT1004-SEC302',
    demographics: {
      name: 'Vikram Deshmukh',
      age: 52,
      sex: 'Male',
      bloodGroup: 'O-',
      contact: '+91 99210 55431',
      facility: 'Civil Hospital, Nagpur',
      primaryCarePhysician: 'Dr. Prakash G',
    },
    consent: {
      status: 'REVOKED', // Consent Revoked test case!
      grantedAt: '2026-05-10T09:00:00Z',
      revokedAt: '2026-09-01T14:30:00Z',
      expiresAt: '2026-06-10T09:00:00Z',
      allowedPurposes: [],
      allowedScopes: [],
      revocableByPatient: true,
    },
    criticalSafety: {
      bloodGroup: 'O-',
      criticalAllergies: [
        { allergen: 'IV Iodinated Radiocontrast Media', reaction: 'Severe Anaphylactoid Collapse & Contrast Nephropathy', severity: 'HIGH' },
      ],
      currentMedications: [
        { name: 'Torsemide', dosage: '10 mg', frequency: 'Once daily morning', purpose: 'Fluid volume reduction' },
        { name: 'Sodium Bicarbonate', dosage: '500 mg', frequency: 'Twice daily', purpose: 'Metabolic acidosis management' },
      ],
      criticalAlerts: [
        'PATIENT CONSENT REVOKED: Standard clinical access blocked. Break-Glass emergency override delivers restricted safety profile only.',
        'Stage 3b CKD (eGFR 38 mL/min/1.73m²). Avoid NSAIDs and aminoglycoside antibiotics.',
      ],
    },
    timeline: [
      {
        id: 'VST-1004-0820',
        date: '2026-08-20',
        facility: 'Civil Hospital, Nagpur',
        clinician: 'Dr. Prakash G (Nephrology)',
        type: 'Nephrology Review',
        chiefComplaint: 'Bilateral pedal edema and persistent nocturia for 3 weeks',
        diagnosis: {
          code: 'N18.3b',
          condition: 'Chronic Kidney Disease (Stage 3b)',
          category: 'Renal & Urological',
          notes: 'Serum creatinine elevated to 2.1 mg/dL. Microalbuminuria present.',
        },
        vitals: {
          temperature: '98.2 °F',
          bloodPressure: '148/92 mmHg',
          pulse: '82 bpm',
          respiratoryRate: '18 bpm',
          spO2: '96%',
        },
        prescriptions: [
          { drug: 'Torsemide', dosage: '10 mg', route: 'Oral', frequency: 'OD (Morning)', duration: '30 days', instructions: 'Monitor daily weight' },
        ],
        observations: [
          { test: 'Serum Creatinine', result: '2.1 mg/dL', normalRange: '0.7 - 1.2 mg/dL', flag: 'ELEVATED', interpretation: 'Moderate-to-severe renal impairment' },
          { test: 'Estimated GFR (CKD-EPI)', result: '38 mL/min/1.73m²', normalRange: '> 60 mL/min', flag: 'LOW', interpretation: 'CKD Stage 3b' },
          { test: 'Serum Potassium', result: '4.8 mEq/L', normalRange: '3.5 - 5.0 mEq/L', flag: 'NORMAL', interpretation: 'Normal electrolyte balance' },
        ],
      },
    ],
  },
  'PT-1005': {
    id: 'PT-1005',
    qrCodeId: 'CV-QR-PT1005-SEC774',
    demographics: {
      name: 'Meera Nair',
      age: 41,
      sex: 'Female',
      bloodGroup: 'B-',
      contact: '+91 91580 66723',
      facility: 'Apollo Clinic, Kolhapur',
      primaryCarePhysician: 'Dr. Sunita K',
    },
    consent: {
      status: 'ACTIVE',
      grantedAt: '2026-08-10T11:00:00Z',
      expiresAt: '2026-12-31T23:59:59Z',
      allowedPurposes: ['Treatment', 'Follow-up', 'Emergency'],
      allowedScopes: ['Medical history', 'Prescriptions', 'Recent observations', 'Allergies'],
      revocableByPatient: true,
    },
    criticalSafety: {
      bloodGroup: 'B-',
      criticalAllergies: [
        { allergen: 'Diclofenac Sodium', reaction: 'Severe Wheezing and Generalized Hives', severity: 'HIGH' },
        { allergen: 'Egg Protein', reaction: 'Oral Pruritus', severity: 'MILD' },
      ],
      currentMedications: [
        { name: 'Budesonide + Formoterol Inhaler', dosage: '200 mcg / 6 mcg', frequency: 'Two puffs twice daily', purpose: 'Maintenance asthma control' },
        { name: 'Montelukast Sodium', dosage: '10 mg', frequency: 'Once daily bedtime', purpose: 'Allergic rhinitis prophylaxis' },
      ],
      criticalAlerts: [
        'Severe asthmatic response to NSAIDs. Strict precaution against analgesics like Diclofenac/Ibuprofen.',
      ],
    },
    timeline: [
      {
        id: 'VST-1005-0912',
        date: '2026-09-12',
        facility: 'Apollo Clinic, Kolhapur',
        clinician: 'Dr. Sunita K (Pulmonology)',
        type: 'Specialist Consultation',
        chiefComplaint: 'Exacerbation of nocturnal wheezing and tightness in chest following monsoon change',
        diagnosis: {
          code: 'J45.40',
          condition: 'Moderate Persistent Bronchial Asthma (Acute Exacerbation)',
          category: 'Respiratory Infection',
          notes: 'Bilateral expiratory wheezes on auscultation. Peak flow dropped to 280 L/min (baseline 390 L/min).',
        },
        vitals: {
          temperature: '98.8 °F',
          bloodPressure: '122/78 mmHg',
          pulse: '92 bpm',
          respiratoryRate: '22 bpm',
          spO2: '94% on room air',
        },
        prescriptions: [
          { drug: 'Levosalbutamol Inhaler (Rescue)', dosage: '100 mcg', route: 'Inhalation via spacer', frequency: '2 puffs PRN for breathlessness', duration: '30 days', instructions: 'Rinse mouth after use' },
          { drug: 'Budesonide + Formoterol Inhaler (Controller)', dosage: '200 / 6 mcg', route: 'Inhalation', frequency: '2 puffs BD regularly', duration: '60 days', instructions: 'Do not stop without doctor guidance' },
          { drug: 'Montelukast Sodium', dosage: '10 mg', route: 'Oral', frequency: 'OD at night', duration: '30 days', instructions: 'Take after dinner' },
        ],
        observations: [
          { test: 'Peak Expiratory Flow Rate (PEFR)', result: '280 L/min', normalRange: '380 - 450 L/min', flag: 'LOW', interpretation: 'Moderate airway obstruction' },
          { test: 'Complete Blood Count - Absolute Eosinophil Count', result: '620 /µL', normalRange: '40 - 400 /µL', flag: 'ELEVATED', interpretation: 'Allergic eosinophilia' },
          { test: 'Serum Total IgE', result: '480 IU/mL', normalRange: '< 100 IU/mL', flag: 'HIGH', interpretation: 'Atopic diathesis' },
        ],
      },
    ],
  },
};

// POPULATION INTELLIGENCE DATASET (Aggregated Epidemiology Cases)
// Over 2,600 synthetic cases across 5 regions in Maharashtra
export const REGIONS = ['Pune', 'Mumbai', 'Nashik', 'Nagpur', 'Kolhapur'];
export const CONDITIONS = [
  'Dengue',
  'Respiratory infection',
  'Diabetes',
  'Hypertension',
  'Influenza',
  'Malaria',
];

// Pre-aggregated summary data by Region and Condition
export const REGIONAL_CONDITION_SUMMARY = {
  Pune: {
    Dengue: 342,
    'Respiratory infection': 418,
    Diabetes: 295,
    Hypertension: 310,
    Influenza: 220,
    Malaria: 64,
  },
  Mumbai: {
    Dengue: 485,
    'Respiratory infection': 590,
    Diabetes: 410,
    Hypertension: 430,
    Influenza: 315,
    Malaria: 142,
  },
  Nashik: {
    Dengue: 128,
    'Respiratory infection': 210,
    Diabetes: 145,
    Hypertension: 160,
    Influenza: 98,
    Malaria: 32,
  },
  Nagpur: {
    Dengue: 195,
    'Respiratory infection': 275,
    Diabetes: 180,
    Hypertension: 205,
    Influenza: 140,
    Malaria: 78,
  },
  Kolhapur: {
    Dengue: 84,
    'Respiratory infection': 135,
    Diabetes: 92,
    Hypertension: 110,
    Influenza: 65,
    Malaria: 18,
  },
};

// Weekly time trends for August - September 2026
export const TIME_TRENDS_2026 = [
  { week: 'W31 (Aug 1-7)', Dengue: 142, 'Respiratory infection': 230, Malaria: 45, Influenza: 110, Total: 527 },
  { week: 'W32 (Aug 8-14)', Dengue: 186, 'Respiratory infection': 245, Malaria: 52, Influenza: 125, Total: 608 },
  { week: 'W33 (Aug 15-21)', Dengue: 240, 'Respiratory infection': 270, Malaria: 68, Influenza: 148, Total: 726 },
  { week: 'W34 (Aug 22-28)', Dengue: 295, 'Respiratory infection': 290, Malaria: 74, Influenza: 162, Total: 821 },
  { week: 'W35 (Aug 29-Sep 4)', Dengue: 350, 'Respiratory infection': 310, Malaria: 88, Influenza: 175, Total: 923 },
  { week: 'W36 (Sep 5-11)', Dengue: 388, 'Respiratory infection': 335, Malaria: 94, Influenza: 190, Total: 1007 },
  { week: 'W37 (Sep 12-18)', Dengue: 420, 'Respiratory infection': 360, Malaria: 102, Influenza: 205, Total: 1087 },
  { week: 'W38 (Sep 19-25)', Dengue: 395, 'Respiratory infection': 340, Malaria: 89, Influenza: 185, Total: 1009 },
];

// SPECIALLY CURATED SUBSET FOR DEMONSTRATING K-ANONYMITY & DIFFERENCING ATTACKS
// Problem Statement Specifics:
// 1. Group with 3 people -> SUPPRESSED (K=5)
// 2. Query 1: All cases = 100, Query 2: Male cases = 96, Query 3: Female cases = 4
//    Recognizes 100 - 96 = 4 and blocks potential inference through differencing!
export const SPECIAL_DEMO_COHORTS = {
  // Small group cohort: Kolhapur -> Malaria -> Age 70+
  smallGroup: {
    region: 'Kolhapur',
    condition: 'Malaria',
    ageGroup: '70+',
    actualCount: 3, // < 5 -> MUST BE SUPPRESSED
    description: 'Elderly malaria cases in rural Kolhapur sub-district',
  },
  // Differencing attack scenario cohort: Pune Ward-4 Dengue Cohort
  differencingCohort: {
    region: 'Pune',
    condition: 'Dengue',
    subdistrict: 'Ward-4 East',
    period: 'Aug 15 - Aug 31',
    allCases: 100,
    maleCases: 96,
    femaleCases: 4, // Suppressed because < 5
  },
};
