import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PTransactions } from "../../../components/P2PTransactions";

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        },
        orderBy: {
            timestamp: 'desc'
        },
        take: 5 // Limit to the 5 most recent transactions
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount
    }));
}

export default async function SendMoneyPage() {
    const transactions = await getP2PTransactions();

    return (
        <div className="w-full space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Send Money</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SendCard />
                <P2PTransactions transactions={transactions} />
            </div>
        </div>
    );
}