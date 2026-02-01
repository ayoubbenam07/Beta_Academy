import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useCoursesStore } from "../stores/useCoursesStore";


export default function PreviewCourse(){
    const location = useLocation();
    const { fetchCourseById } = useCoursesStore();
    const [course, setCourse] = useState(location.state);
    const [loading, setLoading] = useState(!location.state);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // If course data exists in location.state, use it but fetch full details if lessons are missing
        if (location.state) {
            if (location.state.id && (!location.state.lessons || location.state.lessons.length === 0)) {
                // Fetch full course details including lessons
                fetchCourseById(location.state.id)
                    .then(data => {
                        setCourse(data);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error('Error fetching course details:', err);
                        // Use existing data if fetch fails
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        } else {
            setError("Course data not available");
            setLoading(false);
        }
    }, [location.state, fetchCourseById]);

    if (loading) {
        return (
            <>
                <Navbar/>
                <div className="courseContainer">
                    <p className="text-center">Loading course...</p>
                </div>
            </>
        );
    }

    if (error || !course) {
        return (
            <>
                <Navbar/>
                <div className="courseContainer">
                    <p className="text-center text-red-500">Error: {error || "Course not found"}</p>
                </div>
            </>
        );
    }

    return(
        <>
        <Navbar/>
        <div className="courseContainer">
            <div className="flex flex-col">
                <p className="text-lg font-medium">{course.name}</p>
                <p className="text-sm text-neutral-400 mb-2">{course.description}</p>
            </div>
            <div className="w-full h-[20vh] bg-primary rounded-2xl flex  text-center items-center justify-center text-white font-bold text-xl">
                {course.name}
            </div>
            <div>
                <p className="text-md font-medium">Course Overview</p>
                <p className="text-sm">{course.overview}</p>
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-md font-medium">Lessons</p>
                {course.lessons && course.lessons.length > 0 ? (
                    course.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex gap-4 items-center">
                            <div className="ml-4 md:p-4 p-2 rounded-lg bg-neutral-200 flex justify-center items-center">
                                <img src="icons/lesson.svg" alt="" className="w-6 h-6" />
                            </div>
                            <p className="font-medium text-sm">Lesson {lesson.id}: {lesson.title}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-neutral-400">No lessons available yet.</p>
                )}
            </div>
            <div>
                <p className="text-md font-medium">Instructor</p>
                <div className="flex md:flex-row flex-col items-center justify-center gap-5 md:gap-10 p-5">
                    <div><img src={course.expertProfile.image} alt="" className="w-16 md:w-24"/></div>
                    <div className="flex flex-col md:items-start items-center">
                        <p className="font-bold text-md">{course.expertProfile.name}</p>
                        <p className="text-sm">{course.expertProfile.title}</p>
                        <p className="text-sm md:text-start text-center">{course.expertProfile.description}</p>
                    </div>
                </div>
            </div>
            <button  onClick={() => navigate(`/Payment`, { state: course })} className="text-white bg-primary hover:bg-[#0d3178] py-2 px-16 rounded-xl text-md cursor-pointer font-medium self-center">Enroll Now</button>
        </div>
        </>
    );
}