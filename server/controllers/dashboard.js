import User from "../models/User.js";
import SystemData from "../models/SystemData.js"

export const getDashboardData = async (req, res) => {
    try {
        // Celkový počet uživatelů "správců" v databázi (dále jen DB)
        const totalUsers = await User.countDocuments();

        // Celkový počet záznamů v DB
        const totalLogs = await SystemData.countDocuments();

        // Nejnovější záznam v DB
        const newestLog = await SystemData.findOne().sort({ createdAt: -1 }).select('createdAt');

        const newestLogCreatedAt = newestLog
            ? new Date(newestLog.createdAt).toLocaleString()
            : null;

        // Slouží pro generování počtu zařízení na základě system_id + nastavení parametru pro nepočítání opakujících se system_id "string".
        const distinctSystems = await SystemData.aggregate([
            { $group: { _id: "$system_id" } },
            { $count: "distinctSystemCount" }
        ]);

        const distinctSystemCount = distinctSystems.length > 0 ? distinctSystems[0].distinctSystemCount : 0;

        // Slouží generování tabulky na hlavním panelu.
        const systemdata = await SystemData.find()
            .limit(50)
            .sort({ createdOn: -1 });

        // Odpoveď 
        res.json({
            totalUsers,
            totalLogs,
            newestLogCreatedAt,
            distinctSystemCount,
            systemdata
        });
    } catch (error) {
        console.error('Dashboard Data Error:', error);
        res.status(500).send('Server error');
    }
}