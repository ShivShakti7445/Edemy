
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'
import healthCheckRouter from './routes/healthCheckRoute.js'

// Initialize Express
const app = express()

// Connect to database
await connectDB()
// await cloudinary()

// Middlewares
app.use(cors())
app.use(clerkMiddleware())

//route
app.get('/', (req, res) => res.send("API Working"))
app.use('/health-check', healthCheckRouter)
app.use('/api/educator', express.json(), educatorRouter)
app.post('/clerk', express.json() , clerkWebhooks) 
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

