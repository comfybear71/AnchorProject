import React, {useState} from 'react'
import Axios from 'axios';

function App() {

    let overallDeposits = "http://localhost:5000/api/transactions_where/deposit"
    let overallWithdraws = "http://localhost:5000/api/transactions_where/withdraw"
    let overallPurchases = "http://localhost:5000/api/transactions_where/purchase"

    const request1 = Axios.get(overallDeposits)
    const request2 = Axios.get(overallWithdraws)
    const request3 = Axios.get(overallPurchases)

    Axios.all([request1, request2, request3]).then(Axios.spread((...responses)=> {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        const responesThree = responses[2]

        console.log("\n",
        "DEPOSITS",  responseOne.data[0]["sum(`amount`)"], "\n",
        "WITHDRAWS", responseTwo.data[0]["sum(`amount`)"], "\n",
        "PURCHASE", responesThree.data[0]["sum(`amount`)"])
    }))



    const Deposit = (e) => {
        e.preventDefault();
        const [wallet] = useState('terra19numtnjxeawhgvd4669f3l3ttmzs52eaa0ggt2')

        let addTransaction = `http://localhost:5000/api/users/${wallet}/transactions`

        Axios.post(addTransaction, {
            wallet:"terra19numtnjxeawhgvd4669f3l3ttmzs52eaa0ggt1",
            transaction_type:"deposit",
            amount:1000,
            txHash:"awfhkajsdfkajnsdckascdnaksdcsdfasdfasdfjnakjsdcnkajdsc"
        })
    }

    const Withdraw = (e) => {
        e.preventDefault();
        const [wallet] = useState('terra19numtnjxeawhgvd4669f3l3ttmzs52eaa0ggt2')

        let addTransaction = `http://localhost:5000/api/users/${wallet}/transactions`

        Axios.post(addTransaction, {
            wallet:"terra19numtnjxeawhgvd4669f3l3ttmzs52eaa0ggt1",
            transaction_type:"withdraw",
            amount:-500,
            txHash:"awfhkajsdfkajnsdckascdnaksdcsdfasdfasdfjnakjsdcnkajdsc"
        })
    }

    const Purchase = (e) => {
        e.preventDefault();
        const [wallet] = useState('terra19numtnjxeawhgvd4669f3l3ttmzs52eaa0ggt2')

        let addTransaction = `http://localhost:5000/api/users/${wallet}/transactions`

        Axios.post(addTransaction, {
            wallet:"terra19numtnjxeawhgvd4669f3l3ttmzs52eaa0ggt1",
            transaction_type:"purchase",
            amount:-100,
            txHash:"awfhkajsdfkajnsdckascdnaksdcsdfasdfasdfjnakjsdcnkajdsc"
        })
    }




    return (
        <div className="App">
            <div><button onClick={ (e) => {Deposit(e) }}>Deposit</button></div>
            <div><button onClick={ (e) => {Withdraw(e) }}>Withdraw</button></div>
            <div><button onClick={ (e) => {Purchase(e) }}>Purchase</button></div>
        </div>
    );
}

export default App;
