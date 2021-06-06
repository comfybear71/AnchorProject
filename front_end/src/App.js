import Axios from 'axios';

function App() {

  // Axios ({
  //   methods: "GET",
  //   url: "http://localhost:5000/api/transactions_where/deposit",
  //   //url: "http://localhost:5000/api/wallet_balance/terra19numtnjxeawhgvd4669f3l3ttmzs52eaa0ggt1",
  //   headers: { 
  //     "Content-Type": "application/json"
  //   }
  // }).then(res => {
  //   // console.log( res.data[0]["sum(`amount`)"]);
  // })


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
      "WITHDRAWS",responseTwo.data[0]["sum(`amount`)"], "\n",
      "PURCHASE",responesThree.data[0]["sum(`amount`)"])
  }))


  // request1.then(res => {
  //   console.log('ALL DEPOSITS', res.data[0]["sum(`amount`)"])
  // }).catch(err => {
  //   console.err(err)
  // })















  return (
    <div className="App">
    </div>
  );
}

export default App;
