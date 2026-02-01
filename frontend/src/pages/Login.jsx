import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../compenents/Navbar";
import { useCoursesStore } from "../compenents/stores/useCoursesStore";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { loggedStudent } = useCoursesStore()
    const [error, setError] = useState({ errorMessage: "", id: 0 });

    const isEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    function validateForm() {
        if (!formData.email || !formData.password) {
            setError({
                errorMessage: "Please enter both email and password.",
                id: 1
            });
            return false;
        }

        if (!isEmail(formData.email)) {
            setError({ errorMessage: "Please! Write a valid email", id: 2 });
            return false;
        }

        if (formData.password.length < 8) {
            setError({ errorMessage: "Password must be at least 8 characters long", id: 3 });
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Login submitted", formData);

            // Handle Admin Login explicitly (still hardcoded for now as per previous logic, or move to backend?)
            // The previous logic had a hardcoded check. Let's keep it for safety if backend doesn't handle "admin" role yet
            if (formData.email === "admin@gmail.com" && formData.password === "admin123") {
                setTimeout(() => {
                    navigate("/AdminDashboard");
                }, 1000);
                return;
            }

            const result = await loggedStudent(formData);

            if (result.success) {
                setTimeout(() => {
                    navigate("/StudentDashboard");
                }, 1000);
            } else {
                setError({ errorMessage: result.message || "Login failed", id: 1 });
            }
        }
    };

    return (
        <>
            <Navbar number={4} />
            <form onSubmit={handleSubmit} className="formContainer">
                <p className="text-lg self-center font-medium my-15">Log in to your account</p>
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
                    className="inputBox"
                />
                {error.id === 3 && (
                    <p className="error">{error.errorMessage}</p>
                )}

                {error.id === 1 && (
                    <p className="error">{error.errorMessage}</p>
                )}

                <button type="submit" className="buttonBlue mt-10 md:mt-20">
                    Log In
                </button>
                <p className="text-sm text-neutral-400 text-center mt-5">
                    Don't have an account? <Link to="/Registration"><span className="text-primary">Sign up</span></Link>
                </p>
            </form>
        </>
    );
}