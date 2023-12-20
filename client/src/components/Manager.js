import React, { useState, useEffect } from "react";
const Manager = ({ state }) => {
  const [account, setAccount] = useState("");
  const [cbalance, setCbalance] = useState(0);
  const [lwinner, setLwinner] = useState("No winner yet");

  // on changing account in metamask in connected account it was not updating so using this
//this is provided by meta mask wallet
  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };
  // useeffect used to get the connected account
  useEffect(() => {
    // it is a async because it will deal with promises
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      setAccountListener(web3.givenProvider);//calling setAccountListener here
      setAccount(accounts[0]);
    };
     ///calling getAccount only when we have web3 instance i.e state.web3
    state.web3 && getAccount();
  }, [state, state.web3]);

  //to fetch contract balance
  const contractBalance = async () => { //to fetch contract balance
    const { contract } = state;
    try {
      // fetching getBalance function from lottery.sol
      const balance = await contract.methods
        .getBalance()
        .call({ from: account });
      console.log(balance);
      setCbalance(balance);
    } catch (e) {
      setCbalance("You are not the manager");
    }
  };

  // winner
  const winner = async () => {
    const { contract } = state;
    try {
       // calling selectWinner from the lottery.sol
    //it will change our blockchain so we are using send here
      await contract.methods.pickWinner().send({ from: account });
      //calling winner function from lottery.sol
      const lotteryWinner = await contract.methods.winner().call();
      console.log(lotteryWinner);
      setLwinner(lotteryWinner);
    } catch (e) {
      //there will be two errors as seen in lottery.sol as there are two require statements
      if (e.message.includes("You are not the manager")) {
        setLwinner("You are not the manager");
      } else if (e.message.includes("Players are less than 3")) {
        setLwinner("There are less than 3 players");
      } else {
        setLwinner("No winner yett");
      }
    }
  };
  return (
    <div className="py-4 px-5">

<div className="text-white text-capitalize fs-5 ">
connected account : <span className="text-warning">{account}</span>
<br/><br/>
winner: <span className="text-warning">{lwinner}</span>&emsp;

<br/><br/>
contract Balance:<span className="text-warning"> {cbalance}</span> 
<br/><br/>
<div className="d-flex justify-content-evenly ">
<button onClick={contractBalance} className="border border-info rounded-pill bg-dark text-white text-capitalize p-2">click for balance</button>
<button onClick={winner} className="border border-info rounded-pill bg-dark text-white text-capitalize p-2">click for winner</button>
</div>
</div>
</div>
  );
};

export default Manager;
