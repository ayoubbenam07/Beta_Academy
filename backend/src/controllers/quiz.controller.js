import Quiz from "../models/Quiz.js"

export async function getAllQuizzes(_, res) {
    try {
        const quizzes = await Quiz.find().populate('lessonId')
        res.status(200).json(quizzes)
    } catch (error) {
        console.error("Error in getAllQuizzes controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getQuizByLesson(req, res) {
    try {
        const { lessonId } = req.params
        const quiz = await Quiz.findOne({ lessonId }).populate('lessonId')
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found for this lesson" })
        }
        res.status(200).json(quiz)
    } catch (error) {
        console.error("Error in getQuizByLesson controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getQuizById(req, res) {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('lessonId')
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" })
        }
        res.status(200).json(quiz)
    } catch (error) {
        console.error("Error in getQuizById controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createQuiz(req, res) {
    try {
        const { lessonId, title, passingScore, questions } = req.body
        
        if (!lessonId || !title || !questions || questions.length === 0) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        // Validate questions structure
        for (const question of questions) {
            if (!question.question || !question.options || question.correctAnswer === undefined) {
                return res.status(400).json({ message: "Invalid question structure" })
            }
            if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
                return res.status(400).json({ message: "Invalid correctAnswer index" })
            }
        }

        const quiz = new Quiz({
            lessonId,
            title,
            passingScore: passingScore || 0.7,
            questions
        })

        const savedQuiz = await quiz.save()
        res.status(201).json(savedQuiz)
    } catch (error) {
        console.error("Error in createQuiz controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateQuiz(req, res) {
    try {
        const { id } = req.params
        const updateData = req.body

        const quiz = await Quiz.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).populate('lessonId')

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" })
        }

        res.status(200).json(quiz)
    } catch (error) {
        console.error("Error in updateQuiz controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteQuiz(req, res) {
    try {
        const { id } = req.params

        const quiz = await Quiz.findByIdAndDelete(id)

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" })
        }

        res.status(200).json({ message: "Quiz deleted successfully" })
    } catch (error) {
        console.error("Error in deleteQuiz controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function submitQuizAnswers(req, res) {
    try {
        const { id } = req.params
        const { answers } = req.body

        const quiz = await Quiz.findById(id)
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" })
        }

        if (!answers || answers.length !== quiz.questions.length) {
            return res.status(400).json({ message: "Invalid answers array length" })
        }

        let correctCount = 0
        quiz.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                correctCount++
            }
        })

        const score = correctCount / quiz.questions.length
        const passed = score >= quiz.passingScore

        res.status(200).json({
            score,
            passed,
            correctCount,
            totalQuestions: quiz.questions.length,
            answers: quiz.questions.map((q, i) => ({
                questionIndex: i,
                correctAnswer: q.correctAnswer,
                userAnswer: answers[i],
                isCorrect: answers[i] === q.correctAnswer,
                explanation: q.explanation
            }))
        })
    } catch (error) {
        console.error("Error in submitQuizAnswers controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

