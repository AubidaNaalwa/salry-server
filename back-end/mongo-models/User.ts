import mongoose  from "mongoose";

type User = { 
    first_name: string ;
    last_name: string ;
    email: string ;
    password: string ;
    token: string ;
}

const userSchema = new mongoose.Schema<User>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true , required: true },
  password: { type: String, required: true },
  token: { type: String },
}, { 
  timestamps: true
});

export default mongoose.model("user", userSchema);