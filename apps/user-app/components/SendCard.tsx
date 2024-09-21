"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false); // For loading state
    const [status, setStatus] = useState(""); // For success/failure message

    const handleSend = async () => {
        setLoading(true);
        setStatus(""); // Reset status message

        try {
            await p2pTransfer(number, Number(amount) * 100);
            setStatus("Money sent successfully!");
            setAmount(""); // Clear the amount field after successful transfer
        } catch (error) {
            setStatus("Failed to send money. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder={"Number"}
                            label="Number"
                            value={number}
                            onChange={(value) => setNumber(value)}
                        />
                        <TextInput
                            placeholder={"Amount"}
                            label="Amount"
                            value={amount} // Control the value of the amount input
                            onChange={(value) => setAmount(value)} // Update amount when the user types
                        />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSend} disabled={loading}>
                                {loading ? "Sending..." : "Send"}
                            </Button>
                        </div>
                        {status && (
                            <div className={`pt-4 text-center ${status.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                                {status}
                            </div>
                        )}
                    </div>
                </Card>
            </Center>
        </div>
    );
}
