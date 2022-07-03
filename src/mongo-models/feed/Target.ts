import mongoose  from "mongoose";

type Target = { 
    month: number;
    year: number;
    targetMoney: number;
    usedMoney: number;
    balance: number;
    email: string;
}

const targetSchema = new mongoose.Schema<Target>({
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    targetMoney: { type: Number, required: true },
    usedMoney: { type: Number, required: true },
    balance: { type: Number, required: true },
    email: { type: String, required: true }
}, { 
  timestamps: true
});

export default mongoose.model("target", targetSchema);