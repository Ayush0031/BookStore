import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bookRoute from './routes/book.route.js'
import userRoute from './routes/user.route.js'
import contactRoute from './routes/contact.route.js'
import cartRoute from './routes/cart.route.js'
import orderRoute from './routes/order.route.js'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()
const PORT = process.env.PORT || 4000
const URI=   process.env.MongoDBURI;
//connecting to mongodb
try {
    mongoose.connect(URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log("Connected to MongoDB")
} catch (error) {
    console.log("Error",error)
}

app.get('/', (req, res) => {
  res.send('Mern project!')
})
app.use("/book",bookRoute);
app.use("/user",userRoute);
app.use("/contact",contactRoute);
app.use("/cart",cartRoute);
app.use("/order",orderRoute)
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})