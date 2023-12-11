import mongoose from "mongoose";

// Definuje mongoose schéma pro vložení do DB
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        role: {
            type: String,
            enum: ["admin", "superadmin"],
            default: "admin",
        },
    },
    { timestamps: true }
);

// Vytváří Mongoose model na již definovaném schématu
const User = mongoose.model("User", UserSchema);
export default User;