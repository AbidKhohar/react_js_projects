import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEmployeeSaved = () => {
    setSelectedEmployee(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEditEmployee = (emp) => {
    setSelectedEmployee(emp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to KloudExel
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Manage your employees efficiently with our modern CRUD application
          </p>
          <button
            onClick={() => navigate('/create')}
            className="px-8 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Go to Create Page →
          </button>
        </div>

        {/* Employee CRUD Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <EmployeeForm 
              selected={selectedEmployee} 
              onSaved={handleEmployeeSaved} 
            />
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <EmployeeList 
              key={refreshKey} 
              onEdit={handleEditEmployee}
              refreshKey={refreshKey}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;