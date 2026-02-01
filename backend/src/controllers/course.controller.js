import Course from "../models/Course.js"

export async function getAllCourses(_, res) {
    try {
        const courses = await Course.find().populate('expertId')
        res.status(200).json(courses)
    } catch (error) {
        console.error("Error in getAllCourses controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getCourseById(req, res) {
    try {
        const course = await Course.findById(req.params.id).populate('expertId')
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        res.status(200).json(course)
    } catch (error) {
        console.error("Error in getCourseById controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createCourse(req, res) {
    try {
        const { name, description, overview, image, priceDZD, expertId, previewVideo } = req.body

        if (!name || !description || !priceDZD || !expertId || !previewVideo?.url) {
            return res.status(400).json({ message: "Missing required fields: name, description, priceDZD, expertId, and previewVideo.url are required" })
        }

        const course = new Course({
            name,
            description,
            overview,
            image,
            priceDZD,
            expertId,
            previewVideo
        })

        const savedCourse = await course.save()
        const populatedCourse = await Course.findById(savedCourse._id).populate('expertId')
        res.status(201).json(populatedCourse)
    } catch (error) {
        console.error("Error in createCourse controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateCourse(req, res) {
    try {
        const { id } = req.params
        const updateData = req.body

        const course = await Course.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).populate('expertId')

        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        res.status(200).json(course)
    } catch (error) {
        console.error("Error in updateCourse controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteCourse(req, res) {
    try {
        const { id } = req.params
        const course = await Course.findByIdAndDelete(id)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        res.status(200).json({ message: "Course deleted successfully" })
    } catch (error) {
        console.error("Error in deleteCourse controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function addCourseReview(req, res) {
    try {
        const { id } = req.params
        const { studentId, studentName, studentAvatar, rating, reviewText } = req.body

        if (!studentId || !studentName || !rating) {
            return res.status(400).json({ message: "Missing required fields: studentId, studentName, and rating are required" })
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" })
        }

        const course = await Course.findById(id)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        course.reviews.push({
            studentId,
            studentName,
            studentAvatar,
            rating,
            reviewText: reviewText || ""
        })

        await course.save()
        res.status(201).json(course)
    } catch (error) {
        console.error("Error in addCourseReview controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}