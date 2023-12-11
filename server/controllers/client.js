import SystemData from "../models/SystemData.js";

export const getSystemData = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {};

            // Pro seřazení createdAt políčkem
            if (sortParsed.field === "createdAt") {
                sortFormatted.createdAt = sortParsed.sort === "asc" ? 1 : -1;
            } else {
                sortFormatted[sortParsed.field] = sortParsed.sort === "asc" ? 1 : -1;
            }

            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const systemData = await SystemData.find({
            $or: [{ system_id: { $regex: new RegExp(search, "i") } }],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await SystemData.countDocuments({
            system_id: { $regex: search, $options: "i" },
        });

        res.status(200).json({
            systemData,
            total,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const insertSystemData = async (req, res) => {
    try {

        const newData = req.body;

        // Vložení dat do MongoDB pomocí Mongoose 
        const insertedData = await SystemData.create(newData);

        res.status(201).json(insertedData); // Odpověď s daty nebo zprávou 201 - úspěsné odeslání
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};