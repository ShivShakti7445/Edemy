
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

// Connect DB (non-blocking for app startup)
connectDB().catch(err => console.error("Initial DB connect error:", err.message))

// Middlewares
app.use(cors())
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.use('/health-check', healthCheckRouter)
app.use('/api/educator', express.json(), educatorRouter)
app.post('/clerk', express.json(), clerkWebhooks) 
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// Error handling middleware to guarantee JSON responses with proper CORS
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err.stack || err.message || err)
    res.status(500).json({ success: false, message: err.message || "Internal Server Error" })
})

// Port & Server Listening (local dev)
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

// Export Express app for Vercel Serverless Functions
export default app




