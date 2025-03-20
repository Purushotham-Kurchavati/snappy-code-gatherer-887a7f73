
import { HealthData, PatientInfo, HealthMetrics } from "@/types/health";

// This function simulates the PDF.js library functionality
// In a real implementation, you would use the PDF.js library to extract text from PDFs
export const extractTextFromPDF = async (file: File): Promise<string> => {
  // In a real implementation with PDF.js, you would do something like:
  /*
  const pdfJS = await import('pdfjs-dist/build/pdf');
  const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
  
  pdfJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  
  const fileData = await file.arrayBuffer();
  const pdf = await pdfJS.getDocument(fileData).promise;
  
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(' ');
    text += pageText + '\n';
  }
  
  return text;
  */
  
  // For now, we'll return a dummy text that matches our extraction patterns
  // This simulates the text content of a PDF health report
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        Patient Health Report
        
        Name: John Doe
        Age: 45
        Gender: Male
        
        Test Results:
        
        Blood Glucose: 105 mg/dL
        Total Cholesterol: 180 mg/dL
        Blood Pressure: 120/80 mmHg
        HDL Cholesterol: 50 mg/dL
        LDL Cholesterol: 100 mg/dL
        Triglycerides: 150 mg/dL
        HbA1c: 5.7%
      `);
    }, 1000);
  });
};

export const parseReportToJson = (text: string): HealthData => {
  const data: HealthData = {
    patient_info: {
      name: "",
      age: null,
      gender: "",
    },
    metrics: {
      "Blood Glucose": "N/A",
      "Total Cholesterol": "N/A",
      "Blood Pressure": "N/A",
      "HDL Cholesterol": "N/A",
      "LDL Cholesterol": "N/A",
      "Triglycerides": "N/A",
      "HbA1c": "N/A",
    },
  };

  // Extract patient info
  const patientInfoMatch = text.match(/Name:\s*(.+)\n.?Age:\s(\d+)\n.?Gender:\s(\w+)/);
  if (patientInfoMatch) {
    data.patient_info.name = patientInfoMatch[1].trim();
    data.patient_info.age = parseInt(patientInfoMatch[2]);
    data.patient_info.gender = patientInfoMatch[3].trim();
  }

  // Extract metrics (using regex for each value)
  const metrics: Record<string, RegExp> = {
    "Blood Glucose": /Blood Glucose\s*:\s*(\d+ mg\/dL)/,
    "Total Cholesterol": /Total Cholesterol\s*:\s*(\d+ mg\/dL)/,
    "Blood Pressure": /Blood Pressure\s*:\s*([\d/]+ mmHg)/,
    "HDL Cholesterol": /HDL Cholesterol\s*:\s*(\d+ mg\/dL)/,
    "LDL Cholesterol": /LDL Cholesterol\s*:\s*(\d+ mg\/dL)/,
    "Triglycerides": /Triglycerides\s*:\s*(\d+ mg\/dL)/,
    "HbA1c": /HbA1c\s*:\s*([\d.]+%)/,
  };

  for (const [key, pattern] of Object.entries(metrics)) {
    const match = text.match(pattern);
    if (match) {
      data.metrics[key] = match[1];
    }
  }

  return data;
};

export const extractDataFromPDF = async (file: File): Promise<HealthData> => {
  try {
    const text = await extractTextFromPDF(file);
    const data = parseReportToJson(text);
    return data;
  } catch (error) {
    console.error("Error extracting data from PDF:", error);
    throw new Error("Failed to extract data from PDF");
  }
};
