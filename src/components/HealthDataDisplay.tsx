
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HealthData } from "@/types/health";

interface HealthDataDisplayProps {
  data: HealthData;
}

const HealthDataDisplay = ({ data }: HealthDataDisplayProps) => {
  const { patient_info, metrics } = data;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg font-semibold">{patient_info.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p className="text-lg font-semibold">{patient_info.age || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="text-lg font-semibold">{patient_info.gender || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="border p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-gray-500">{key}</p>
                <p className={`text-lg font-semibold ${value === "N/A" ? "text-gray-400" : ""}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDataDisplay;
