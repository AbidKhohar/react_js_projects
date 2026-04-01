import React, { useState } from "react";
import DepartmentForm from "./DepartmentForm";
import DepartmentList from "./DepartmentList";

const Departments = () => {
  const [selected, setSelected] = useState(null);
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Human Resources",
      description: "Manages employee recruitment, training, and benefits",
    },
    {
      id: 2,
      name: "Information Technology",
      description: "Handles IT infrastructure and software development",
    },
    {
      id: 3,
      name: "Finance",
      description: "Manages budgeting, accounting, and financial planning",
    },
  ]);

  const handleSaved = (data, selectedId) => {
    if (selectedId) {
      setDepartments(
        departments.map((dept) =>
          dept.id === selectedId ? { ...dept, ...data } : dept
        )
      );
    } else {
      const newDept = {
        id: Math.max(...departments.map((d) => d.id), 0) + 1,
        ...data,
      };
      setDepartments([...departments, newDept]);
    }
    setSelected(null);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
    setSelected(null);
  };

  const handleSelect = (department) => {
    setSelected(department);
  };

  const handleClear = () => {
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Department Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <DepartmentForm selected={selected} onSaved={handleSaved} />
            {selected && (
              <button
                onClick={handleClear}
                className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                ✕ Clear Selection
              </button>
            )}
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <DepartmentList
              departments={departments}
              onSelect={handleSelect}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
