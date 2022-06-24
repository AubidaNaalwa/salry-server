import mongoose  from "mongoose";

export type Ticket = { 
    porpuse: string;
    total: number;
    description?: string;
    email: string;
}

const tecketSchema = new mongoose.Schema<Ticket>({
    porpuse: { type: String, required: true },
    total: { type: Number, required: true },
    email: { type: String, required: true },
    description: { type: String, required: false },
}, { 
    timestamps: true
  } );

export default mongoose.model("tecket", tecketSchema);