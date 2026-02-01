import React, { useState, useEffect } from 'react';
import { useCoursesStore } from '../compenents/stores/useCoursesStore';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BookOpen, Users, TrendingUp, Plus, Edit, Trash2, Menu, Eye, Search, Filter, Download, CheckCircle, XCircle, Clock, Upload, X } from 'lucide-react';

const studentsData = [
    { id: 1, name: "Ayoub Benamrouche", email: "ayoubbenamrouche@gmail.com", phone: "0561493064", enrolled: 3, completed: 2, activeCourses: ["Complete Data Science Bootcamp", "Data Structures & Algorithms Mastery"], status: "active", joinDate: "2024-01-15", lastActive: "2024-11-16" },
    { id: 2, name: "Sofia Lounis", email: "sofia.lounis@email.dz", phone: "0555123456", enrolled: 2, completed: 1, activeCourses: ["Computer Vision Masterclass", "Full-Stack Web Development Bootcamp"], status: "active", joinDate: "2024-02-10", lastActive: "2024-11-17" },
    { id: 3, name: "Mia Carter", email: "mia.carter@email.com", phone: "0666234567", enrolled: 1, completed: 1, activeCourses: ["Full-Stack Web Development Bootcamp"], status: "active", joinDate: "2024-03-20", lastActive: "2024-11-15" },
    { id: 4, name: "James Wilson", email: "james.wilson@email.com", phone: "0777345678", enrolled: 2, completed: 1, activeCourses: ["Data Structures & Algorithms Mastery"], status: "active", joinDate: "2024-01-08", lastActive: "2024-11-17" },
    { id: 5, name: "Ethan Walker", email: "ethan.walker@email.com", phone: "0555456789", enrolled: 1, completed: 0, activeCourses: ["Natural Language Processing Masterclass"], status: "active", joinDate: "2024-04-12", lastActive: "2024-11-16" },
    { id: 6, name: "Olivia Bennett", email: "olivia.bennett@email.com", phone: "0666567890", enrolled: 3, completed: 2, activeCourses: ["Complete Data Science Bootcamp", "Computer Vision Masterclass"], status: "active", joinDate: "2023-11-22", lastActive: "2024-11-17" },
    { id: 7, name: "Sofia Chen", email: "sofia.chen@email.com", phone: "0777678901", enrolled: 1, completed: 0, activeCourses: ["Robotics & Intelligent Systems"], status: "active", joinDate: "2024-10-05", lastActive: "2024-11-14" },
    { id: 8, name: "Liam Anderson", email: "liam.anderson@email.dz", phone: "0555789012", enrolled: 2, completed: 1, activeCourses: ["Full-Stack Web Development Bootcamp", "Data Structures & Algorithms Mastery"], status: "active", joinDate: "2024-05-18", lastActive: "2024-11-17" },
    { id: 9, name: "Emma Rodriguez", email: "emma.rodriguez@email.com", phone: "0666890123", enrolled: 1, completed: 1, activeCourses: ["Complete Data Science Bootcamp"], status: "inactive", joinDate: "2023-09-10", lastActive: "2024-10-22" },
    { id: 10, name: "Noah Martinez", email: "noah.martinez@email.com", phone: "0777901234", enrolled: 4, completed: 3, activeCourses: ["Natural Language Processing Masterclass", "Computer Vision Masterclass", "Robotics & Intelligent Systems"], status: "active", joinDate: "2023-12-01", lastActive: "2024-11-17" },
    { id: 11, name: "Ava Thompson", email: "ava.thompson@email.dz", phone: "0555012345", enrolled: 2, completed: 0, activeCourses: ["Data Structures & Algorithms Mastery", "Full-Stack Web Development Bootcamp"], status: "active", joinDate: "2024-09-15", lastActive: "2024-11-16" },
    { id: 12, name: "Lucas Brown", email: "lucas.brown@email.com", phone: "0666123456", enrolled: 1, completed: 1, activeCourses: ["Complete Data Science Bootcamp"], status: "active", joinDate: "2024-06-08", lastActive: "2024-11-15" }
];



const analyticsData = [
    { month: "Jun", enrollments: 145, revenue: 725000, completions: 89 },
    { month: "Jul", revenue: 1062000, enrollments: 167, completions: 102 },
    { month: "Aug", revenue: 1290000, enrollments: 198, completions: 125 },
    { month: "Sep", revenue: 1420000, enrollments: 212, completions: 138 },
    { month: "Oct", revenue: 1560000, enrollments: 234, completions: 156 },
    { month: "Nov", revenue: 1780000, enrollments: 267, completions: 178 }
];

const AdminDashboard = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingCourse, setEditingCourse] = useState(null);
    const [studentSearchTerm, setStudentSearchTerm] = useState('');

    const { courses, fetchCourses, addCourse, updateCourse, deleteCourse } = useCoursesStore();

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // Map store courses to dashboard format
    const coursesData = courses.map(course => {
        return {
            ...course, // Keep all original properties for editing (expertProfile, video, etc.)
            title: course.name, // Dashboard uses 'title' for display
            instructor: course.expertProfile?.name || "Unknown",
            students: 0, // Placeholder
            revenue: 0, // Placeholder
            completion: 0, // Placeholder
        };
    });

    // Home Page Component
    const HomePage = () => {
        const totalStudents = studentsData.length;
        const totalRevenue = coursesData.reduce((acc, c) => acc + c.revenue, 0);
        const avgCompletion = coursesData.reduce((acc, c) => acc + c.completion, 0) / coursesData.length;
        const activeStudents = studentsData.filter(s => s.status === 'active').length;

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-bold text-gray-800">Dashboard Overview</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                // Add logout logic here if needed for admin (custom logic or shared)
                                // For now just redirect
                                window.location.href = '/Login';
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => setCurrentPage('modify')}
                            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                        >
                            <Plus size={20} />
                            Add Course
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-primary text-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">Total Courses</p>
                                <h3 className="text-3xl font-bold mt-2">{coursesData.length}</h3>
                                <p className="text-blue-100 text-xs mt-1">All active courses</p>
                            </div>
                            <BookOpen size={40} className="opacity-80" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">Total Students</p>
                                <h3 className="text-3xl font-bold mt-2">{totalStudents}</h3>
                                <p className="text-green-100 text-xs mt-1">{activeStudents} active</p>
                            </div>
                            <Users size={40} className="opacity-80" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">Total Revenue</p>
                                <h3 className="text-3xl font-bold mt-2">{(totalRevenue / 1000000).toFixed(1)}M DZD</h3>
                                <p className="text-purple-100 text-xs mt-1">Last 6 months</p>
                            </div>
                            <TrendingUp size={40} className="opacity-80" />
                        </div>
                    </div>

                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                            onClick={() => setCurrentPage('modify')}
                            className="flex flex-col items-center gap-2 p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition"
                        >
                            <Plus className="text-primary" size={24} />
                            <span className="text-sm font-medium">Add Course</span>
                        </button>

                        <button
                            onClick={() => setCurrentPage('students')}
                            className="flex flex-col items-center gap-2 p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition"
                        >
                            <Users className="text-purple-600" size={24} />
                            <span className="text-sm font-medium">View Students</span>
                        </button>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Revenue Overview (DZD)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analyticsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${(value / 1000).toFixed(0)}k DZD`} />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Student Analytics Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-md flex flex-col justify-between">
                        <h2 className="text-lg font-bold text-gray-800 mb-10 px-6 pt-6">Student Enrollments</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={analyticsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="enrollments" fill="#10b981" name="Enrollments" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Top Courses by Revenue</h2>
                        <div className="space-y-3">
                            {coursesData.slice(0, 5).map((course, idx) => (
                                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 bg-blue-100 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <p className="font-medium text-gray-800 text-sm">{course.title}</p>
                                            <p className="text-xs text-gray-500">{course.students} students</p>
                                        </div>
                                    </div>
                                    <span className="text-green-600 font-semibold text-sm">{(course.revenue / 1000).toFixed(0)}k</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        );
    };

    // Students Management Page
    const StudentsPage = () => {
        const activeStudents = studentsData.filter(s => s.status === 'active').length;
        const totalEnrolled = studentsData.reduce((acc, s) => acc + s.enrolled, 0);
        const totalCompleted = studentsData.reduce((acc, s) => acc + s.completed, 0);

        const filteredStudents = studentsData.filter(s =>
            s.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
            s.email.toLowerCase().includes(studentSearchTerm.toLowerCase())
        );

        return (
            <div className="space-y-6">
                <h1 className="text-lg font-bold text-gray-800">Student Management</h1>

                {/* Student Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <p className="text-gray-500 text-sm">Total Students</p>
                        <h3 className="text-3xl font-bold text-primary mt-2">{studentsData.length}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <p className="text-gray-500 text-sm">Total Enrollments</p>
                        <h3 className="text-3xl font-bold text-purple-600 mt-2">{totalEnrolled}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <p className="text-gray-500 text-sm">Courses Completed</p>
                        <h3 className="text-3xl font-bold text-orange-600 mt-2">{totalCompleted}</h3>
                    </div>
                </div>

                {/* Students Table */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-md font-bold text-gray-800">All Students</h2>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    value={studentSearchTerm}
                                    onChange={(e) => setStudentSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Enrolled</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Join Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium text-gray-800">{student.name}</td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">{student.email}</td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">{student.phone}</td>
                                        <td className="py-3 px-4 text-gray-600">{student.enrolled}</td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">{student.joinDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    // Course Management Page
    const CoursesPage = () => {

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-bold text-gray-800">Course Management</h1>
                    <button
                        onClick={() => setCurrentPage('modify')}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus size={20} />
                        Add New Course
                    </button>
                </div>

                {/* Courses Table */}
                <div className="bg-white rounded-xl shadow-md overflow-x-scroll">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Course</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Instructor</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Students</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Rating</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Price</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coursesData.map(course => (
                                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-6">
                                        <div className="font-medium text-gray-800">{course.title}</div>
                                        <div className="text-xs text-gray-500">{course.totalLessons} lessons</div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{course.instructor}</td>
                                    <td className="py-4 px-6 text-gray-600">{course.students}</td>
                                    <td className="py-4 px-6">
                                        <span className="text-yellow-500">★</span> {course.rating}
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{course.price}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            {/* Edit Button */}
                                            <button
                                                onClick={() => {
                                                    setEditingCourse(course);
                                                    setCurrentPage('modify');
                                                }}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                            >
                                                <Edit size={18} />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    if (window.confirm(`Are you sure you want to delete "${course.title}"? This action cannot be undone.`)) {
                                                        const success = await deleteCourse(course.id);
                                                        if (success) {
                                                            alert('Course deleted successfully!');
                                                        } else {
                                                            alert('Failed to delete course. Please try again.');
                                                        }
                                                    }
                                                }}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // Modify/Add Course Page
    const ModifyCoursePage = () => {
        const [formData, setFormData] = useState(() => {
            if (editingCourse) {
                return {
                    ...editingCourse,
                    video: {
                        url: editingCourse.video?.url || '',
                        durationSeconds: editingCourse.video?.durationSeconds || 0,
                        thumbnail: editingCourse.video?.thumbnail || '',
                        title: editingCourse.video?.title || ''
                    },
                    expertProfile: {
                        name: editingCourse.expertProfile?.name || '',
                        title: editingCourse.expertProfile?.title || '',
                        experienceYears: parseInt(editingCourse.expertProfile?.experience?.match(/\d+/)?.[0]) || 0,
                        bio: editingCourse.expertProfile?.description || '', // Mapping description to bio
                        image: editingCourse.expertProfile?.image || '',
                        socialLinks: editingCourse.expertProfile?.socialLinks || { linkedin: '', twitter: '', website: '' }
                    }
                };
            }
            return {
                name: '',
                description: '',
                overview: '',
                image: '',
                priceDZD: 0,
                video: {
                    url: '',
                    durationSeconds: 0,
                    thumbnail: '',
                    title: ''
                },
                totalLessons: 0,
                overallProgress: 0,
                reviews: {
                    ratings: [0, 0, 0, 0, 0],
                    averageRating: 0,
                    totalReviews: 0
                },
                expertProfile: {
                    name: '',
                    title: '',
                    experienceYears: 0,
                    bio: '',
                    image: '',
                    socialLinks: {
                        linkedin: '',
                        twitter: '',
                        website: ''
                    }
                },
                lessons: []
            };
        });

        const [showLessonModal, setShowLessonModal] = useState(false);
        const [editingLesson, setEditingLesson] = useState(null);
        const [lessonFormData, setLessonFormData] = useState({
            title: '',
            titleDescription: '',
            video: {
                url: '',
                durationSeconds: 0,
                thumbnail: ''
            },
            resources: [],
            extraResources: [],
            moduleDescription: '',
            progress: 0,
            isCompleted: false,
            reviews: {
                ratings: [0, 0, 0, 0, 0],
                averageRating: 0,
                totalReviews: 0
            },
            quizzes: [],
            comments: []
        });

        const handleSubmit = async () => {
            try {
                let success = false;
                if (editingCourse) {
                    success = await updateCourse(editingCourse.id, formData);
                    if (success) alert('Course updated successfully!');
                } else {
                    success = await addCourse(formData);
                    if (success) alert('Course added successfully!');
                }

                if (success) {
                    setEditingCourse(null);
                    setCurrentPage('courses');
                    fetchCourses(); // explicit refresh likely covered by actions but safe to keep
                } else {
                    alert('Operation failed. Please check console.');
                }
            } catch (error) {
                console.error("Submit error", error);
                alert('An error occurred.');
            }
        };

        const handleAddLesson = () => {
            setEditingLesson(null);
            setLessonFormData({
                title: '',
                titleDescription: '',
                video: { url: '', durationSeconds: 0, thumbnail: '' },
                resources: [],
                extraResources: [],
                moduleDescription: '',
                progress: 0,
                isCompleted: false,
                reviews: { ratings: [0, 0, 0, 0, 0], averageRating: 0, totalReviews: 0 },
                quizzes: [],
                comments: []
            });
            setShowLessonModal(true);
        };

        const handleEditLesson = (lesson, index) => {
            setEditingLesson(index);
            setLessonFormData(lesson);
            setShowLessonModal(true);
        };

        const handleSaveLesson = () => {
            const newLesson = {
                ...lessonFormData,
                id: editingLesson !== null ? formData.lessons[editingLesson].id : formData.lessons.length + 1
            };

            let updatedLessons;
            if (editingLesson !== null) {
                updatedLessons = [...formData.lessons];
                updatedLessons[editingLesson] = newLesson;
            } else {
                updatedLessons = [...formData.lessons, newLesson];
            }

            setFormData({ ...formData, lessons: updatedLessons });
            setShowLessonModal(false);
        };

        const handleDeleteLesson = (index) => {
            if (confirm('Are you sure you want to delete this lesson?')) {
                const updatedLessons = formData.lessons.filter((_, i) => i !== index);
                setFormData({ ...formData, lessons: updatedLessons });
            }
        };

        const addResource = (type) => {
            const newResource = { id: Date.now(), name: '', downloadLink: '' };
            if (type === 'main') {
                setLessonFormData({
                    ...lessonFormData,
                    resources: [...lessonFormData.resources, newResource]
                });
            } else {
                setLessonFormData({
                    ...lessonFormData,
                    extraResources: [...lessonFormData.extraResources, newResource]
                });
            }
        };

        const updateResource = (type, index, field, value) => {
            if (type === 'main') {
                const updated = [...lessonFormData.resources];
                updated[index][field] = value;
                setLessonFormData({ ...lessonFormData, resources: updated });
            } else {
                const updated = [...lessonFormData.extraResources];
                updated[index][field] = value;
                setLessonFormData({ ...lessonFormData, extraResources: updated });
            }
        };

        const removeResource = (type, index) => {
            if (type === 'main') {
                setLessonFormData({
                    ...lessonFormData,
                    resources: lessonFormData.resources.filter((_, i) => i !== index)
                });
            } else {
                setLessonFormData({
                    ...lessonFormData,
                    extraResources: lessonFormData.extraResources.filter((_, i) => i !== index)
                });
            }
        };

        return (
            <div className="space-y-6 p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {editingCourse ? 'Edit Course' : 'Add New Course'}
                    </h1>
                    <button
                        onClick={() => {
                            setEditingCourse(null);
                            setCurrentPage('courses');
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="e.g., Complete Data Science Bootcamp"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price (DZD)
                                </label>
                                <input
                                    type="number"
                                    value={formData.priceDZD}
                                    onChange={(e) => setFormData({ ...formData, priceDZD: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="5000"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course Image URL
                                </label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Short description..."
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Overview
                                </label>
                                <textarea
                                    value={formData.overview}
                                    onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Detailed overview..."
                                />
                            </div>

                            {/* Course Video Section */}
                            <div className="md:col-span-2 border-t border-neutral-200 pt-6">
                                <h3 className="text-md font-semibold text-gray-800 mb-4">Course Preview Video</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={formData.video.url}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            video: { ...formData.video, url: e.target.value }
                                        })}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Video URL"
                                    />
                                    <input
                                        type="number"
                                        value={formData.video.durationSeconds}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            video: { ...formData.video, durationSeconds: parseInt(e.target.value) || 0 }
                                        })}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Duration (seconds)"
                                    />
                                    <input
                                        type="text"
                                        value={formData.video.title}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            video: { ...formData.video, title: e.target.value }
                                        })}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Video Title"
                                    />
                                    <input
                                        type="text"
                                        value={formData.video.thumbnail}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            video: { ...formData.video, thumbnail: e.target.value }
                                        })}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Video Thumbnail URL"
                                    />
                                </div>
                            </div>

                            {/* Expert Profile Section */}
                            <div className="md:col-span-2 border-t border-neutral-200 pt-6">
                                <h3 className="text-md font-semibold text-gray-800 mb-4">Expert Profile</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={formData.expertProfile.name}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            expertProfile: { ...formData.expertProfile, name: e.target.value }
                                        })}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Expert Name"
                                    />
                                    <input
                                        type="text"
                                        value={formData.expertProfile.title}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            expertProfile: { ...formData.expertProfile, title: e.target.value }
                                        })}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Expert Title"
                                    />
                                    <input
                                        type="number"
                                        value={formData.expertProfile.experienceYears}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            expertProfile: { ...formData.expertProfile, experienceYears: parseInt(e.target.value) || 0 }
                                        })}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Years of Experience"
                                    />
                                    <input
                                        type="text"
                                        value={formData.expertProfile.image}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            expertProfile: { ...formData.expertProfile, image: e.target.value }
                                        })}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Image URL"
                                    />
                                    <textarea
                                        value={formData.expertProfile.bio}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            expertProfile: { ...formData.expertProfile, bio: e.target.value }
                                        })}
                                        rows="3"
                                        className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Expert Bio"
                                    />
                                    <div className="md:col-span-2 grid grid-cols-3 gap-4">
                                        <input
                                            type="text"
                                            value={formData.expertProfile.socialLinks.linkedin}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                expertProfile: {
                                                    ...formData.expertProfile,
                                                    socialLinks: { ...formData.expertProfile.socialLinks, linkedin: e.target.value }
                                                }
                                            })}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            placeholder="LinkedIn URL"
                                        />
                                        <input
                                            type="text"
                                            value={formData.expertProfile.socialLinks.twitter}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                expertProfile: {
                                                    ...formData.expertProfile,
                                                    socialLinks: { ...formData.expertProfile.socialLinks, twitter: e.target.value }
                                                }
                                            })}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            placeholder="Twitter URL"
                                        />
                                        <input
                                            type="text"
                                            value={formData.expertProfile.socialLinks.website}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                expertProfile: {
                                                    ...formData.expertProfile,
                                                    socialLinks: { ...formData.expertProfile.socialLinks, website: e.target.value }
                                                }
                                            })}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            placeholder="Website URL"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-neutral-200 pt-6 flex gap-4">
                            <button
                                onClick={handleSubmit}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                            >
                                {editingCourse ? 'Update Course' : 'Create Course'}
                            </button>
                            <button
                                onClick={() => {
                                    setEditingCourse(null);
                                    setCurrentPage('courses');
                                }}
                                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                {/* Course Lessons Section */}
                <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800">
                            Course Lessons ({formData.lessons.length})
                        </h2>
                        <button
                            onClick={handleAddLesson}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            <Plus size={20} />
                            Add Lesson
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.lessons.map((lesson, index) => (
                            <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="text-blue-600" size={24} />
                                    <div>
                                        <p className="font-medium text-gray-800">{lesson.title}</p>
                                        <p className="text-sm text-gray-500">{lesson.titleDescription}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {lesson.video.duration} • {lesson.resources.length} resources • {lesson.quizzes.length} quizzes
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditLesson(lesson, index)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteLesson(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {formData.lessons.length === 0 && (
                            <p className="text-center text-gray-500 py-8">No lessons added yet. Click "Add Lesson" to get started.</p>
                        )}
                    </div>
                </div>

                {/* Lesson Modal */}
                {showLessonModal && (
                    <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-[1200px] w-full max-h-[90vh] overflow-y-scroll scrollbar-hide">
                            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {editingLesson !== null ? 'Edit Lesson' : 'Add New Lesson'}
                                </h3>
                                <button
                                    onClick={() => setShowLessonModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lesson Title
                                    </label>
                                    <input
                                        type="text"
                                        value={lessonFormData.title}
                                        onChange={(e) => setLessonFormData({ ...lessonFormData, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="e.g., Introduction to Data Science"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title Description
                                    </label>
                                    <textarea
                                        value={lessonFormData.titleDescription}
                                        onChange={(e) => setLessonFormData({ ...lessonFormData, titleDescription: e.target.value })}
                                        rows="2"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Brief description..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Module Description
                                    </label>
                                    <textarea
                                        value={lessonFormData.moduleDescription}
                                        onChange={(e) => setLessonFormData({ ...lessonFormData, moduleDescription: e.target.value })}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Detailed description..."
                                    />
                                </div>

                                <div className="border-t border-neutral-200 pt-4">
                                    <h4 className="text-md font-semibold text-gray-800 mb-3">Video Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            value={lessonFormData.video.url}
                                            onChange={(e) => setLessonFormData({
                                                ...lessonFormData,
                                                video: { ...lessonFormData.video, url: e.target.value }
                                            })}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            placeholder="Video URL"
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Duration (seconds)
                                            </label>
                                            <input
                                                type="number"
                                                value={lessonFormData.video.durationSeconds}
                                                onChange={(e) => setLessonFormData({
                                                    ...lessonFormData,
                                                    video: { ...lessonFormData.video, durationSeconds: parseInt(e.target.value) || 0 }
                                                })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                placeholder="Duration in seconds"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={lessonFormData.video.thumbnail}
                                            onChange={(e) => setLessonFormData({
                                                ...lessonFormData,
                                                video: { ...lessonFormData.video, thumbnail: e.target.value }
                                            })}
                                            className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            placeholder="Thumbnail URL"
                                        />
                                    </div>
                                </div>

                                <div className="border-t border-neutral-200 pt-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-md font-semibold text-gray-800">Resources</h4>
                                        <button
                                            onClick={() => addResource('main')}
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                        >
                                            + Add Resource
                                        </button>
                                    </div>
                                    {lessonFormData.resources.map((resource, idx) => (
                                        <div key={resource.id} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={resource.name}
                                                onChange={(e) => updateResource('main', idx, 'name', e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                placeholder="Resource name"
                                            />
                                            <input
                                                type="text"
                                                value={resource.downloadLink}
                                                onChange={(e) => updateResource('main', idx, 'downloadLink', e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                placeholder="Download link"
                                            />
                                            <button
                                                onClick={() => removeResource('main', idx)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-neutral-200 pt-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-md font-semibold text-gray-800">Extra Resources</h4>
                                        <button
                                            onClick={() => addResource('extra')}
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                        >
                                            + Add Extra Resource
                                        </button>
                                    </div>
                                    {lessonFormData.extraResources.map((resource, idx) => (
                                        <div key={resource.id} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={resource.name}
                                                onChange={(e) => updateResource('extra', idx, 'name', e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                placeholder="Resource name"
                                            />
                                            <input
                                                type="text"
                                                value={resource.downloadLink}
                                                onChange={(e) => updateResource('extra', idx, 'downloadLink', e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                placeholder="Download link"
                                            />
                                            <button
                                                onClick={() => removeResource('extra', idx)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex gap-4">
                                <button
                                    onClick={handleSaveLesson}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                    {/* <Save size={20} /> */}
                                    Save Lesson
                                </button>
                                <button
                                    onClick={() => setShowLessonModal(false)}
                                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };


    // Navigation

    const Sidebar = () => {
        const [isOpen, setIsOpen] = React.useState(false);

        const menuItems = [
            { id: 'home', label: 'Dashboard', icon: TrendingUp },
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'students', label: 'Students', icon: Users },
        ];

        return (
            <>
                {/* Hamburger Button - Only visible on small screens */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed top-4 left-4 z-50 p-2 bg-gray-900/50 text-white rounded-lg hover:bg-gray-800 transition lg:hidden"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Overlay - Only on small screens */}
                {isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/70 bg-opacity-50 z-30 lg:hidden"
                    />
                )}

                {/* Sidebar */}
                <div className={`fixed lg:sticky top-0 left-0 h-full lg:h-screen w-64 bg-gray-900 text-white p-6 z-40 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}>
                    <div className="mb-8 lg:mt-0 mt-12">
                        <h1 className="text-2xl font-bold">CourseAdmin</h1>
                        <p className="text-gray-400 text-sm mt-1">Management Portal</p>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map(item => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setCurrentPage(item.id);
                                        setSelectedCourse(null);
                                        setEditingCourse(null);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentPage === item.id
                                        ? 'bg-primary text-white'
                                        : 'text-gray-300 hover:bg-gray-800'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="absolute bottom-6 left-0 right-0">
                        <div className="flex items-center gap-3 px-4 py-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold">
                                A
                            </div>
                            <div>
                                <p className="font-medium">Admin User</p>
                                <p className="text-sm text-gray-400">admin@course.dz</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                {currentPage === 'home' && <HomePage />}
                {currentPage === 'students' && <StudentsPage />}
                {currentPage === 'courses' && <CoursesPage />}
                {currentPage === 'modify' && <ModifyCoursePage />}
            </div>
        </div>
    );
};

export default AdminDashboard