import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bookRoute from './routes/book.route.js'
const app = express()

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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})