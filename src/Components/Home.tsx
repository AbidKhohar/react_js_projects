import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-12">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-sky-600">
            Welcome to KloudExel
          </h1>
         
        </div>

       

        {/* CTA Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/create')}
            className="px-8 py-4 text-lg font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg"
          >
            Go to Create Page →
          </button>
        </div>

       
      </div>
    </div>
  );
};

export default Home;