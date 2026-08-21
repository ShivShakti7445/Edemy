import { Webhook } from "svix";
import User from "../models/User.js";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";
import Stripe from "stripe";

export const clerkWebhooks = async (req, res) => {
    try {
    // Create a Svix instance with clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    
    // Verifying Headers
    await whook.verify(JSON.stringify(req.body), {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"]
      })

    // Getting Data from request body
    const { data, type } = req.body

    // Switch Cases for differernt Events
    switch (type) {
        case 'user.created': {
          const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            name: data.first_name + " " + data.last_name,
            imageUrl: data.image_url,
            resume: ''
          }
          await User.create(userData)
          res.json({})
          break;
        }
  
        case 'user.updated': {
          const userData = {
            email: data.email_addresses[0].email_address,
            name: data.first_name + " " + data.last_name,
            imageUrl: data.image_url,
          }
          await User.findByIdAndUpdate(data.id, userData)
          res.json({})
          break;
        }
  
        case 'user.deleted': {
          await User.findByIdAndDelete(data.id)
          res.json({})
          break;
        }
        default:
          
          break;
      }
    }catch(error){
        res.status(500).json({ success: false, message: error.message })
    }
}



// Helper to complete a purchase and enroll student safely
export const completePurchase = async (purchaseId) => {
    try {
        const purchaseData = await Purchase.findById(purchaseId);
        if (!purchaseData) return false;

        const userData = await User.findById(purchaseData.userId);
        const courseData = await Course.findById(purchaseData.courseId);

        if (!userData || !courseData) return false;

        const userIdStr = userData._id.toString();
        if (!courseData.enrolledStudents.includes(userIdStr)) {
            courseData.enrolledStudents.push(userIdStr);
            await courseData.save();
        }

        const courseIdStr = courseData._id.toString();
        if (!userData.enrolledCourses.some(id => id.toString() === courseIdStr)) {
            userData.enrolledCourses.push(courseData._id);
            await userData.save();
        }

        purchaseData.status = 'completed';
        await purchaseData.save();
        return true;
    } catch (error) {
        console.error('Error completing purchase:', error);
        return false;
    }
};

// Stripe Gateway Initialize
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

// Stripe Webhooks to Manage Payments Action
export const stripeWebhooks = async (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  }
  catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const { purchaseId } = session.metadata || {};
      if (purchaseId) {
        await completePurchase(purchaseId);
      }
      break;
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      if (session.data[0]?.metadata?.purchaseId) {
        await completePurchase(session.data[0].metadata.purchaseId);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      if (session.data[0]?.metadata?.purchaseId) {
        const purchaseData = await Purchase.findById(session.data[0].metadata.purchaseId);
        if (purchaseData) {
          purchaseData.status = 'failed';
          await purchaseData.save();
        }
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
}