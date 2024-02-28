import { useEffect, useState } from "react";
import IDataList from "../model/IDataList";
import { getDataFromServer } from "../service/menu";
import ExpenseTracker from "./expenseTracker";
import PaymentDetails from "./PaymentDetails";


function ShowList () {
    const [items, setItems] = useState<IDataList[]>([]);
    const [ showForm, setShowForm ] = useState<boolean>(false)

    useEffect (
        () => {
            const fetchMenu = async () => {
                try {
                    const data = await getDataFromServer();
                    setItems( data )
                }catch(error) {
                    console.error('Error fetching data', error)
                }
            };
            fetchMenu();
        }, [showForm] 
    );

    const success = () => {
        setShowForm(false)
    }
    const cancel = () => {
        setShowForm(false)
    }

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {showForm&&(
                <div className="form">
                    <ExpenseTracker onTrue={success} onClose={cancel} ></ExpenseTracker>
                </div>
            )}
             
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchase</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color">Payee</div>
                
            </>
            {
                items &&
                items.map(
                    (user, idx) => (
                        <div key={idx}>
                            <div className="use-inline date">{user.setDate}</div>
                            <div className="use-inline">{user.product}</div>
                            <div className="use-inline price">{user.price}</div>
                            <div className="use-inline">{user.payeeName}</div>
                        </div>
                    )
                )
            }
            <hr />
            <PaymentDetails items={items} />
        
        </>
    )
};

export default ShowList;