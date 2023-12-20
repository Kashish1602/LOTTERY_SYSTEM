import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";  ///used to connect metamask with web3
import Lottery from "./contracts/Lottery.json";
import Welcome from "./components/Welcome";
import Manager from "./components/Manager";
import Players from "./components/Players";
import Intro from "./components/Intro";
import { Routes, Route, NavLink } from "react-router-dom";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [address, setAddress] = useState(null);// writtned bcz we need to show contract address

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = Lottery.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );
        setAddress(deployedNetwork.address);// because we need address of our contract so we writtened this
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  return ( 
    <>
  <ul className=" nav justify-content-evenly">
  <li className="nav-item my-4 rounded-pill">
    <NavLink className="nav-link text-warning fs-3 text-uppercase" to="/">getbet.co</NavLink>
  </li>
  <li className="nav-item my-4 rounded-pill">
    <NavLink className="nav-link text-warning fs-3 text-uppercase" to="/intro">up-home</NavLink>
  </li>
  <li className="nav-item my-4 my-2 rounded-pill">
    <NavLink className="nav-link text-warning fs-3 px-5 text-uppercase" to="/manager">Manager</NavLink>
  </li>
  <li className="nav-item my-4  my-2  rounded-pill">
    <NavLink className="nav-link text-warning fs-3 px-5 text-uppercase" to="/players">Players</NavLink>
  </li>
 
</ul>
  <div style={{width:"100%", height:"638px"}}>
   <div className="d-flex justify-content-center align-items-center h-100">
     <div className="border border-3 border-info rounded-pill text-center w-50">

    <Routes>
      <Route path="/" element={<Welcome/>}/> 
      <Route path="/intro"  element={<Intro/>}/>
      <Route path="/manager" element={<Manager state={state}/>}/>
      <Route path="/players" element={<Players state={state} address={address}/>}/>
     </Routes>
     </div>
     </div>
     </div>
     
     </>



  );
};
export default App;
