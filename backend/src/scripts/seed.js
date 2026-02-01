
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import Expert from '../models/Expert.js';
import Student from '../models/Student.js';
import Lesson from '../models/Lesson.js';
import Quiz from '../models/Quiz.js';

dotenv.config();

const coursesData = [
    {
        id: 1,
        name: "Complete Data Science Bootcamp",
        description: "Master data science from basics to advanced topics with hands-on projects and quizzes.",
        overview: "Master data science from basics to advanced topics with hands-on projects and quizzes.",
        image: "",
        price: 5000,

        expertProfile: {
            name: "Dr. Evelyn Reed",
            title: "Data Science Expert",
            experienceYears: 10,
            bio: "Dr. Reed has over 10 years of experience in data science and has worked with leading tech companies. She holds a PhD in Computer Science from Stanford University.",
            image: "icons/studentLogo2.svg",
        },
        lessons: [
            {
                id: 1,
                title: "Introduction to Data Science",
                description: "Learn the basics of data science, including data analysis, visualization, and machine learning.",
                video: {
                    url: "https://www.youtube.com/embed/ua-CiDNNj30", // Placeholder
                    durationSeconds: 2700,
                    thumbnail: ""
                },
                resources: [
                    { name: "Data Science Basics.pdf", downloadUrl: "http://example.com/ds-basics.pdf" },
                    { name: "Python Setup Guide.pdf", downloadUrl: "http://example.com/python-setup.pdf" }
                ],
                // Quizzes are separate in model but embedded in frontend data for now
                quizzes: [
                    {
                        title: "Quiz 1: Data Science Basics",
                        questions: [
                            {
                                question: "What is the primary goal of data science?",
                                options: ["Write code", "Extract insights from data", "Design websites", "Create games"],
                                correctAnswer: 1
                            },
                            {
                                question: "Which programming language is most popular for data science?",
                                options: ["Java", "Python", "C++", "Ruby"],
                                correctAnswer: 1
                            },
                            {
                                question: "What does EDA stand for?",
                                options: ["Easy Data Access", "Exploratory Data Analysis", "Extended Data Algorithm", "Electronic Data Archive"],
                                correctAnswer: 1
                            },
                            {
                                question: "Which is NOT a data science application?",
                                options: ["Recommendation systems", "Image recognition", "Video game graphics", "Fraud detection"],
                                correctAnswer: 2
                            },
                            {
                                question: "What is a dataset?",
                                options: ["A programming tool", "A collection of data", "A type of algorithm", "A visualization"],
                                correctAnswer: 1
                            }
                        ]
                    }
                ],
                reviews: [
                    {
                        studentName: "Olivia Bennett",
                        content: "Great introduction! Very clear explanations.",
                        rating: 5
                    }
                ]
            },
            {
                id: 2,
                title: "Python for Data Analysis",
                description: "Master Python programming essentials for data science applications.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 3600, thumbnail: "" },
                quizzes: [
                    {
                        title: "Quiz 2: Python Essentials",
                        questions: [
                            {
                                question: "What is the correct way to create a list in Python?",
                                options: ["list = (1, 2, 3)", "list = [1, 2, 3]", "list = {1, 2, 3}", "list = <1, 2, 3>"],
                                correctAnswer: 1
                            },
                            {
                                question: "Which library is used for data manipulation in Python?",
                                options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
                                correctAnswer: 1
                            },
                            {
                                question: "What does 'len()' function do?",
                                options: ["Sorts items", "Returns length", "Creates list", "Deletes items"],
                                correctAnswer: 1
                            },
                            {
                                question: "How do you comment in Python?",
                                options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
                                correctAnswer: 2
                            },
                            {
                                question: "What is a DataFrame?",
                                options: ["A function", "A 2D data structure", "A loop", "A variable type"],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            },
            {
                id: 3,
                title: "Data Visualization Techniques",
                description: "Create stunning visualizations using modern tools and libraries.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 3000, thumbnail: "" },
                quizzes: [
                    {
                        title: "Quiz 3: Data Visualization",
                        questions: [
                            {
                                question: "Which library is best for creating static plots in Python?",
                                options: ["Pandas", "NumPy", "Matplotlib", "Requests"],
                                correctAnswer: 2
                            },
                            {
                                question: "What type of chart is best for showing trends over time?",
                                options: ["Pie chart", "Line chart", "Scatter plot", "Bar chart"],
                                correctAnswer: 1
                            },
                            {
                                question: "What does 'plt.show()' do?",
                                options: ["Creates plot", "Displays plot", "Saves plot", "Deletes plot"],
                                correctAnswer: 1
                            },
                            {
                                question: "Which chart type shows relationships between two variables?",
                                options: ["Histogram", "Scatter plot", "Pie chart", "Box plot"],
                                correctAnswer: 1
                            },
                            {
                                question: "What is Seaborn?",
                                options: ["A database", "A visualization library", "A ML algorithm", "A programming language"],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            },
            {
                id: 4,
                title: "Machine Learning Fundamentals",
                description: "Understand core machine learning algorithms and their applications.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 4500, thumbnail: "" },
                quizzes: [
                    {
                        title: "Quiz 4: Machine Learning",
                        questions: [
                            {
                                question: "What is supervised learning?",
                                options: ["Learning without labels", "Learning with labeled data", "Unsupervised clustering", "Random learning"],
                                correctAnswer: 1
                            },
                            {
                                question: "Which is a classification algorithm?",
                                options: ["Linear Regression", "K-Means", "Decision Tree", "PCA"],
                                correctAnswer: 2
                            },
                            {
                                question: "What does overfitting mean?",
                                options: ["Model is too simple", "Model performs well on training data only", "Model is perfect", "Model has no errors"],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the purpose of training data?",
                                options: ["Testing the model", "Teaching the model", "Validating results", "Deploying model"],
                                correctAnswer: 1
                            },
                            {
                                question: "Which metric measures classification accuracy?",
                                options: ["MSE", "R-squared", "Precision", "RMSE"],
                                correctAnswer: 2
                            }
                        ]
                    }
                ]
            },
            {
                id: 5,
                title: "Deep Learning & Neural Networks",
                description: "Explore neural networks and deep learning architectures.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 5400, thumbnail: "" },
                quizzes: [
                    {
                        title: "Quiz 5: Deep Learning",
                        questions: [
                            {
                                question: "What is a neural network?",
                                options: ["A database", "A network of interconnected nodes", "A programming language", "A visualization tool"],
                                correctAnswer: 1
                            },
                            {
                                question: "Which activation function is most common in hidden layers?",
                                options: ["Sigmoid", "ReLU", "Tanh", "Softmax"],
                                correctAnswer: 1
                            },
                            {
                                question: "What does CNN stand for?",
                                options: ["Computer Neural Network", "Convolutional Neural Network", "Complex Number Network", "Coded Network Node"],
                                correctAnswer: 1
                            },
                            {
                                question: "What is backpropagation?",
                                options: ["Moving forward", "Algorithm for training neural networks", "Data preprocessing", "Model deployment"],
                                correctAnswer: 1
                            },
                            {
                                question: "Which framework is popular for deep learning?",
                                options: ["Pandas", "TensorFlow", "Matplotlib", "BeautifulSoup"],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Data Structures & Algorithms Mastery",
        description: "Master essential data structures and algorithms with coding challenges and problem-solving techniques.",
        overview: "Learn fundamental and advanced data structures and algorithms to excel in technical interviews and competitive programming.",
        image: "",
        price: 5000,
        expertProfile: {
            name: "Prof. Marcus Chen",
            title: "Algorithm Design Expert",
            experienceYears: 15,
            bio: "Prof. Chen is a renowned computer scientist with 15 years of experience teaching at MIT.",
            image: "icons/studentLogo2.svg",
        },
        lessons: [
            {
                id: 1,
                title: "Arrays and Strings Fundamentals",
                description: "Master array manipulation, string operations, and common patterns.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 3300 },
                reviews: [{ studentName: "James Wilson", content: "Very practical examples!", rating: 5 }],
                quizzes: [
                    {
                        title: "Quiz 1: Arrays & Strings",
                        questions: [
                            { question: "What is the time complexity of accessing an element in an array?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], correctAnswer: 1 },
                            { question: "Which technique uses two pointers moving towards each other?", options: ["Sliding window", "Two pointer", "Dynamic programming", "Recursion"], correctAnswer: 1 },
                            { question: "What is the space complexity of reversing a string in-place?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], correctAnswer: 1 },
                            { question: "Which algorithm finds a substring in a string efficiently?", options: ["Binary search", "KMP algorithm", "Merge sort", "Dijkstra"], correctAnswer: 1 },
                            { question: "What does the sliding window technique optimize?", options: ["Space", "Time for subarray problems", "Memory allocation", "Sorting"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                id: 2,
                title: "Linked Lists and Stacks",
                description: "Explore linked list operations and stack-based problem solving.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 3900 },
                quizzes: [
                    {
                        title: "Quiz 2: Linked Lists & Stacks",
                        questions: [
                            { question: "What is the time complexity of inserting at the head of a linked list?", options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"], correctAnswer: 1 },
                            { question: "Which operation is NOT supported by a stack?", options: ["Push", "Pop", "Random access", "Peek"], correctAnswer: 2 },
                            { question: "What technique detects a cycle in a linked list?", options: ["Binary search", "Floyd's cycle detection", "DFS", "BFS"], correctAnswer: 1 },
                            { question: "What is the principle of a stack?", options: ["FIFO", "LIFO", "Random", "Priority"], correctAnswer: 1 },
                            { question: "Which problem uses stack for solution?", options: ["Shortest path", "Balanced parentheses", "Sorting", "Searching"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                id: 3,
                title: "Trees and Graph Traversal",
                description: "Learn tree structures, graph representations, and traversal algorithms.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 4800 },
                quizzes: [
                    {
                        title: "Quiz 3: Trees & Graphs",
                        questions: [
                            { question: "What is the maximum number of children in a binary tree node?", options: ["1", "2", "3", "Unlimited"], correctAnswer: 1 },
                            { question: "Which traversal visits root node first?", options: ["Inorder", "Preorder", "Postorder", "Level-order"], correctAnswer: 1 },
                            { question: "What does BFS use for traversal?", options: ["Stack", "Queue", "Array", "Heap"], correctAnswer: 1 },
                            { question: "What is the height of a balanced BST with n nodes?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], correctAnswer: 1 },
                            { question: "Which algorithm finds shortest path in unweighted graph?", options: ["DFS", "BFS", "Dijkstra", "Bellman-Ford"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                id: 4,
                title: "Sorting and Searching Algorithms",
                description: "Master efficient sorting techniques and search algorithms.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 4200 },
                quizzes: [
                    {
                        title: "Quiz 4: Sorting & Searching",
                        questions: [
                            { question: "What is the average time complexity of Quick Sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correctAnswer: 1 },
                            { question: "Which sorting algorithm is stable?", options: ["Quick Sort", "Merge Sort", "Heap Sort", "Selection Sort"], correctAnswer: 1 },
                            { question: "What is required for binary search?", options: ["Unsorted array", "Sorted array", "Linked list", "Tree structure"], correctAnswer: 1 },
                            { question: "What is the worst-case complexity of Quick Sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correctAnswer: 2 },
                            { question: "Which algorithm uses divide and conquer?", options: ["Bubble Sort", "Merge Sort", "Insertion Sort", "Selection Sort"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                id: 5,
                title: "Dynamic Programming & Greedy Algorithms",
                description: "Solve complex problems using DP and greedy approaches.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 5700 },
                quizzes: [
                    {
                        title: "Quiz 5: DP & Greedy",
                        questions: [
                            { question: "What characterizes a dynamic programming problem?", options: ["No solution", "Overlapping subproblems", "Random approach", "Greedy choice"], correctAnswer: 1 },
                            { question: "What is memoization?", options: ["Forgetting values", "Caching computed results", "Sorting data", "Searching"], correctAnswer: 1 },
                            { question: "Which is a classic DP problem?", options: ["Binary Search", "Fibonacci sequence", "Linear Search", "Bubble Sort"], correctAnswer: 1 },
                            { question: "What does a greedy algorithm do?", options: ["Makes optimal choice at each step", "Tries all possibilities", "Uses randomness", "Backtracks always"], correctAnswer: 0 },
                            { question: "What is the Knapsack problem?", options: ["Sorting problem", "Optimization problem", "Search problem", "Graph problem"], correctAnswer: 1 }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        name: "Full-Stack Web Development Bootcamp",
        description: "Learn to build modern websites and full-stack web applications.",
        overview: "A complete web development journey — from the basics of front-end design to powerful back-end functionality.",
        image: "",
        price: 5000,
        expertProfile: {
            name: "Alex Johnson",
            title: "Full-Stack Web Developer",
            experienceYears: 8,
            bio: "Alex has been developing modern web applications for startups and tech companies for over 8 years.",
            image: "icons/studentLogo2.svg",
        },
        lessons: [
            {
                id: 1,
                title: "Introduction to Web Development",
                description: "Understand how the web works.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 2700 },
                reviews: [{ studentName: "Mia Carter", content: "A great start!", rating: 5 }],
                quizzes: [
                    {
                        title: "Quiz 1: Web Fundamentals",
                        questions: [
                            { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctAnswer: 0 },
                            { question: "Which part of the web handles visuals and layout?", options: ["Front-end", "Back-end", "Database", "Server"], correctAnswer: 0 },
                            { question: "Which protocol is used to transfer web pages?", options: ["FTP", "SMTP", "HTTP", "DNS"], correctAnswer: 2 },
                            { question: "What does a browser do?", options: ["Hosts websites", "Renders and displays web pages", "Stores databases", "Writes HTML"], correctAnswer: 1 },
                            { question: "What are the three core web technologies?", options: ["HTML, CSS, JavaScript", "Python, Java, C++", "React, Node, MongoDB", "PHP, SQL, Java"], correctAnswer: 0 }
                        ]
                    }
                ]
            },
            {
                id: 2,
                title: "HTML & CSS Fundamentals",
                description: "Learn how to structure and style web pages using HTML and CSS.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 3600 },
                quizzes: [
                    {
                        title: "Quiz 2: HTML & CSS",
                        questions: [
                            { question: "Which tag is used for the main heading?", options: ["<head>", "<h1>", "<header>", "<title>"], correctAnswer: 1 },
                            { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"], correctAnswer: 2 },
                            { question: "Which property changes text color?", options: ["font-color", "text-color", "color", "fg-color"], correctAnswer: 2 },
                            { question: "How do you select an element with id 'demo'?", options: [".demo", "#demo", "demo", "*demo"], correctAnswer: 1 },
                            { question: "Which HTML tag creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                id: 3,
                title: "JavaScript Basics",
                description: "Add interactivity to your websites with JavaScript.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 4200 },
                quizzes: [
                    {
                        title: "Quiz 3: JavaScript",
                        questions: [
                            { question: "How do you declare a variable in modern JS?", options: ["var", "let / const", "variable", "int"], correctAnswer: 1 },
                            { question: "Which symbol is used for comments?", options: ["//", "<!-- -->", "#", "**"], correctAnswer: 0 },
                            { question: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World')", "alertBox('Hello World')", "alert('Hello World')", "msgBox('Hello World')"], correctAnswer: 2 },
                            { question: "Which operator checks both value and type?", options: ["==", "===", "=", "!="], correctAnswer: 1 },
                            { question: "What is an array?", options: ["A function", "A single variable used to store multiple values", "A text string", "A database"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                id: 4,
                title: "React Essentials",
                description: "Build dynamic user interfaces with React.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 5100 },
                quizzes: [
                    {
                        title: "Quiz 4: React",
                        questions: [
                            { question: "What is a component?", options: ["A database table", "A reusable UI piece", "A server function", "A styling rule"], correctAnswer: 1 },
                            { question: "What is JSX?", options: ["JavaScript XML", "Java Syntax Extension", "JSON Xchange", "Java Source X"], correctAnswer: 0 },
                            { question: "How do you pass data to child components?", options: ["State", "Props", "Context", "Hooks"], correctAnswer: 1 },
                            { question: "Which hook manages state?", options: ["useEffect", "useState", "useContext", "useReducer"], correctAnswer: 1 },
                            { question: "What is the Virtual DOM?", options: ["A browser extension", "A lightweight copy of the real DOM", "A CSS library", "A database"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                id: 5,
                title: "Backend Development with Node.js",
                description: "Learn to build server-side applications.",
                video: { url: "https://www.youtube.com/embed/ua-CiDNNj30", durationSeconds: 5400 },
                quizzes: [
                    {
                        title: "Quiz 5: Node.js",
                        questions: [
                            { question: "What is Node.js?", options: ["A framework", "A JavaScript runtime", "A database", "A browser"], correctAnswer: 1 },
                            { question: "Which module handles file system?", options: ["http", "fs", "path", "os"], correctAnswer: 1 },
                            { question: "What is NPM?", options: ["Node Package Manager", "Node Project Manager", "New Package Module", "Node Programming Module"], correctAnswer: 0 },
                            { question: "What framework is commonly used with Node?", options: ["Django", "Express", "Flask", "Spring"], correctAnswer: 1 },
                            { question: "What does 'req' stand for in Express?", options: ["Requirement", "Request", "Require", "Response"], correctAnswer: 1 }
                        ]
                    }
                ]
            }
        ]
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing data (optional, but good for reliable seeding)
        await Course.deleteMany({});
        await Expert.deleteMany({});
        await Lesson.deleteMany({});
        await Quiz.deleteMany({});
        await Student.deleteMany({}); // Warning: This clears students too!

        console.log("Cleared existing data.");

        // Create a default student to link reviews
        const student = await Student.create({
            firstName: "Demo",
            lastName: "Student",
            email: "demo@student.com",
            passwordHash: "hashed_password", // Placeholder
            profile: { avatar: "icons/studentLogo.svg" }
        });

        // Create Admin User
        await Student.create({
            firstName: "Admin",
            lastName: "User",
            email: "admin@gmail.com",
            passwordHash: "admin123", // In a real app, this should be hashed
            profile: { avatar: "icons/studentLogo.svg", bio: "Administrator" }
        });

        for (const courseData of coursesData) {
            // Create Expert
            let expert = await Expert.findOne({ name: courseData.expertProfile.name });
            if (!expert) {
                expert = await Expert.create({
                    name: courseData.expertProfile.name,
                    title: courseData.expertProfile.title,
                    experienceYears: courseData.expertProfile.experienceYears,
                    bio: courseData.expertProfile.bio,
                    image: courseData.expertProfile.image
                });
            }

            // Create Course
            const course = await Course.create({
                name: courseData.name,
                description: courseData.description,
                overview: courseData.overview,
                image: courseData.image,
                priceDZD: parseInt(courseData.price.toString().replace(/[^0-9]/g, '')) || 0,
                expertId: expert._id,
                previewVideo: {
                    url: courseData.lessons[0].video.url, // Use first lesson video as preview
                    durationSeconds: courseData.lessons[0].video.durationSeconds,
                    title: "Course Preview"
                }
            });

            // Create Lessons
            for (let i = 0; i < courseData.lessons.length; i++) {
                const lessonData = courseData.lessons[i];

                // Format reviews for model
                const lessonReviews = (lessonData.reviews || []).map(r => ({
                    studentId: student._id,
                    studentName: r.studentName,
                    rating: r.rating,
                    reviewText: r.content,
                    createdAt: new Date()
                }));

                const lesson = await Lesson.create({
                    courseId: course._id,
                    title: lessonData.title,
                    description: lessonData.description,
                    lessonOrder: i + 1,
                    video: {
                        url: lessonData.video.url,
                        durationSeconds: lessonData.video.durationSeconds,
                        title: lessonData.title
                    },
                    reviews: lessonReviews,
                    // Use placeholder resources if none provided
                    resources: lessonData.resources || []
                });

                // Create Quizzes for this lesson
                if (lessonData.quizzes && lessonData.quizzes.length > 0) {
                    for (const quizData of lessonData.quizzes) {
                        await Quiz.create({
                            lessonId: lesson._id,
                            title: quizData.title,
                            questions: quizData.questions
                        });
                    }
                }
            }
            console.log(`Seeded course: ${course.name}`);
        }

        console.log("Seeding completed successfully!");
        process.exit(0);

    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedData();
