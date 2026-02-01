import { useState, useEffect } from "react";
import Card from "../Card"

export default function CoursesSection(){
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/course');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                
                // Transform API data to match frontend format
                const transformedCourses = data.map((course, index) => {
                    const reviews = course.reviews || [];
                    const totalReviews = reviews.length;
                    const averageRating = totalReviews > 0
                        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                        : 0;
                    
                    const ratings = [0, 0, 0, 0, 0];
                    reviews.forEach(review => {
                        if (review.rating >= 1 && review.rating <= 5) {
                            ratings[5 - review.rating]++;
                        }
                    });

                    return {
                        id: course._id || index + 1,
                        name: course.name,
                        description: course.description,
                        overview: course.overview || course.description,
                        image: course.image || "",
                        price: `${course.priceDZD} DZD`,
                        isRegisterd: false,
                        video: {
                            url: course.previewVideo?.url || "",
                            duration: course.previewVideo?.durationSeconds 
                                ? `${Math.floor(course.previewVideo.durationSeconds / 60)} mins`
                                : "0 mins",
                            thumbnail: course.previewVideo?.thumbnail || ""
                        },
                        totalLessons: 0,
                        overallProgress: 0,
                        reviews: {
                            ratings: ratings,
                            averageRating: Math.round(averageRating * 10) / 10,
                            totalReviews: totalReviews
                        },
                        expertProfile: {
                            name: course.expertId?.name || "Unknown Expert",
                            title: course.expertId?.title || "",
                            experience: course.expertId?.experienceYears 
                                ? `Over ${course.expertId.experienceYears} years of experience`
                                : "",
                            description: course.expertId?.bio || "",
                            image: course.expertId?.image || "icons/studentLogo2.svg",
                        },
                        lessons: []
                    };
                });
                
                setCourses(transformedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center w-9/10 max-w-[1100px] mx-auto mb-20">
                <p className="text-lg font-extrabold mb-8 textLinear animation">Beta's Courses</p>
                <p className="text-neutral-400">Loading courses...</p>
            </div>
        );
    }

    return(
        <div className="flex flex-col items-center w-9/10 max-w-[1100px] mx-auto mb-20 ">
            <p className="text-lg font-extrabold mb-8 textLinear animation">Beta's Courses</p>
            <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-center">
                {
                    courses.slice(0,3).map((course, index) => (
                        <Card course={course} key={course.id || index}/>
                    ))
                }
            </div>
        </div>
    )
}