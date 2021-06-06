import React, {useState, useContext} from 'react'
import {AnchorEarn, CHAINS, NETWORKS, DENOMS} from '@anchor-protocol/anchor-earn';
import { UserContext } from './UserContext'
import Axios from 'axios';


const Deposit = () => {

    
    const [value] = useContext(UserContext);
    const [amount, setAmount] = useState("0.00")
    const [status, setStatus] = useState(null)
    const [txFee, setTxFee] = useState(null)
    const [txdetails, setTxDetails] = useState(null)
    const [wallet_address, setWallet_address] = useState(null)

    const addDeposit = () => {

        if(value != null){
            const anchorEarn = new AnchorEarn({
                chain: CHAINS.TERRA,
                network: NETWORKS.TEQUILA_0004,
                address: value,
                mnemonic: 'road omit kangaroo region ketchup woman lawn dolphin drip erupt defense nurse orange timber write industry like boost regular intact ten artefact buyer sting'
            });

            async function depositData() {
                try { 
                    const deposit = await anchorEarn.deposit({
                        amount: amount, 
                        currency: DENOMS.UST,
                        log: (data) => {
                            console.log("THIS IS DATA" + data)
                        }
                    });

                    let addTransaction = `http://localhost:5000/api/users/${value}/transactions`
                    Axios.post(addTransaction, {
                        wallet: value,
                        transaction_type:"deposit",
                        amount: amount,
                        txHash: deposit.txDetails
                    })

                    console.log(deposit)
                    setStatus(deposit.status)
                    setTxFee(deposit.txFee)
                    setTxDetails(deposit.txDetails)
                    setAmount(0.00)
                
                } catch (e) {
                    alert(e)
                } finally {
                    
                    const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                    let updateUSTBalance = `http://localhost:5000/api/users/${value}`

                    Axios.patch(updateUSTBalance, {
                        ustBalance: balanceInfo.balances[0].account_balance
                    })
                }
            
            }
            depositData(); 
        }
    }

    const resetOnFocus = (e) => {
        e.target.value = '';
    }

    const resetOnBlur = (e) => {
        e.target.value = '';
    }

    return (
        <div>
        
            <input 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                onFocus={(e) => resetOnFocus(e)}
                onBlur={(e) => resetOnBlur(e)}
                ></input>
            
            <button onClick={addDeposit} >
                Deposit
            </button>
            <br />
            <div>{" Status: " + status} {"...."} {" Fee: " + txFee}{"...."} {" Fee: " + txdetails}</div>
            
        </div>
    )
}
export default Deposit;
