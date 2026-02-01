import Lesson from "../models/Lesson.js"

export async function getAllLessons(_, res) {
    try {
        const lessons = await Lesson.find().populate('courseId')
        res.status(200).json(lessons)
    } catch (error) {
        console.error("Error in getAllLessons controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getLessonsByCourse(req, res) {
    try {
        const { courseId } = req.params
        const lessons = await Lesson.find({ courseId })
            .sort({ lessonOrder: 1 })
            .populate('courseId')
        res.status(200).json(lessons)
    } catch (error) {
        console.error("Error in getLessonsByCourse controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getLessonById(req, res) {
    try {
        const lesson = await Lesson.findById(req.params.id).populate('courseId')
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" })
        }
        res.status(200).json(lesson)
    } catch (error) {
        console.error("Error in getLessonById controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createLesson(req, res) {
    try {
        const { courseId, title, description, lessonOrder, video, resources, isPreview } = req.body
        
        if (!courseId || !title || lessonOrder === undefined || !video?.url || video?.durationSeconds === undefined) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const lesson = new Lesson({
            courseId,
            title,
            description,
            lessonOrder,
            video,
            resources: resources || [],
            isPreview: isPreview || false
        })

        const savedLesson = await lesson.save()
        res.status(201).json(savedLesson)
    } catch (error) {
        console.error("Error in createLesson controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateLesson(req, res) {
    try {
        const { id } = req.params
        const updateData = req.body

        const lesson = await Lesson.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).populate('courseId')

        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" })
        }

        res.status(200).json(lesson)
    } catch (error) {
        console.error("Error in updateLesson controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteLesson(req, res) {
    try {
        const { id } = req.params

        const lesson = await Lesson.findByIdAndDelete(id)

        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" })
        }

        res.status(200).json({ message: "Lesson deleted successfully" })
    } catch (error) {
        console.error("Error in deleteLesson controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function addLessonComment(req, res) {
    try {
        const { id } = req.params
        const { studentId, content } = req.body

        if (!studentId || !content) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const lesson = await Lesson.findById(id)
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" })
        }

        lesson.comments.push({ studentId, content })
        await lesson.save()

        res.status(201).json(lesson)
    } catch (error) {
        console.error("Error in addLessonComment controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function addLessonReview(req, res) {
    try {
        const { id } = req.params
        const { studentId, studentName, studentAvatar, rating, reviewText } = req.body

        if (!studentId || !studentName || !rating) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const lesson = await Lesson.findById(id)
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" })
        }

        lesson.reviews.push({
            studentId,
            studentName,
            studentAvatar,
            rating,
            reviewText
        })
        await lesson.save()

        res.status(201).json(lesson)
    } catch (error) {
        console.error("Error in addLessonReview controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

