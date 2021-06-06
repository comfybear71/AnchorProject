import React, { useEffect, useContext, useState } from 'react'
import Axios from 'axios'
import { AnchorEarn, CHAINS, NETWORKS, DENOMS } from '@anchor-protocol/anchor-earn';
import { UserContext } from './UserContext';
import { InfoContext } from './InfoContext';

const AnchorEarnConnect = () => {
    const [value] = useContext(UserContext);
    const [info, setInfo] = useContext(InfoContext);
    const [interestEarningBalance, setInterestEarningBalance] = useState(0)

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

        setInterestEarningBalance(responseOne.data[0]["sum(`amount`)"] + responseTwo.data[0]["sum(`amount`)"] + responesThree.data[0]["sum(`amount`)"])

    }))


    useEffect(() => {
        if(value != null){
            const anchorEarn = new AnchorEarn({
                name: "testnet",
                chain: CHAINS.TERRA,
                network: NETWORKS.TEQUILA_0004,
                address: value
            });

            async function fetchData() {
                const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                const market = await anchorEarn.market({ currencies: [ DENOMS.UST ] });

                // console.log(balanceInfo)
                // console.log(market)
                
                setInfo({
                    balance: balanceInfo.balances[0].account_balance,
                    deposit: balanceInfo.balances[0].deposit_balance,
                    height: balanceInfo.height,
                    liquidity: market.markets[0].liquidity,
                    APY: market.markets[0].APY
                
                })
            }
            
            // async function fetchAUSTBalance() {
            //     const aBalanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.AUST ] });
            //     console.log(aBalanceInfo)
            // }
            
            fetchData(); 
            // fetchAUSTBalance();
        }
    })

    return (
        <div>
            <h1>UST Balance: {info.balance}</h1>
            <h1>Deposited into Anchor Gold: {info.deposit}</h1>
            
            <h1>Rewards Earned: {info.deposit - interestEarningBalance}</h1>
            <h1>Height: {info.height}</h1>
            <br />
            <h1>Liquidity: {info.liquidity}</h1>
            <h1>APY: {info.APY}</h1>
        </div>
    )

}

export default AnchorEarnConnect;