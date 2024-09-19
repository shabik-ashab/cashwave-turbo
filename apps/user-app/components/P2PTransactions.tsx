import React from 'react';
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";

interface P2PTransaction {
    time: Date;
    amount: number;
}

interface P2PTransactionsProps {
    transactions: P2PTransaction[];
}

export const P2PTransactions: React.FC<P2PTransactionsProps> = ({ transactions }) => {
    if (!transactions.length) {
        return (
            <Center>
                <Card title="Recent P2P Transactions">
                    <div className="text-center pb-8 pt-8">
                        No Recent P2P transactions
                    </div>
                </Card>
            </Center>
        );
    }

    return (
        <Center>
            <Card title="Recent P2P Transactions">
                <div className="pt-2">
                    {transactions.map((t, index) => (
                        <div key={index} className="flex justify-between">
                            <div>
                                <div className="text-sm">Sent BDT</div>
                                <div className="text-slate-600 text-xs">
                                    {t.time.toDateString()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                - TK {t.amount / 100}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </Center>
    );
};