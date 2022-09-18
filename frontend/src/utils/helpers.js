/* eslint-disable no-implied-eval */
/* eslint-disable react-hooks/rules-of-hooks */
import {ethers} from "ethers";
import { toaster } from "evergreen-ui";
import { legacyAddress, legacyAbi } from "./contract";

export async function addTokens(tokens) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
  try {
    console.log(tokens);
    // Add tokens to Legacy
    const tx = await legacy.addTokens(tokens);
    // await tx.wait();
    return true
  } catch (error) {
    console.log(error);
    toaster.danger("An error occured!");
    return false;
  }
}

export async function createLegacy(legatee, checkInterval) {
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
    const tx = await legacy.create(legatee, checkInterval);
    // await tx.wait();
    return true;
  } catch (err) {
    console.log(err)
    toaster.danger('Could not create legacy');
    return false
  }
}

export const hasLegacy = async(address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const legacy = new ethers.Contract(legacyAddress, legacyAbi, provider);
  const legacyIndex = Number(await legacy.legacyIndexes(address));
  if (legacyIndex == 0) {
    return false;
  } else {
    return true;
  }
}

export async function connect() {
  if(window.confirm("Are you sure you want to connect your wallet. This would let Legacy see your wallet address and account balance")) {
    const accounts = await window.ethereum
      .request({ method: 'eth_requestAccounts' })
      localStorage.removeItem('isDisconnected')
      return accounts[0];
  }
}


export const disconnect = () => {
  localStorage.setItem("isDisconnected", "true");
}

export const isDisconnected = () => {
  if (localStorage.getItem('isDisconnected')) {
    return true
  } else {
    return false
  }
}

export async function checkConnection() {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
  } catch (error) {
    console.log(error)
  }
}

const getUserInterval = async(getUser, setLegatee, setLastSeen, setInterval) => {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
          console.log(legacy);
          //TODO
          //Display loader
          const index = await legacy.legacyIndexes(await checkConnection());
            const res = await legacy.legacies(Number(index))
              console.log(res)
              const legatee = res[1];
              //Convert lastSeen to minutes (just for the sake of demo)
              let ls = Math.floor( ((Number(new Date()) / 1000) - Number(res[2])) / (3600 * 24) );
              const lastSeen = ls == 0 ? "Today" : `${ls} days ago`;
              //Convert checkInterval to seconds (just for the sake of demo)
              const secs = Number(res[3]);
              const intervalMins = Math.floor(secs / (3600 * 24));
              const interval = `Every ${intervalMins} days`;
              return {legatee, lastSeen, interval};
        } catch (error) {
          toaster.danger('An error occured!')
          return;
        }
};

export default getUserInterval;