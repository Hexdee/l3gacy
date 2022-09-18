import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import logo from "../../src/assets/icons/logo.svg";
import { close, hamburger } from "../assets/svgs/svg";
import CustomButton from "../common/CustomButton";
import { toaster } from "evergreen-ui";
import {connect as connectWallet,
  checkConnection,
  disconnect as disconnectWallet,
  isDisconnected} from "../utils/helpers.js"

const Navbar = () => {
  const [openNavBar, setOpenNavBar] = useState(false);
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const disconnect = () => {
    disconnectWallet();
    setIsConnected(false);
  }
  
  const connect = async() => {
    try {
        setUser(await connectWallet());
        setIsConnected(true);
    } catch (err) {
      setIsConnected(false);
      console.log(err)
    }
  }

  useEffect(() => {
    try {
      if(!isDisconnected()) {
        checkConnection().then((account) => {
          if (account) {
            setIsConnected(true)
            setUser(account);
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }, [])


//   // detect provider using @metamask/detect-provider
// detectEthereumProvider().then((provider) => {
//   if (provider && provider.isMetaMask) {
//     provider.on('accountsChanged', handleAccountsChanged);
//     // connect btn is initially disabled
//     $('#connect-btn').addEventListener('click', connect);
//     checkConnection();
//   } else {
//     console.log('Please install MetaMask!');
//   }
// });


//   const getUser = async() => {
//     if(window.ethereum) {
//       const account = await window.ethereum.request({ method: 'eth_requestAccounts'})
//     }
//   }

//   useEffect(() => {
//     setUser(getUser);
// }, [user]);


  // const connect = async () => {
  //   setIsLoading(true);
  //   try {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       await provider.send("eth_requestAccounts", []);
  //       const signer = await provider.getSigner();
  //       const address = await signer.getAddress();
  //       localStorage.setItem('legacy_user', address);
  //       setUser(address);
  //       setIsLoading(false);
  //   } catch(error) {
  //       console.log(error);
  //       toaster.danger("An error occured!");
  //       setIsLoading(false);
  //   }
// }
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        display={{ base: "block", lg: "flex" }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-around"
          display={{ base: "none", lg: "flex" }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Link to="/">
              <Image w={{ base: "40px", lg: "60px" }} src={logo} alt="logo" />
            </Link>
            <Box
              onClick={() => setOpenNavBar(!openNavBar)}
              display={{ base: "block", lg: "none" }}
            >
              {openNavBar ? close : hamburger}
            </Box>
          </Flex>
          <Text
            cursor="pointer"
            ml={{ base: "0", lg: "100px" }}
            mt={{ base: "20px", lg: "0" }}
            _hover={{ color: "brand.teal" }}
            color="brand.white"
          >
            About us
          </Text>
          <Text
            cursor="pointer"
            mt={{ base: "20px", lg: "0" }}
            ml={{ base: "0", lg: "100px" }}
            _hover={{ color: "brand.teal" }}
            color="brand.white"
          >
            How it works
          </Text>
        </Flex>
        { isConnected ?
            <CustomButton
            bg="brand.teal"
            color="brand.white"
            mt={{ base: "20px", lg: "0" }}
            d={{ base: "none", lg: "flex" }}
            hoverColor="brand.primary"
            onClick={disconnect}
            >
            Disconnect
            </CustomButton>
            :
            <CustomButton bg="none" border="1px solid #15F4CB" color="brand.white" hoverColor="brand.teal" mt={{ base: "20px", lg: "0" }} isLoading={isLoading} d={{ base: "none", lg: "flex" }} onClick={connect}>Connect</CustomButton>
        }

      </Flex>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="20px"
        display={{ base: "flex", lg: "none" }}
      >
        <Link to="/">
          <Image w={{ base: "40px", lg: "60px" }} src={logo} alt="logo" />
        </Link>
        <Box
          onClick={() => setOpenNavBar(!openNavBar)}
          display={{ base: "block", lg: "none" }}
        >
          {openNavBar ? close : hamburger}
        </Box>
      </Flex>

      {openNavBar && (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          display={{ base: "block", lg: "flex" }}
          height={{ base: "100vh", lg: "" }}
        >
          <Flex
            alignItems="center"
            justifyContent="space-around"
            display={{ base: "block", lg: "flex" }}
            w="100%"
          >
            <Text
              cursor="pointer"
              textAlign="center"
              ml={{ base: "0", lg: "100px" }}
              mt={{ base: "20px", lg: "0" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              About us
            </Text>
            <Text
              cursor="pointer"
              textAlign="center"
              mt={{ base: "20px", lg: "0" }}
              ml={{ base: "0", lg: "100px" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              How it works
            </Text>
          </Flex>
          {
            isConnected ? 
            <CustomButton
                bg="none"
                color="brand.white"
                mt={{ base: "20px", lg: "0" }}
                w="100%"
                hoverColor="brand.teal"
                border="1px solid #15F4CB"
                onClick={disconnect}
            >
                Disconnect
            </CustomButton>
            : 
            <CustomButton bg="none" color="brand.white" hoverColor="brand.teal"
            border="1px solid #15F4CB" mt={{ base: "20px", lg: "0" }} isLoading={isLoading} w="100%" onClick={connect}>Connect</CustomButton>
          }
        </Flex>
      )}
    </>
  );
};

export default Navbar;
