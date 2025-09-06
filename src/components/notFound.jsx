import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Goes back to previous page
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            {/* 404 Logo */}
            <div className="mb-8 animate-bounce">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
                    <span className="text-6xl font-bold text-white">404</span>
                </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! Page not found</h1>
            <p className="text-gray-600 mb-8 text-center max-w-md">
                The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Go Back Button */}
            <button
                onClick={handleGoBack}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            >
                Go Back
            </button>

            {/* Optional: Home Link */}
            <a
                href="/"
                className="mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
                Return to Home
            </a>
        </div>
    );
};

export default NotFoundPage;