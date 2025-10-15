import React, { useState } from 'react';

// Main functional component
const App = () => {
    // --- State Management for Form Data ---
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        mobile: '',
        address: '',
    });

    // --- State Management for Errors ---
    const [errors, setErrors] = useState({});
    const [submissionMessage, setSubmissionMessage] = useState({ text: '', type: '' });

    // Handles input changes and updates the corresponding state
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
        
        // Clear error as the user types (optional, but good UX)
        if (errors[id]) {
            setErrors(prevErrors => ({ ...prevErrors, [id]: '' }));
        }
    };

    // --- Validation Logic ---
    const validate = () => {
        let newErrors = {};
        let isValid = true;
        const { firstName, lastName, password, email, mobile, address } = formData;

        // 1. First Name Validation (Alphabets only, length >= 6)
        const nameRegex = /^[A-Za-z]+$/;
        if (firstName.length < 6) {
            newErrors.firstName = 'Name must be at least 6 characters long.';
            isValid = false;
        } else if (!nameRegex.test(firstName)) {
            newErrors.firstName = 'Name must contain only alphabetic characters.';
            isValid = false;
        }

        // 2. Last Name Validation (Required/Not Empty)
        if (!lastName.trim()) {
            newErrors.lastName = 'Last Name is required and cannot be empty.';
            isValid = false;
        }

        // 3. Password Validation (Length >= 6)
        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
            isValid = false;
        }

        // 4. E-mail ID Validation (Standard pattern)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address (e.g., name@domain.com).';
            isValid = false;
        }

        // 5. Mobile Number Validation (Exactly 10 digits)
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            newErrors.mobile = 'Mobile number must contain exactly 10 digits.';
            isValid = false;
        }

        // 6. Address Validation (Required/Not Empty)
        if (!address.trim()) {
            newErrors.address = 'Address is required and cannot be empty.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // --- Submission Handler ---
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmissionMessage({ text: '', type: '' }); // Clear previous message

        if (validate()) {
            // Form is valid!
            setSubmissionMessage({
                text: 'Registration successful! Welcome!',
                type: 'success'
            });
            // In a real app, you'd send data to the server here.
            // setFormData({ firstName: '', lastName: '', password: '', email: '', mobile: '', address: '' });
        } else {
            // Form is invalid!
            setSubmissionMessage({
                text: 'Please review and correct the errors below.',
                type: 'error'
            });
        }
    };

    // Helper component for input fields
    const FormField = ({ id, label, type = 'text', placeholder, rows, value, error }) => {
        // Enhanced styling for dark mode inputs
        const inputClasses = `w-full p-3.5 border rounded-lg text-gray-200 bg-gray-700 placeholder-gray-400 transition duration-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 ${
            error ? 'border-red-500' : 'border-gray-600'
        }`;

        return (
            <div>
                <label htmlFor={id} className="block text-base font-semibold text-gray-100 mb-1">
                    {label}
                </label>
                {rows ? (
                    <textarea
                        id={id}
                        name={id}
                        rows={rows}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        className={`${inputClasses} resize-none`}
                    />
                ) : (
                    <input
                        type={type}
                        id={id}
                        name={id}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        className={inputClasses}
                        {...(id === 'mobile' && { maxLength: 10 })}
                    />
                )}
                <p className="text-red-400 text-xs mt-1 h-4 font-medium">{error}</p>
            </div>
        );
    };

    // Dynamic classes for the submission message box
    const getSubmissionMessageClasses = () => {
        if (!submissionMessage.text) return 'hidden';
        
        let classes = 'p-4 rounded-xl text-center font-bold border-l-4';
        if (submissionMessage.type === 'success') {
            classes += ' bg-green-900/50 text-green-300 border-green-500';
        } else if (submissionMessage.type === 'error') {
            classes += ' bg-red-900/50 text-red-300 border-red-500';
        }
        return classes;
    };


    return (
        // Dark background and removed gradient
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
            {/* Dark Card with less shadow for a modern look */}
            <div className="w-full max-w-xl bg-gray-800 p-10 rounded-2xl shadow-xl transition duration-500 border border-gray-700">
                <h2 className="text-4xl font-extrabold text-white mb-8 text-left tracking-tight">
                    Create Your Account
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Field: First Name */}
                    <FormField
                        id="firstName"
                        label="First Name"
                        placeholder="e.g., Alice (Min 6 letters)"
                        value={formData.firstName}
                        error={errors.firstName}
                    />

                    {/* Field: Last Name */}
                    <FormField
                        id="lastName"
                        label="Last Name"
                        placeholder="e.g., Johnson"
                        value={formData.lastName}
                        error={errors.lastName}
                    />

                    {/* Field: E-mail ID */}
                    <FormField
                        id="email"
                        label="E-mail Address"
                        placeholder="e.g., name@domain.com"
                        type="email"
                        value={formData.email}
                        error={errors.email}
                    />

                    {/* Field: Password */}
                    <FormField
                        id="password"
                        label="Password"
                        placeholder="Minimum 6 characters"
                        type="password"
                        value={formData.password}
                        error={errors.password}
                    />

                    {/* Field: Mobile Number */}
                    <FormField
                        id="mobile"
                        label="Mobile Number"
                        placeholder="10 digits exactly"
                        type="text"
                        value={formData.mobile}
                        error={errors.mobile}
                    />

                    {/* Field: Address */}
                    <FormField
                        id="address"
                        label="Shipping Address"
                        placeholder="Street, City, Zip Code"
                        rows={3}
                        value={formData.address}
                        error={errors.address}
                    />

                    {/* Submission Message Box */}
                    <div className={getSubmissionMessageClasses()} role="alert">
                        {submissionMessage.text}
                    </div>

                    {/* Submit Button - Teal Accent for Dark Mode */}
                    <button type="submit"
                        className="w-full py-3.5 px-4 bg-teal-500 hover:bg-teal-600 text-gray-900 font-extrabold text-lg rounded-lg transition duration-300 shadow-lg shadow-teal-500/30 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-400/50">
                        Securely Register
                    </button>

                    <p className="text-center text-sm text-gray-400 pt-2">
                        By registering, you agree to our terms of service.
                    </p>

                </form>
            </div>
        </div>
    );
};

export default App;
