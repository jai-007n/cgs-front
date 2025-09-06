// src/components/RouteErrorBoundary.jsx
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

const RouteErrorBoundary = () => {
    const error = useRouteError();
    console.error("Route error:", error);

    let errorMessage = 'An unknown error occurred.';

    if (isRouteErrorResponse(error)) {
        errorMessage = error.status === 404
            ? 'Page not found'
            : error.statusText || errorMessage;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                        <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Route Error</h1>
                </div>

                <div className="p-6">
                    <p className="text-gray-600 mb-6">{errorMessage}</p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            Reload Page
                        </button>
                        <Link
                            to={"/"}
                            className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RouteErrorBoundary;