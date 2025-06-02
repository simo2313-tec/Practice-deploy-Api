const express = require ("express")
const cors = require("cors")
const dotenv = require('dotenv') 
dotenv.config() 
// console.log('Environment Variables:', process.env);
const stripe = require("stripe")(process.env.STRIPE_KEY);



const app = express();

// setGlobalOptions({maxInstances: 10});

app.use(cors({origin: true}));

app.use(express.json());

app.get("/", (req, res) => {

    res.status(200).json({
        
        message: "Success !",
    });
});

app.post("/payment/create", async(req, res) => {

    const total = req.query.total;
//    console.log("total: " + total);
    if(total > 0) {
        // console.log("payment recived", total);
        // res.send(total)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "USD"
        })
        // console.log("paymentIntent")
        res.status(201).json({

            clientSecret: paymentIntent.client_secret,
        });
    }else {
        res.status(401).json({

            message: "total must be grater than 0", 
        });
    }
});

app.listen(3000, (err) =>{
    if(err) throw err
    console.log("Amazon Server Running on Port: 3000, http://localhost:3000");
})
// exports.api = onRequest(app);