import express from "express"
import cors from "cors"
import Stripe from "stripe"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.use(cors())
app.use(express.json())

app.post("/create-checkout-session", async(req, res) => {
    try {
        const {
            title,

            price,
            eventId,
            userId,
            userEmail,
        } = req.body

        if (!title || !price) {
            return res.status(400).json({
                error: "Missing title or price",
            })
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            mode: "payment",

            line_items: [{
                price_data: {
                    currency: "usd",

                    product_data: {
                        name: title,
                    },

                    unit_amount: price * 100,
                },

                quantity: 1,
            }, ],

            success_url: "http://localhost:5173/paymentSuccess?session_id={CHECKOUT_SESSION_ID}",

            cancel_url: "http://localhost:5173/paymentFailed",

            metadata: {

                eventId,
                userId,
                userEmail,
            },
        })

        res.json({
            url: session.url,
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: error.message,
        })
    }
})

app.get("/checkout-session/:id", async(req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(
            req.params.id
        )

        res.json(session)

    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: error.message,
        })
    }
})

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})