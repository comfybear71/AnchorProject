import React, {useState, useContext} from 'react'
import {AnchorEarn, CHAINS, NETWORKS, DENOMS} from '@anchor-protocol/anchor-earn';
import { UserContext } from './UserContext'
import Axios from 'axios';


const Withdraw = () => {

    const [value] = useContext(UserContext);
    const [amount, setAmount] = useState("0.00")
    const [status, setStatus] = useState(null)
    const [txFee, setTxFee] = useState(null)

    const withdrawFunds = () => {
        
        if(value != null){
            const anchorEarn = new AnchorEarn({
                chain: CHAINS.TERRA,
                network: NETWORKS.TEQUILA_0004,
                address: value,
                mnemonic: 'road omit kangaroo region ketchup woman lawn dolphin drip erupt defense nurse orange timber write industry like boost regular intact ten artefact buyer sting'
            });

            async function withdrawData() {
                try {
                    const withdraw = await anchorEarn.withdraw({
                        amount: amount, 
                        currency: DENOMS.UST,
                        log: (data) => {
                            console.log("THIS IS DATA" + data)
                        }
                    });

                    let addTransaction = `http://localhost:5000/api/users/${value}/transactions`
                    Axios.post(addTransaction, {
                        wallet: value,
                        transaction_type:"withdraw",
                        amount: Math.abs(amount) * -1,
                        txHash: withdraw.txDetails
                    })

                    console.log(withdraw)
                    setStatus(withdraw.status)
                    setTxFee(withdraw.txFee)
                } catch (e) {
                    alert(e);
                } finally {
                    const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                    let updateUSTBalance = `http://localhost:5000/api/users/${value}`

                    Axios.patch(updateUSTBalance, {
                        ustBalance: balanceInfo.balances[0].account_balance
                    })
                }
            }
            withdrawData(); 
        }
    }
    const resetInput = (e) => {
        e.target.value = '';
    }

    const resetOnBlur = (e) => {
        e.target.value = '0.00';
    }

    return (
        <div>
            <input 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                onFocus={(e) => resetInput(e)} 
                onBlur={(e) => resetOnBlur(e)}></input>
            
            <button onClick={withdrawFunds}>
                Withdraw  
            </button>
            <br />
            <div>{" Status: " + status} {"...."} {" Fee: " + txFee}</div>
        </div>
    )
}
export default Withdraw;

