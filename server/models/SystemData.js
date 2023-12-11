import mongoose from "mongoose";

// Definuje mongoose schéma pro vložení do DB
const SystemDataScheme = new mongoose.Schema(
    {
        system_id: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },

        cpu_usage_percent: {
            type: Number,
            required: true
        },
        load_avg_1min: Number,
        load_avg_5min: Number,
        load_avg_15min: Number,
        logged_in_users: Number,
        uptime: String,
        memory_utilization_percent: Number,
        number_of_processes: Number
    },
    { timestamps: true }
);

// Vytváří Mongoose model na již definovaném schématu
const SystemData = mongoose.model("SystemData", SystemDataScheme);
export default SystemData;



