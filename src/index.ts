import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/v1/user.route';
import postRouter from './routes/v1/post.route';

dotenv.config(); // Load .env

const app = express();
const PORT = process.env.PORT || 3000;

// Add middleware to parse JSON request bodies
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);
app.get("/",(req,res)=>{
 res.json({message:"Hello"})
})
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
