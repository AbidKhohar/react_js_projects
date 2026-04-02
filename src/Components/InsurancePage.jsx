import React, { useState } from "react";
import InsuranceTable from "./InsuranceTable";
import InsuranceForm from "./InsuranceForm";

const InsurancePage = () => {
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (insurance) => {
    setSelectedInsurance(insurance);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaved = () => {
    setSelectedInsurance(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <InsuranceForm selected={selectedInsurance} onSaved={handleSaved} />
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2">
            <InsuranceTable onEdit={handleEdit} refreshKey={refreshKey} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePage;
