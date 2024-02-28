import React from 'react';
import IDataList from '../model/IDataList';

type PaymentDetailsProps = {
    items: IDataList[];
};

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ items }) => {
    const calculateTotalSpent = (items: IDataList[]) => {
        return items.reduce((total, item) => total + item.price, 0);
    };

    const calculateIndividualSpendings = (items: IDataList[]) => {
        const spendings: Record<string, number> = {};
        items.forEach(item => {
            if (spendings[item.payeeName]) {
                spendings[item.payeeName] += item.price;
            } else {
                spendings[item.payeeName] = item.price;
            }
        });
        return spendings;
    };

    const determinePaymentDetails = () => {
        const totalSpent = calculateTotalSpent(items);
        const individualSpendings = calculateIndividualSpendings(items);

        const paymentDetails: Record<string, Record<string, number>> = {};

        Object.keys(individualSpendings).forEach(payeeA => {
            Object.keys(individualSpendings).forEach(payeeB => {
                if (payeeA !== payeeB) {
                    const amountOwed =
                        individualSpendings[payeeB] -
                        totalSpent / Object.keys(individualSpendings).length;

                    if (amountOwed > 0) {
                        paymentDetails[payeeA] = {
                            ...paymentDetails[payeeA],
                            [payeeB]: amountOwed,
                        };
                    }
                }
            });
        });

        return paymentDetails;
    };

    const paymentDetails = determinePaymentDetails();
    const totalSpent = calculateTotalSpent(items);
    const individualSpendings = calculateIndividualSpendings(items);

    return (
        <div>           
            <span className='use-inline'>Total: </span> <span className='total'>{totalSpent}</span> <br />
            {Object.keys(individualSpendings).map(payee => (
                <div key={payee} >
                    <span className='use-inline'>{payee} Paid:</span> <span className='paid'> {individualSpendings[payee]}</span>
                </div>
            ))}
            {Object.keys(paymentDetails).map(payeeA => (
                <div key={payeeA}>
                    {Object.keys(paymentDetails[payeeA]).map(payeeB => (
                        <div key={payeeB}>
                           <span className='use-pay'> Pay {payeeB}:</span> <span className='pay'>{paymentDetails[payeeA][payeeB]}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PaymentDetails;
