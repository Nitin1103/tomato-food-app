import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://nitin1103:12345@cluster0.qhacdpk.mongodb.net/food-del`).then(() => console.log('DB Connected'));
}