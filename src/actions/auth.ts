'use server'

import { connectDB } from "@/lib/mongodb"; 
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Register user
export async function registerUser(email: string, password: string) {
    try {
        await connectDB();

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            email,
            password: hashedPassword
        });
        
        await user.save();
        const token: string = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "3h" });
        
        const plainUser = {
            id: user._id.toString(),
            email: user.email
        }
        
        return { plainUser, token };
        
    } catch (error) {
        console.log("error", error)
        throw new Error("Database connection failed");
    }
}

// Login user
export async function loginUser(email: string, password: string) {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "3h" });
    const plainUser = {
        id: user._id.toString(),
        email: user.email
    }

    return { plainUser, token };
}

// Delete user
export async function deleteUser(email: string) {
    await connectDB();

    const user = await User.findOneAndDelete({ email });

    if (!user) {
        throw new Error("User not found");
    }

    return { message: "User deleted successfully" };
}