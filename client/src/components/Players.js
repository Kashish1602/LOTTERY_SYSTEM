import React, { useEffect, useState } from "react";
const Players = ({ state, address }) => {
  const [account, setAccount] = useState("No account connected");
  const [registerdPlayers, setRegisterdPlayers] = useState([]);
  // used to see the address of participants as soon as possible
  const [reload, setReload] = useState(false);
  const reloadEffect = () => {
    setReload(!reload);
  };

// on changing account in metamask in connected account it was not updating so using this
//this is provided by meta mask wallet
  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };

  // to show connected accounts i.e manager account 
// used useEffect not a simple function because over here we have to fetch a account from web3 
  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      setAccountListener(web3.givenProvider); //calling setAccountListener here

      setAccount(accounts[0]);
    };
    //calling getAccouts only when we have web3 instance i.e state.web3
    state.web3 && getAccount();
  }, [state, state.web3]);

  // responsible for our registered players
//again used useEffect not a function bcz there can be diff. ganache account so simple function can't be used
  useEffect(() => {
    const getPlayers = async () => {
      const { contract } = state;
      //  calling allplayers from lottery.sol
      const players = await contract.methods.allPlayers().call();
      const registerdPlayers = await Promise.all(
        players.map((player) => {
          return player;
        })
      );

      console.log(registerdPlayers);
      setRegisterdPlayers(registerdPlayers);
      reloadEffect();  /// calling reloadEffect here
    };
    //calling getPlayer only when we have contract instance i.e state.contract
    state.contract && getPlayers();
  }, [state, state.contract, reload]);
  return (
    <>
    <div className="py-4 px-5">
    <div className="text-white text-capitalize fs-5 ">
    connected account : <span className="text-warning">{account}</span>
    <br/>
    <div className=" text-wrap text-info fs-5">
    Pay 1 eth to this address : </div><span className="text-warning">{address}</span>
    <br/>
    registered players :<br/>
    <span className="text-warning">{registerdPlayers.length!==0 && registerdPlayers.map((n)=><p key={n}>{n}</p>)} </span>
    </div>
    </div>
    </>
  );
};
export default Players;
