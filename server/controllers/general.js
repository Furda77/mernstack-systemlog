import User from "../models/User.js";

//Slouží pro vložení ID, tento back-end slouží pouze jako demonstrace, jak uživatel bude fungovat s unikatním ID nebo např JWT tokenem.

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
