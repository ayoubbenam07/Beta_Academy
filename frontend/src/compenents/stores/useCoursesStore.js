import { create } from 'zustand';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = '/api';

export const useCoursesStore = create((set, get) => ({

    courses: [],
    student: JSON.parse(localStorage.getItem('student')) || {
        isRegisterd: false,
        firstName: "",
        lastName: "",
        email: "",
    },
    token: localStorage.getItem('token') || null,

    registerStudent: async (studentData) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('student', JSON.stringify(data));
                set({
                    student: data,
                    token: data.token
                });
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: "Server error" };
        }
    },

    loggedStudent: async (credentials) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('student', JSON.stringify(data));
                set({
                    student: data,
                    token: data.token
                });
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: "Server error" };
        }
    },

    logoutStub: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('student');
        set((state) => ({
            student: {
                isRegisterd: false,
                firstName: "",
                lastName: "",
                email: "",
            },
            token: null
        }));
    },
    payCourse: async (courseId) => {
        const state = get();
        // Fallback to localStorage if state is empty (e.g. after refresh)
        const student = state.student._id ? state.student : JSON.parse(localStorage.getItem('student'));

        if (!student || !student._id) return { success: false, message: "User not logged in" };

        try {
            const response = await fetch('/api/enrollment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: student._id,
                    courseId: courseId
                })
            });

            if (response.ok) {
                set((state) => ({
                    courses: state.courses.map((course) => {
                        if (course.id === courseId) {
                            return {
                                ...course,
                                isRegisterd: true,
                            };
                        }
                        return course;
                    }),
                }));
                return { success: true };
            } else {
                const data = await response.json();
                // If already enrolled, consider it a success for the UI
                if (data.message && data.message.includes("already enrolled")) {
                    set((state) => ({
                        courses: state.courses.map((course) => {
                            if (course.id === courseId) {
                                return {
                                    ...course,
                                    isRegisterd: true, // Force true
                                };
                            }
                            return course;
                        }),
                    }));
                    return { success: true, message: "Already enrolled" };
                }
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Enrollment error:", error);
            return { success: false, message: "Enrollment failed" };
        }
    },
    fetchCourses: async () => {
        try {
            const state = get();
            const student = state.student._id ? state.student : JSON.parse(localStorage.getItem('student'));

            // 1. Fetch Courses
            const response = await fetch('/api/course');
            if (!response.ok) throw new Error('Failed to fetch courses');
            const data = await response.json();

            // 2. Fetch Enrollments if user is logged in
            let enrolledCourseIds = new Set();
            if (student && student._id) {
                try {
                    const enrollmentResponse = await fetch(`/api/enrollment/student/${student._id}`);
                    if (enrollmentResponse.ok) {
                        const enrollments = await enrollmentResponse.json();
                        enrollments.forEach(e => enrolledCourseIds.add(e.courseId._id || e.courseId));
                    }
                } catch (err) {
                    console.error("Failed to fetch enrollments", err);
                }
            }

            // Transform API data to match frontend format
            const transformedCourses = data.map((course, index) => {
                // Calculate average rating from reviews
                const reviews = course.reviews || [];
                const totalReviews = reviews.length;
                const averageRating = totalReviews > 0
                    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                    : 0;

                // Create ratings array [5-star, 4-star, 3-star, 2-star, 1-star]
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
                    priceDZD: course.priceDZD,
                    expertId: course.expertId?._id,
                    isRegisterd: enrolledCourseIds.has(course._id), // Set based on enrollment
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

            set({ courses: transformedCourses });

            // If student logged in, ensure state.student is synced (optional)
            if (student && !state.student._id) {
                set({ student: student });
            }

        } catch (error) {
            console.error('Error fetching courses:', error);
            // Keep existing courses if fetch fails
        }
    },
    fetchCourseById: async (courseId) => {
        try {
            const response = await fetch(`/api/course/${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch course');
            }
            const course = await response.json();

            // Transform course data
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

            // Fetch lessons for this course
            const lessonsResponse = await fetch(`/api/lesson/course/${courseId}`);
            let lessons = [];
            if (lessonsResponse.ok) {
                const lessonsData = await lessonsResponse.json();
                lessons = lessonsData.map((lesson, index) => ({
                    id: lesson.lessonOrder || index + 1,
                    title: lesson.title,
                    titleDescription: lesson.description || "",
                    video: {
                        url: lesson.video?.url || "",
                        duration: lesson.video?.durationSeconds
                            ? `${Math.floor(lesson.video.durationSeconds / 60)} mins`
                            : "0 mins",
                        thumbnail: lesson.video?.thumbnail || ""
                    },
                    resources: (lesson.resources || []).map((res, idx) => ({
                        id: idx + 1,
                        name: res.name,
                        url: res.downloadUrl
                    })),
                    extraResources: [],
                    moduleDescription: lesson.description || "",
                    progress: 0,
                    isCompleted: false,
                    reviews: {
                        ratings: [0, 0, 0, 0, 0],
                        averageRating: 0,
                        totalReviews: lesson.reviews?.length || 0
                    },
                    quizzes: [],
                    comments: (lesson.comments || []).map((comment, idx) => ({
                        id: idx + 1,
                        author: comment.studentId?.name || "Anonymous",
                        content: comment.content,
                        profile: "icons/studentLogo.svg"
                    }))
                }));
            }

            const transformedCourse = {
                id: course._id,
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
                totalLessons: lessons.length,
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
                lessons: lessons
            };

            return transformedCourse;
        } catch (error) {
            console.error('Error fetching course:', error);
            throw error;
        }
    },
    fetchLessonsByCourse: async (courseId) => {
        try {
            const response = await fetch(`/api/lesson/course/${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch lessons');
            }
            const lessonsData = await response.json();

            const transformedLessons = await Promise.all(lessonsData.map(async (lesson, index) => {
                // Calculate reviews
                const lessonReviews = lesson.reviews || [];
                const totalReviews = lessonReviews.length;
                const averageRating = totalReviews > 0
                    ? lessonReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                    : 0;

                const ratings = [0, 0, 0, 0, 0];
                lessonReviews.forEach(review => {
                    if (review.rating >= 1 && review.rating <= 5) {
                        ratings[5 - review.rating]++;
                    }
                });

                return {
                    id: lesson.lessonOrder || index + 1,
                    dbId: lesson._id, // Keep original DB ID
                    title: lesson.title,
                    titleDescription: lesson.description || "",
                    video: {
                        url: lesson.video?.url || "",
                        duration: lesson.video?.durationSeconds
                            ? `${Math.floor(lesson.video.durationSeconds / 60)} mins`
                            : "0 mins",
                        thumbnail: lesson.video?.thumbnail || ""
                    },
                    resources: (lesson.resources || []).map((res, idx) => ({
                        id: idx + 1,
                        name: res.name,
                        url: res.downloadUrl
                    })),
                    extraResources: [],
                    moduleDescription: lesson.description || "",
                    progress: 0,
                    isCompleted: false,
                    reviews: {
                        ratings: ratings,
                        averageRating: Math.round(averageRating * 10) / 10,
                        totalReviews: totalReviews
                    },
                    quizzes: await get().fetchQuizByLesson(lesson._id),
                    comments: (lesson.comments || []).map((comment, idx) => ({
                        id: idx + 1,
                        author: comment.studentId?.name || "Anonymous",
                        content: comment.content,
                        profile: "icons/studentLogo.svg"
                    }))
                };
            }));

            return transformedLessons;
        } catch (error) {
            console.error('Error fetching lessons:', error);
            throw error;
        }
    },
    fetchQuizByLesson: async (lessonId) => {
        try {
            const response = await fetch(`/api/quiz/lesson/${lessonId}`);
            if (!response.ok) {
                // If quiz not found, return empty array instead of throwing
                if (response.status === 404) {
                    return [];
                }
                throw new Error('Failed to fetch quiz');
            }
            const quiz = await response.json();

            // Transform quiz data to match frontend format
            const transformedQuiz = {
                id: quiz._id,
                quizName: quiz.title,
                passingScore: quiz.passingScore,
                questions: quiz.questions.map((q, index) => ({
                    question: q.question,
                    options: q.options,
                    correct: q.correctAnswer
                }))
            };

            return [transformedQuiz]; // Return as array for compatibility with mapper
        } catch (error) {
            console.error('Error fetching quiz:', error);
            return []; // Return empty array on error to prevent breaking lesson fetch
        }
    },
    addCourse: async (courseData) => {
        try {
            // 1. Create Expert first
            const expertResponse = await fetch('/api/expert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData.expertProfile)
            });

            if (!expertResponse.ok) throw new Error('Failed to create expert');
            const expert = await expertResponse.json();

            // 2. Create Course with expertId
            const newCoursePayload = {
                name: courseData.name,
                description: courseData.description,
                overview: courseData.overview,
                image: courseData.image,
                priceDZD: courseData.priceDZD,
                expertId: expert._id,
                previewVideo: {
                    url: courseData.video.url,
                    durationSeconds: courseData.video.durationSeconds,
                    thumbnail: courseData.video.thumbnail,
                    title: courseData.video.title
                }
            };

            const courseResponse = await fetch('/api/course', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCoursePayload)
            });

            if (!courseResponse.ok) throw new Error('Failed to create course');

            // Refresh courses
            await get().fetchCourses();
            return true;
        } catch (error) {
            console.error('Error adding course:', error);
            return false;
        }
    },
    updateCourse: async (courseId, courseData) => {
        try {
            // 1. Update/Create Expert
            // Ideally we should know the expertId. For now, we might create a new one if not tracked, 
            // but let's assume we might need to find or update.
            // Simplified: Update the expert associated with this course if we can, or just create new if logic requires.
            // But since we don't store expertId safely in frontend form (it just has profile fields), 
            // we will create a NEW expert or finding existing by name (backend logic?)
            // For now, let's just create/update based on the flow. 
            // NOTE: Ideally `courseData` should have `expertId` if it's an existing course.

            // If we have expertId in the local mapped data (we should add it to the map in fetchCourses!)
            let expertId = courseData.expertId;

            if (!expertId) {
                // Create new if generic
                const expertResponse = await fetch('/api/expert', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(courseData.expertProfile)
                });
                if (!expertResponse.ok) throw new Error('Failed to create/update expert');
                const expert = await expertResponse.json();
                expertId = expert._id;
            } else {
                // Update existing expert
                await fetch(`/api/expert/${expertId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(courseData.expertProfile)
                });
            }

            // 2. Update Course
            const updateCoursePayload = {
                name: courseData.name,
                description: courseData.description,
                overview: courseData.overview,
                image: courseData.image,
                priceDZD: courseData.priceDZD,
                expertId: expertId,
                previewVideo: {
                    url: courseData.video.url,
                    durationSeconds: courseData.video.durationSeconds,
                    thumbnail: courseData.video.thumbnail,
                    title: courseData.video.title
                }
            };

            const courseResponse = await fetch(`/api/course/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateCoursePayload)
            });

            if (!courseResponse.ok) throw new Error('Failed to update course');

            // Refresh courses
            await get().fetchCourses();
            return true;
        } catch (error) {
            console.error('Error updating course:', error);
            return false;
        }
    },
    fetchEnrollment: async (studentId, courseId) => {
        try {
            const response = await fetch(`/api/enrollment/student/${studentId}`);
            if (response.ok) {
                const enrollments = await response.json();
                const enrollment = enrollments.find(e =>
                    (e.courseId._id === courseId || e.courseId === courseId)
                );
                return enrollment || null;
            }
            return null;
        } catch (error) {
            console.error("Fetch enrollment error:", error);
            return null;
        }
    },
    saveQuizAttempt: async (enrollmentId, attemptData) => {
        try {
            const response = await fetch(`/api/enrollment/${enrollmentId}/quiz-attempt`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(attemptData)
            });

            if (response.ok) {
                return { success: true };
            } else {
                const data = await response.json();
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Save quiz attempt error:", error);
            return { success: false, message: "Failed to save quiz result" };
        }
    },
    deleteCourse: async (courseId) => {
        try {
            const response = await fetch(`/api/course/${courseId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) throw new Error('Failed to delete course');

            // Refresh courses
            await get().fetchCourses();
            return true;
        } catch (error) {
            console.error('Error deleting course:', error);
            return false;
        }
    }
}));
