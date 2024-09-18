import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        // First, check the current status of the transaction
        const transaction = await db.onRampTransaction.findUnique({
            where: {
                token: paymentInformation.token
            }
        });

        if (!transaction || transaction.status !== "Processing") {
            return res.status(400).json({
                message: "Transaction is not in Processing state"
            });
        }

        // If the transaction is in Processing state, proceed with the validation
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Payment validated and captured"
        });
    } catch(e) {
        console.error(e);
        res.status(500).json({
            message: "Error while processing webhook"
        });
    }
});

app.listen(3003);