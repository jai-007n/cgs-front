// eslint-disable-next-line no-unused-vars
import * as React from 'react';

export function LoadingIndicator() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-300 opacity-90">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white font-medium">Loading...</p>
        </div>
    );
}