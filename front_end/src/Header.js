import React, {useState, useContext, useEffect} from "react";
import { AnchorEarn, CHAINS, NETWORKS, DENOMS } from '@anchor-protocol/anchor-earn';
import Axios from 'axios'
import { Extension } from '@terra-money/terra.js';
import { UserContext } from './UserContext'

const Header = () => {

    const [value, setValue] = useContext(UserContext);
    const [wallet, setWallet] = useState();
    const [ustBalance, setUSTBalance] = useState();

    const ext = new Extension();

    const connect = () => {
        ext.connect();
        ext.on("onConnect", setWallet);
    }

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

                setUSTBalance(balanceInfo.balances[0].account_balance)

                let addNewWallet = `http://localhost:5000/api/users`
                Axios.post(addNewWallet, {
                    wallet: value,
                    ustBalance: balanceInfo.balances[0].account_balance
                })

                let updateUSTBalance = `http://localhost:5000/api/users/${value}`
                console.log("UST BAL: ", ustBalance)
                Axios.patch(updateUSTBalance, {
                    ustBalance: ustBalance
                    
                })
            }

            fetchData(); 
        }
    }, [])



    return (
        <div className="header">
            <h1>Anchor Gold</h1>
            
                <button  onClick={wallet ? undefined : connect}>
                    {!wallet && "Connect Wallet"}
                    {wallet?.address}
                    {setValue(wallet?.address)}   
                </button>
                
        </div>
    )
}

export default Header; 
