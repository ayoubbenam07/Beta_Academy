import Expert from "../models/Expert.js"

export async function getAllExperts(_, res) {
    try {
        const experts = await Expert.find()
        res.status(200).json(experts)
    } catch (error) {
        console.error("Error in getAllExperts controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getExpertById(req, res) {
    try {
        const expert = await Expert.findById(req.params.id)
        if (!expert) {
            return res.status(404).json({ message: "Expert not found" })
        }
        res.status(200).json(expert)
    } catch (error) {
        console.error("Error in getExpertById controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createExpert(req, res) {
    try {
        const { name, title, experienceYears, bio, image, socialLinks } = req.body
        
        if (!name) {
            return res.status(400).json({ message: "Name is required" })
        }

        const expert = new Expert({
            name,
            title,
            experienceYears,
            bio,
            image,
            socialLinks
        })

        const savedExpert = await expert.save()
        res.status(201).json(savedExpert)
    } catch (error) {
        console.error("Error in createExpert controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateExpert(req, res) {
    try {
        const { id } = req.params
        const updateData = req.body

        const expert = await Expert.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        )

        if (!expert) {
            return res.status(404).json({ message: "Expert not found" })
        }

        res.status(200).json(expert)
    } catch (error) {
        console.error("Error in updateExpert controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteExpert(req, res) {
    try {
        const { id } = req.params

        const expert = await Expert.findByIdAndDelete(id)

        if (!expert) {
            return res.status(404).json({ message: "Expert not found" })
        }

        res.status(200).json({ message: "Expert deleted successfully" })
    } catch (error) {
        console.error("Error in deleteExpert controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

