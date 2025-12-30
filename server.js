import express from "express";
import axios from "axios";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieparser from "cookie-parser";
import User from "./usermodel.js"; 
import connectDB from "./db.js";  
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();
app.use(cookieparser());
app.use(cors({
      origin: "http://localhost:5173", // frontend URL
    credentials: true,               // allow cookies

}));

app.use(express.json());




app.get("/image", async (req, res) => {
  const { prompt } = req.query;
         console.log(prompt);
         
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    // URL encode the prompt
    let encodedPrompt = encodeURIComponent(prompt);
        encodedPrompt=encodedPrompt+` ${Math.floor(Math.random()*10000)}`
    // Pollinations free image generation endpoint
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

    // Send JSON with image URL to frontend
    res.json({ image: imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});













app.post("/Chat", async (req, res) => {
  try {
    const inp = req.body.inp;
    const resp = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.API_KEY}`,
      {
        contents: [{ parts: [{ text: inp }] }],
      }
    );
    res.json(resp.data.candidates[0].content.parts[0].text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat request failed" });
  }
});



app.post("/signup", async (req, res) => {
 try {
    const { name, email, password } = req.body;
console.log();

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Response (NO token here)
    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        fullName: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }

});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4. Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,     
      secure: false,
      sameSite: "lax",             
      maxAge: 60 * 60 * 1000,         
    });

    // 5. Send response (no token in body)
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/verify",(req,res)=>{
    try{const token =req.cookies.token
    if(!token){
         return
      res.status(401).json({
        message:"Not Authorized"
      })
    }
  
    const decode =jwt.verify(token,process.env.JWT_SECRET)
    res.status(200).json({
      email: decode.email
    })
  


  }catch(err){
        return
      res.status(401).json({ message:"Token expired"})
         
  }
})


app.post("/logout",(req,res)=>{
    
    
  try{
     const token= req.cookies.token
      
       
    if(!token){
      return res.status(402).json({ message:"Not Found"})
      }
      
   res.clearCookie("token",{
   httpOnly:true,
   sameSite:"lax",
   secure: false,
   path:"/"
   })

 res.status(200).json({message:"Logged Out"})


  }catch(err){
    return res.status(401).json({ message:"Internal Server"})
  }
})











app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ Server running on port ${process.env.PORT || 3000}`);
});
