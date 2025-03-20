
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { extractDataFromPDF } from "@/utils/pdfParser";
import { HealthData } from "@/types/health";
import { Loader2 } from "lucide-react";

interface PDFUploaderProps {
  onProcessedData: (data: HealthData) => void;
}

const PDFUploader = ({ onProcessedData }: PDFUploaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setProgress(10);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 300);

      const data = await extractDataFromPDF(file);
      clearInterval(progressInterval);
      setProgress(100);
      
      onProcessedData(data);
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast({
        title: "Processing Error",
        description: "Failed to process the PDF file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isLoading}
          className="cursor-pointer"
        />
      </div>

      {isLoading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500 text-center">
            Processing PDF... {progress}%
          </p>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center">
          <Button disabled variant="outline">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
