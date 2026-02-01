import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../compenents/Navbar";
import { useCoursesStore } from "../compenents/stores/useCoursesStore";
import { Check, X } from "lucide-react";

export default function Registration() {
    const navigate = useNavigate();
    const { registerStudent } = useCoursesStore()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        phoneNumber: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState({ errorMessage: "", id: 0 });

    // Password Strength State
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false
    });
    const [strengthScore, setStrengthScore] = useState(0);

    const isEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPhoneNumber = (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        const phoneRegex = /^(0[567]\d{8}|[567]\d{8})$/;
        return phoneRegex.test(cleaned);
    };

    const checkPasswordStrength = (password) => {
        const criteria = {
            length: password.length >= 6,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        setPasswordCriteria(criteria);

        // Calculate score (0-4 for visual representation)
        // We have 5 criteria, but usually strength meters map to 4 segments
        // Let's count true criteria
        const metCount = Object.values(criteria).filter(Boolean).length;
        setStrengthScore(metCount);
    };

    function validateForm() {
        if (!formData.firstName
            || !formData.lastName
            || !formData.birthDate
            || !formData.phoneNumber
            || !formData.email
            || !formData.password
        ) {
            setError({
                errorMessage: "It looks like you didn't complete all the required fields. Please make sure to enter all required fields.",
                id: 1
            });
            return false;
        }

        if (!isEmail(formData.email)) {
            setError({ errorMessage: "Please! Write a valid email", id: 2 });
            return false;
        }

        if (!isPhoneNumber(formData.phoneNumber)) {
            setError({ errorMessage: "Please! Write a valid phone number", id: 3 });
            return false;
        }

        if (strengthScore < 5) {
            setError({ errorMessage: "Password is too weak", id: 4 });
            return false;
        }

        setError({ errorMessage: "", id: 0 });
        return true;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === "password") {
            checkPasswordStrength(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted", formData);

            const result = await registerStudent(formData);

            if (result.success) {
                setTimeout(() => {
                    navigate("/StudentDashboard");
                }, 1000);
            } else {
                // Map specific errors if possible, or generic
                // Assuming result.message might be "User already exists"
                if (result.message && result.message.includes("exists")) {
                    setError({ errorMessage: result.message, id: 2 }); // id 2 is email error
                } else {
                    setError({ errorMessage: result.message || "Registration failed", id: 1 });
                }
            }
        }

    };

    // Helper for strength bars
    const getStrengthColor = (index) => {
        // 5 criteria total. 
        // Let's map score 0-5 to bars.
        // If score > index, bar is colored.
        // criteria: 5 items. 
        // 1 bar active if score >= 1? 
        // The image shows 4 bars.
        // Let's map:
        // Score 1-2: Red/Weak
        // Score 3: Yellow/Medium
        // Score 4: Green/Strong
        // Score 5: Very Green/Strongest

        // Actually simplest is: 4 bars.
        // Bar 1 active if score >= 1
        // Bar 2 active if score >= 3
        // Bar 3 active if score >= 4
        // Bar 4 active if score >= 5

        if (strengthScore === 0) return "bg-gray-600";

        if (index === 0) return strengthScore >= 1 ? "bg-red-500" : "bg-gray-600";
        if (index === 1) return strengthScore >= 2 ? "bg-orange-500" : "bg-gray-600";
        if (index === 2) return strengthScore >= 4 ? "bg-yellow-500" : "bg-gray-600";
        if (index === 3) return strengthScore >= 5 ? "bg-green-500" : "bg-gray-600";

        // Let's try a simpler accumulative color like in the image (all green potentially?)
        // The image shows green checkmarks and green bars.
        // Let's stick to green for active bars for now to match the vibe, or progressive colors.
        // Let's use a solid green for all active bars for the 'clean' look in the image.

        const activeColor = "bg-green-500";
        const inactiveColor = "bg-gray-600";

        // 5 criteria. 4 bars.
        // 1-2 criteria met -> 1 bar
        // 3 criteria met -> 2 bars
        // 4 criteria met -> 3 bars
        // 5 criteria met -> 4 bars

        let barsActive = 0;
        if (strengthScore >= 1) barsActive = 1;
        if (strengthScore >= 3) barsActive = 2;
        if (strengthScore >= 4) barsActive = 3;
        if (strengthScore >= 5) barsActive = 4;

        return index < barsActive ? activeColor : inactiveColor;
    };

    return (
        <>
            <Navbar number={3} />
            <form onSubmit={handleSubmit} className="formContainer">
                <p className="text-lg self-center font-medium my-10">Create Your Account</p>
                <label htmlFor="firstName" className="label">First name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="inputBox"
                />

                <label htmlFor="lastName" className="label">Last name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="inputBox"
                />

                <label htmlFor="birthDate" className="label">Birthdate</label>
                <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="border-2 border-neutral-300 rounded-xl py-3 text-md w-full mb-2"
                />

                <label htmlFor="phoneNumber" className="label">Phone number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="inputBox"
                />
                {error.id === 3 && (
                    <p className="error">{error.errorMessage}</p>
                )}

                <label htmlFor="email" className="label">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="inputBox"
                />
                {error.id === 2 && (
                    <p className="error">{error.errorMessage}</p>
                )}

                <label htmlFor="password" className="label">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your Password"
                    className="inputBox mb-2"
                />

                {/* Password Strength Meter */}
                <div className="w-full mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">Password strength</span>
                        <span className="text-xs text-gray-500">Strong</span>
                    </div>
                    <div className="flex gap-1 h-1">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className={`h-full w-1/4 rounded-full transition-colors duration-300 ${getStrengthColor(i)}`}></div>
                        ))}
                    </div>
                </div>

                {/* Password Criteria Checklist */}
                <div className="space-y-1 mb-6">
                    <div className="flex items-center gap-2">
                        {passwordCriteria.length ? <Check className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4" />} {/* Using Check icon or empty space/gray check */}
                        <span className={`text-sm ${passwordCriteria.length ? "text-green-500" : "text-gray-500"}`}>At least 6 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {passwordCriteria.upper ? <Check className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4" />}
                        <span className={`text-sm ${passwordCriteria.upper ? "text-green-500" : "text-gray-500"}`}>Contains uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {passwordCriteria.lower ? <Check className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4" />}
                        <span className={`text-sm ${passwordCriteria.lower ? "text-green-500" : "text-gray-500"}`}>Contains lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {passwordCriteria.number ? <Check className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4" />}
                        <span className={`text-sm ${passwordCriteria.number ? "text-green-500" : "text-gray-500"}`}>Contains a number</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {passwordCriteria.special ? <Check className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4" />}
                        <span className={`text-sm ${passwordCriteria.special ? "text-green-500" : "text-gray-500"}`}>Contains special character</span>
                    </div>
                </div>

                {error.id === 4 && (
                    <p className="error">{error.errorMessage}</p>
                )}

                {error.id === 1 && (
                    <p className="error">{error.errorMessage}</p>
                )}

                <button type="submit" className="buttonBlue mt-2">
                    Sign Up
                </button>
            </form>
        </>
    );
}
