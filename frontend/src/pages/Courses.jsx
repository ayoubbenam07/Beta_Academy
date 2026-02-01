import { useState, useEffect } from "react"
import Navbar from "../compenents/Navbar"
import Card from "../compenents/Card"
import { useCoursesStore } from "../compenents/stores/useCoursesStore"

export default function Courses() {
    const { courses, fetchCourses } = useCoursesStore()
    const {student} = useCoursesStore()

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);
    
    // Filter courses by name (case-insensitive)
    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return (
        <>
            {student.isRegisterd ? 
            <Navbar  number={2}/> :
            <Navbar  number={1}/>}
            <div className="flex flex-col items-center w-9/10 max-w-[900px] mx-auto">
                <p className="text-lg font-extrabold mb-2 mt-4 self-start">
                    Explore Our Courses
                </p>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full my-10 px-8 py-4 text-md bg-neutral-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search for a course"
                />

                <p className="text-md font-medium mb-2 self-start">Courses</p>

                <div className="flex flex-wrap justify-center my-10 w-full gap-6 mb-60">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => (
                            <Card course={course} key={course.id || index} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-lg mt-10">No courses found</p>
                    )}
                </div>
            </div>
        </>
    )
}
