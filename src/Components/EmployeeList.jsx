import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/employeeApi";

const EmployeeList = ({ onEdit, refreshKey }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load employees");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    
    setDeleting(id);
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(emp => emp.id !== id));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete employee");
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div className="text-center py-4 text-gray-500">Loading employees...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
        <button
          onClick={fetchEmployees}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {employees.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No employees found. Add one to get started!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Designation</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Salary</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-700">{emp.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{emp.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{emp.designation}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${parseFloat(emp.salary).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2 flex">
                    <button
                      onClick={() => onEdit(emp)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
                      disabled={deleting === emp.id}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
                      disabled={deleting === emp.id}
                    >
                      {deleting === emp.id ? "Deleting..." : "Delete"}
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

export default EmployeeList;
