import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret_key", {
        expiresIn: "30d",
    });
};

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber, birthDate } = req.body;

        // Check if user exists
        const userExists = await Student.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const student = await Student.create({
            firstName,
            lastName,
            email,
            passwordHash: hashedPassword,
            phoneNumber,
            birthDate
        });

        if (student) {
            res.status(201).json({
                _id: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                isRegisterd: true, // Frontend expects this for logic
                token: generateToken(student._id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });

        if (student && (await bcrypt.compare(password, student.passwordHash))) {
            res.json({
                _id: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                birthDate: student.birthDate,
                phoneNumber: student.phoneNumber,
                isRegisterd: true,
                token: generateToken(student._id),
            });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get current logged in student
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select("-passwordHash");
        res.json({
            ...student.toObject(),
            isRegisterd: true
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
