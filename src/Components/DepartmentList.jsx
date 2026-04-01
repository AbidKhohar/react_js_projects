import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const DepartmentList = ({ departments = [], onSelect, onDelete }) => {
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this department?")) {
      if (onDelete) onDelete(id);
      toast.success("Department deleted successfully!");
    }
  };

  if (departments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No departments found. Create one to get started!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, index) => (
            <tr
              key={dept.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b border-gray-200 hover:bg-blue-50 transition`}
            >
              <td className="px-6 py-4 text-gray-800 font-medium">{dept.name}</td>
              <td className="px-6 py-4 text-gray-600">{dept.description}</td>
              <td className="px-6 py-4 text-center space-x-2">
                <button
                  onClick={() => onSelect(dept)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
