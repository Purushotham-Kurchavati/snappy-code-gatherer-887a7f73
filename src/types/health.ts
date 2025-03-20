
export interface PatientInfo {
  name: string;
  age: number | null;
  gender: string;
}

export interface HealthMetrics {
  "Blood Glucose": string;
  "Total Cholesterol": string;
  "Blood Pressure": string;
  "HDL Cholesterol": string;
  "LDL Cholesterol": string;
  "Triglycerides": string;
  "HbA1c": string;
  [key: string]: string;
}

export interface HealthData {
  patient_info: PatientInfo;
  metrics: HealthMetrics;
}
