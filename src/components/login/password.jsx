import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import PoloLogo from '@/assets/polo-logo.jpg'

const ConfirmPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="min-h-[100dvh] bg-gradient-to-t from-red-300 to-blue-300">
            <div className="flex flex-col md:flex-row h-full w-full">
                {/* Left Side - Image */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center bg-black p-4">
                    <img
                        src={PoloLogo}
                        alt="Polo"
                        className="w-2/3 sm:w-1/2 md:w-3/4 lg:w-2/3 max-h-[200px] sm:max-h-[300px] md:max-h-[400px] object-contain"
                    />
                </div>

                {/* Right Side - Login Form */}
                <div className="flex-1 md:w-1/2 flex md:items-center md:justify-center p-6 pt-10 md:pt-0 min-h-[100dvh]">
                    <form className="w-full max-w-md space-y-6 bg-white p-8 rounded-md shadow-md">
                        {/* ACME Badge */}
                        <div className="flex justify-center">
                            <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold shadow-md">
                                ACME
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-center">Confirm Password</h2>

                        {/* Password Field */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400 pr-10"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
                        >
                            Confirm
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default ConfirmPassword;