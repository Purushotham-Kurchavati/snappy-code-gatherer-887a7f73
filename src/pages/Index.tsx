
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import PDFUploader from "@/components/PDFUploader";
import HealthDataDisplay from "@/components/HealthDataDisplay";
import { HealthData } from "@/types/health";

const Index = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const { toast } = useToast();

  const handleProcessedData = (data: HealthData) => {
    setHealthData(data);
    toast({
      title: "PDF Processed Successfully",
      description: "Your health report has been analyzed.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Health Report Analyzer</h1>
        <p className="text-xl text-gray-600">Upload your health report PDF for analysis</p>
      </div>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Report</TabsTrigger>
          <TabsTrigger value="results" disabled={!healthData}>Analysis Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Health Report</CardTitle>
              <CardDescription>
                Upload your PDF health report to extract and analyze your health metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertTitle>Privacy Notice</AlertTitle>
                <AlertDescription>
                  Your PDF is processed entirely in your browser. No data is sent to our servers.
                </AlertDescription>
              </Alert>
              <PDFUploader onProcessedData={handleProcessedData} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Health Analysis Results</CardTitle>
              <CardDescription>
                View the extracted health data from your report
              </CardDescription>
            </CardHeader>
            <CardContent>
              {healthData && <HealthDataDisplay data={healthData} />}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
