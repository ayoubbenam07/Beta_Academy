import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ number = 1 }) {
    // {number} identifies which page is active (1–4)
    const [isSmall, setIsSmall] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsSmall(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="flex justify-between items-center px-5 md:px-20 py-2 md:py-3 border-b border-neutral-300 relative">
            <Link to="/">
                <img src="public/icons/logo.svg" alt="logo" className="w-20 md:w-24" />
            </Link>

            {/* MOBILE VIEW (below md) */}
            {number === 1 && isSmall ? (
                <div>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <img
                            src="icons/hamburger.svg"
                            alt="menu"
                            className={`w-10 cursor-pointer transition-transform ${isMenuOpen ? "rotate-90" : ""
                                }`}
                        />
                    </button>

                    {isMenuOpen && (
                        <div className="flex flex-col gap-6 items-center bg-white shadow-lg rounded-lg p-6 absolute top-20 right-4 z-50">
                            <Link to="/">
                                <p className="text-md cursor-pointer font-medium">Home</p>
                            </Link>
                            <Link to="/Courses">
                                <p className="text-md cursor-pointer font-medium">Courses</p>
                            </Link>
                            <div className="flex gap-4">
                                <Link to="/Registration">
                                    <button className="buttonBlue">Get Started</button>
                                </Link>
                                <Link to="/Login">
                                    <button className="buttonGrey">Log In</button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // DESKTOP VIEW (md and above)
                <div className="flex gap-10 items-center">
                    <Link to="/">
                        <p
                            className={`${number > 2 ? "hidden" : "text-md font-medium textHover"
                                }`}
                        >
                            Home
                        </p>
                    </Link>
                    {
                        number <= 2 && 
                        <Link to="/Courses">
                        <p
                            className="text-md font-medium textHover"
                        >
                            Courses
                        </p>
                        </Link>
                    }
                    

                    <div className="flex gap-6 items-center">
                        {!(number === 3 || number === 2) &&
                        <Link to="/Registration">
                            <button
                                className={
                                    "buttonBlue"
                                }
                            >
                                Get Started
                            </button>
                        </Link>
                        }
                        {
                        ! (number === 2 || number === 4) &&
                        <Link to="/Login">
                            <button
                                className={
                                            number === 3
                                            ? "buttonBlue"
                                            : "buttonGrey"
                                }
                            >
                                Log In
                            </button>
                        </Link>
                        }
                        {number === 2 && (
                            <>
                            <Link to="/StudentDashboard">
                                <div className="cursor-pointer flex justify-center items-center">
                                    <img src="icons/studentLogo.svg" alt="" className="w-10 md:w-12" />
                                </div>
                            </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
