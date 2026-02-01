import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useCoursesStore } from "../stores/useCoursesStore";
export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const course = location.state;
    const { payCourse } = useCoursesStore();
    const [error, setError] = useState({ errorMessage: "", id: 0 });

    const [formData, setFormData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        nameOnCard: "",
    });

    // Redirect if no course data
    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-neutral-500 mb-4">No course selected</p>
                <button
                    onClick={() => navigate("/courses")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    Back to Courses
                </button>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Format card number with spaces
        if (name === "cardNumber") {
            formattedValue = value
                .replace(/\s/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim()
                .slice(0, 19);
        }

        // Format expiry date as MM/YY
        if (name === "expiryDate") {
            formattedValue = value
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "$1/$2")
                .slice(0, 5);
        }

        // Limit CVV to 3-4 digits
        if (name === "cvv") {
            formattedValue = value.replace(/\D/g, "").slice(0, 4);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: formattedValue,
        }));

        // Clear error when user starts typing
        if (error.id !== 0) {
            setError({ errorMessage: "", id: 0 });
        }
    };

    const validateForm = () => {
        // Validate card number (16 digits)
        const cardNumberClean = formData.cardNumber.replace(/\s/g, "");
        if (!cardNumberClean || cardNumberClean.length !== 16) {
            setError({
                errorMessage: "Please enter a valid 16-digit card number",
                id: 2,
            });
            return false;
        }

        // Validate expiry date
        if (!formData.expiryDate || formData.expiryDate.length !== 5) {
            setError({
                errorMessage: "Please enter expiry date in MM/YY format",
                id: 3,
            });
            return false;
        }

        const [month, year] = formData.expiryDate.split("/");
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        if (
            parseInt(month) < 1 ||
            parseInt(month) > 12 ||
            parseInt(year) < currentYear ||
            (parseInt(year) === currentYear && parseInt(month) < currentMonth)
        ) {
            setError({
                errorMessage: "Please enter a valid expiry date",
                id: 3,
            });
            return false;
        }

        if (!formData.cvv || formData.cvv.length < 3) {
            setError({
                errorMessage: "Please enter a valid CVV (3-4 digits)",
                id: 4,
            });
            return false;
        }

        if (!formData.nameOnCard || formData.nameOnCard.trim().length < 3) {
            setError({
                errorMessage: "Please enter the name as it appears on your card",
                id: 5,
            });
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            payCourse(course.id)
            
            setError({
                errorMessage: "Payment processed successfully!",
                id: 1,
            });

            setTimeout(() => {
                navigate("/StudentDashboard");
            }, 2000);
        }
    };

    return (
        <>
            <Navbar number={2}/>
            <form onSubmit={handleSubmit} className="formContainer">
                <h2 className="text-lg font-semibold text-center mb-2">Payment</h2>
                
                <div className="bg-white rounded-xl p-4 shadow-md mb-6 border-2 border-neutral-300">
                    <p className="text-lg font-semibold mb-3">Order Summary</p>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-neutral-400 text-md">Course</p>
                            <p className="text-sm font-medium">{course.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-neutral-400 text-md">Price</p>
                            <p className="text-md font-bold text-primary">{course.price}</p>
                        </div>
                    </div>
                    <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-md">Total</p>
                            <p className="text-lg font-bold text-primary">{course.price}</p>
                        </div>
                    </div>
                </div>

                <label htmlFor="cardNumber" className="label block font-medium mb-2">
                    Card Number
                </label>
                <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className="inputBox w-full px-4 py-2 border rounded-lg mb-2"
                />
                {error.id === 2 && <p className="error text-red-500 text-sm mb-4">{error.errorMessage}</p>}

                <label htmlFor="expiryDate" className="label block font-medium mb-2 mt-4">
                    Expiry Date
                </label>
                <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="inputBox w-full px-4 py-2 border rounded-lg mb-2"
                />
                {error.id === 3 && <p className="error text-red-500 text-sm mb-4">{error.errorMessage}</p>}

                <label htmlFor="cvv" className="label block font-medium mb-2 mt-4">
                    CVV
                </label>
                <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="inputBox w-full px-4 py-2 border rounded-lg mb-2"
                />
                {error.id === 4 && <p className="error text-red-500 text-sm mb-4">{error.errorMessage}</p>}

                <label htmlFor="nameOnCard" className="label block font-medium mb-2 mt-4">
                    Name on Card
                </label>
                <input
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="inputBox w-full px-4 py-2 border rounded-lg mb-2"
                />
                {error.id === 5 && <p className="error text-red-500 text-sm mb-4">{error.errorMessage}</p>}

                {error.id === 1 && (
                    <p className="text-green-500 text-sm text-center my-4 font-semibold">{error.errorMessage}</p>
                )}

                <button
                    type="submit"
                    className="buttonBlue w-full bg-blue-600 text-white py-3 rounded-lg font-medium mt-6 hover:bg-blue-700 transition"
                >
                    Complete Payment - {course.price}
                </button>

                <p className="text-sm text-neutral-400 text-center mt-6">
                    Your payment information is secure and encrypted
                </p>
            </form>
        </>
    );
}