import React, { useEffect, useState } from "react";
import { getInsurances, deleteInsurance } from "../api/insuranceApi";
import { toast } from "sonner";

const InsuranceTable = ({ onEdit, refreshKey }) => {
  const [insurances, setInsurances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const fetchInsurances = async () => {
    setLoading(true);
    try {
      const { data } = await getInsurances();
      setInsurances(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load insurances");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsurances();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this insurance?")) return;

    setDeleting(id);
    try {
      await deleteInsurance(id);
      setInsurances(insurances.filter((ins) => ins.id !== id));
      toast.success("Insurance deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete insurance");
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  if (loading)
    return <div className="text-center py-4 text-gray-500">Loading insurances...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Insurances</h2>
        <button
          onClick={fetchInsurances}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Refresh
        </button>
      </div>

      {insurances.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No insurances found. Add one to get started!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Insurance Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {insurances.map((insurance) => (
                <tr key={insurance.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-700">{insurance.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {insurance.insuranceName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{insurance.insuranceType}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${parseFloat(insurance.amount).toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => onEdit(insurance)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(insurance.id)}
                      disabled={deleting === insurance.id}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
                    >
                      {deleting === insurance.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InsuranceTable;
