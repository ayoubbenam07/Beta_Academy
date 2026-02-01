import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Card from "../Card";
import Analytics from "./Analytics"
import { useCoursesStore } from "../stores/useCoursesStore";

export default function StudentDashboard() {
    const { courses, student, logoutStub } = useCoursesStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutStub();
        navigate('/Login');
    };

    return (
        <>
            <Navbar number={2} />
            <div className="flex flex-col gap-10 md:w-9/10 w-full max-w-[1400px] mx-auto pt-12 pb-16 px-6 bg-white rounded-4xl shadow-lg border-2 border-neutral-300 mt-20">
                <div className="flex justify-end">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                    >
                        Logout
                    </button>
                </div>

                {/* PERSONAL INFORMATION SECTION */}
                <section>
                    <p className="text-lg font-bold mb-4">Account Information</p>
                    <div className="grid md:grid-cols-2 gap-2">
                        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                            <p className="text-sm text-neutral-500 mb-1">First Name</p>
                            <p className="text-md font-medium">{student.firstName}</p>
                        </div>

                        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                            <p className="text-sm text-neutral-500 mb-1">Last Name</p>
                            <p className="text-md font-medium">{student.lastName}</p>
                        </div>

                        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                            <p className="text-sm text-neutral-500 mb-1">Email</p>
                            <p className="text-md font-medium">{student.email}</p>
                        </div>

                        {student.phoneNumber && (
                            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                                <p className="text-sm text-neutral-500 mb-1">Phone</p>
                                <p className="text-md font-medium">{student.phoneNumber}</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* REGISTERED COURSES SECTION */}
                <section>
                    <p className="text-lg font-bold mb-4">My Courses</p>
                    <div className="flex flex-col md:flex-row flex-wrap gap-6 items-center">
                        {courses.some((c) => c.isRegisterd) ? (
                            courses.map(
                                (course, index) =>
                                    course.isRegisterd && <Card course={course} key={index} />
                            )
                        ) : (
                            <p className="text-gray-500 text-lg mt-4">You are not enrolled in any courses yet.</p>
                        )}
                    </div>
                </section>

                {/* REGISTERED COURSES SECTION */}
                <section>
                    <p className="text-lg font-bold mb-4">My Courses Analytics</p>
                    <div className="flex flex-col md:flex-row flex-wrap gap-6 items-center">
                        {courses.some((c) => c.isRegisterd) ? (
                            courses.map(
                                (course, index) =>
                                    course.isRegisterd && <Analytics course={course} id={index} key={index} />
                            )
                        ) : (
                            <p className="text-gray-500 text-lg mt-4">You are not enrolled in any courses yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
