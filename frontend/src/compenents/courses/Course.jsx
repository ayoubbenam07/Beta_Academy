import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Lesson from "./Lesson";
import { useCoursesStore } from "../stores/useCoursesStore";

export default function Course() {
    const location = useLocation();
    const { fetchCourseById, student, fetchEnrollment } = useCoursesStore();
    const [courseData, setCourseData] = useState(location.state);
    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                let currentCourse = courseData;

                // 1. Fetch full course details if needed
                if (!currentCourse || (currentCourse.id && (!currentCourse.lessons || currentCourse.lessons.length === 0))) {
                    const id = currentCourse?.id || location.state?.id;
                    if (id) {
                        currentCourse = await fetchCourseById(id);
                        setCourseData(currentCourse);
                    }
                }

                // 2. Fetch enrollment if student logged in
                const studentId = student?._id || JSON.parse(localStorage.getItem('student'))?._id;
                if (studentId && currentCourse?.id) {
                    const enrollmentData = await fetchEnrollment(studentId, currentCourse.id);
                    setEnrollment(enrollmentData);
                }

                setLoading(false);
            } catch (err) {
                console.error('Error loading course/enrollment data:', err);
                setError("Failed to load course details");
                setLoading(false);
            }
        };

        loadData();
    }, [location.state, fetchCourseById, student, fetchEnrollment]);

    if (loading) {
        return (
            <>
                <Navbar number={2} />
                <div className="courseContainer">
                    <p className="text-center">Loading course...</p>
                </div>
            </>
        );
    }

    if (error || !courseData) {
        return (
            <>
                <Navbar number={2} />
                <div className="courseContainer">
                    <p className="text-center text-red-500">Error: {error || "Course not found"}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar number={2} />
            <div className="courseContainer">
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-medium">{courseData.name}</p>
                    <p className="text-sm text-neutral-400 mb-2">{courseData.description}</p>
                </div>
                <div className="w-full h-[20vh] bg-primary rounded-2xl flex items-center justify-center text-center text-white font-bold text-xl">
                    {courseData.name}
                </div>
                <div>
                    <p className="text-md font-medium">Course Overview</p>
                    <p className="text-sm">{courseData.overview}</p>
                </div>
                <div>
                    <p className="text-md font-medium">Instructor</p>
                    <div className="flex md:flex-row flex-col items-center justify-center gap-5 md:gap-10 p-5">
                        <div><img src={courseData.expertProfile.image} alt="" className="w-16 md:w-24" /></div>
                        <div className="flex flex-col md:items-start items-center">
                            <p className="font-bold text-md">{courseData.expertProfile.name}</p>
                            <p className="text-sm">{courseData.expertProfile.title}</p>
                            <p className="text-sm md:text-start text-center">{courseData.expertProfile.description}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 mb-10">
                    <p className="text-md font-medium">Lessons</p>
                    <div className="flex flex-col md:gap-8 gap-4">
                        {courseData.lessons && courseData.lessons.length > 0 ? (
                            courseData.lessons.map((lesson) => (
                                <Lesson
                                    lessonData={lesson}
                                    key={lesson.id}
                                    enrollmentId={enrollment?._id}
                                />
                            ))
                        ) : (
                            <p className="text-neutral-400">No lessons available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}