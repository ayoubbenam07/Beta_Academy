import Student from "../models/Student.js"

export async function getAllStudents(_, res) {
    try {
        const students = await Student.find().select('-passwordHash')
        res.status(200).json(students)
    } catch (error) {
        console.error("Error in getAllStudents controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getStudentById(req, res) {
    try {
        const student = await Student.findById(req.params.id).select('-passwordHash')
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }
        res.status(200).json(student)
    } catch (error) {
        console.error("Error in getStudentById controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createStudent(req, res) {
    try {
        const { firstName, lastName, email, passwordHash, phoneNumber, birthDate, profile } = req.body
        
        if (!firstName || !lastName || !email || !passwordHash) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const student = new Student({
            firstName,
            lastName,
            email,
            passwordHash,
            phoneNumber,
            birthDate,
            profile
        })

        const savedStudent = await student.save()
        const studentResponse = savedStudent.toObject()
        delete studentResponse.passwordHash
        res.status(201).json(studentResponse)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" })
        }
        console.error("Error in createStudent controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateStudent(req, res) {
    try {
        const { id } = req.params
        const updateData = req.body

        // Don't allow updating passwordHash through this endpoint
        if (updateData.passwordHash) {
            delete updateData.passwordHash
        }

        const student = await Student.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-passwordHash')

        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        res.status(200).json(student)
    } catch (error) {
        console.error("Error in updateStudent controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteStudent(req, res) {
    try {
        const { id } = req.params

        const student = await Student.findByIdAndDelete(id)

        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        res.status(200).json({ message: "Student deleted successfully" })
    } catch (error) {
        console.error("Error in deleteStudent controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

