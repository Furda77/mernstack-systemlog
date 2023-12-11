import SystemData from "../models/SystemData.js";

//Data do grafu a dekonstrukce objektu který dostáveme od systemData.js
export const getOverview = async (req, res) => {
    try {
        console.log("Request made to getOverview");
        const overview = await SystemData.find({}, 'cpu_usage_percent number_of_processes');

        const formattedOverview = overview.map((dataPoint) => ({
            cpu_usage_percent: dataPoint.cpu_usage_percent,
            number_of_processes: dataPoint.number_of_processes,
        }));

        res.status(200).json(formattedOverview);
    } catch (error) {
        console.error("Error in getOverview:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};