import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import { loading } from "../utils/svg";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import {
  checkConnection,
  isDisconnected,
  addTokens,
} from "../utils/helpers.js";
import { legacyAddress } from "../utils/contract";

const SelectTokens = () => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getTokensLoading, setGetTokensLoading] = useState(false);

  const test = async() => {
    const res2 = await fetch('https://testnet.coinex.net/api/v1', {
      headers: {
        'apikey': '633dae64e8e353aaa5d562a4'
      }
    });
    console.log(await res2.json());
  }

  useEffect(() => {
    test();
    setGetTokensLoading(true);
    getTokens();
  }, []);

  const getTokens = async () => {
    if (isDisconnected()) {
      return;
    }
    const user = await checkConnection();
    console.log(user);
    console.log("fetching tokens...");
    try {
      // const url = new URL(
      //   `https://deep-index.moralis.io/api/v2/${user}/erc20?chain=avalanche%20testnet`
      // );

      // const res = await fetch(url, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "X-API-Key":
      //       "4QdwNluHelpTw9qmoAXTsaodpYXP1E1cpdrRmqbTGf9sPhO9hBFPrRydJxkl5TPP",
      //   },
      // });

      // const res_json = await res.json();

      // // console.log(res_json);
      // setTokens(res_json);
      const usdc = {
        symbol: "USDC",
        token_address: "0x6bb92A5E17e28E9D3f7Eb2B58E9DA4E5278Da0bC"
      }
      // const ones  = {
      //   symbol: "ONES",
      //   token_address: "0x6db1736656Ed09cAC5957d7B14e703e6268D1337"
      // }
      // const dai  = {
      //   symbol: "DAI",
      //   token_address: "0xbf0A736F6107D10fCE53d056C95fD73d266283Bb"
      // }
      setTokens([usdc])
      setGetTokensLoading(false);
      // console.log(tokens);
    } catch (err) {
      console.log(err);
      setGetTokensLoading(false);
    }
  };

  const approve = async (tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const erc20Abi = ["function approve(address spender, uint256 amount)"];
    const token = new ethers.Contract(tokenAddress, erc20Abi, signer);
    const tx = await token.approve(legacyAddress, ethers.constants.MaxUint256);
  };

  const add = async () => {
    let tokenAddresses = selectedTokens.map((tkn) => tkn.token_address);
    const res = await addTokens(tokenAddresses);
    setIsLoading(false);
    if (res) {
      navigate("/profile");
    }
  };

  const selectToken = async (token) => {
    try {
      await approve(token.token_address);
    } catch (error) {
      console.log(error);
    }
    setSelectedTokens([...selectedTokens, token]);
    toaster.success(`${token.symbol} successfully selected`);
  };

  const selectAll = () => {
    setSelectedTokens(tokens);
    tokens.map((token) => approve(token.token_address));
    toaster.success(`All tokens successfully selected`);
  };

  return (
    <Box
      padding={{ base: "10px 40px", lg: "30px 80px" }}
      bg="#02044A"
      h="100vh"
    >
      <Navbar />
      <Box p={{base: "15px 10px", lg:"15px 50px"}} margin="50px 0">
        <Box mb="20px">
          <Text
            color="white"
            fontSize={{ base: "20px", lg: "50px" }}
            fontWeight="black"
          >
            Select Tokens
          </Text>
          <Text color="brand.teal" fontSize={{ base: "12px", lg: "14px" }}>
            Kindly select all your tokens you would like to transfer it's asset to
            your next of kin.
          </Text>
        </Box>
        <Box h="1px" bgColor="brand.grey"></Box>
        <Box
          bg="#F9F9F9"
          w="100%"
          m="40px auto"
          p="20px 30px"
          borderRadius="10px"
        >
          {getTokensLoading ? (
            loading
          ) : (
            <>
              <Text
                mt="-10px"
                mb="20px"
                cursor="pointer"
                _hover={{ color: "brand.primary" }}
                onClick={selectAll}
              >
                {tokens.length ? 'Select All' : ''}
              </Text>
                {tokens.length ? (
              <SimpleGrid columns="4" spacing="10">
                  {tokens.map((token) => (
                    <Box
                      w="230px"
                      boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
                      borderRadius="10px"
                    >
                      <Flex
                        color="brand.dark"
                        bg="brand.white"
                        p="15px"
                        h="95px"
                        borderRadius="10px"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text>{token.symbol}</Text>
                      </Flex>
                      <Flex
                        color="brand.dark"
                        alignItems="center"
                        cursor="pointer"
                        _hover={{ color: "brand.primary" }}
                        fontSize="14px"
                        justifyContent="space-between"
                        p="10px 20px"
                      >
                        <Text fontSize="10px" color="brand.primary">
                          Token {token.symbol}
                        </Text>
                        <Text
                          as="button"
                          cursor="pointer"
                          onClick={() => selectToken(token)}
                        >
                          Select
                        </Text>
                      </Flex>
                    </Box>
                  ))}
              </SimpleGrid>
                ) : (
                  <Text color="brand.primary">
                    You do not have any token
                  </Text>
                )}
            </>
          )}
        </Box>
        <CustomButton
          w={{ base: "100%", lg: "170px" }}
          onClick={() => navigate("/profile")}
          ml={{ base: "0", lg: "20px" }}
          color="brand.white"
          bg="brand.teal"
          hover="none"
          hoverColor="brand.white"
          border="1px solid #15F4CB"
        >
          Later
        </CustomButton>
        <CustomButton
          isLoading={isLoading}
          onClick={add}
          ml={{ base: "0", lg: "20px" }}
          mt={{ base: "20px", md: "0" }}
          bg="none"
          w={{ base: "100%", lg: "170px" }}
          hover="brand.teal"
          border="1px solid #15F4CB"
          hoverColor="brand.white"
          color="brand.white"
        >
          Proceed
        </CustomButton>
      </Box>
    </Box>
  );
};

export default SelectTokens;
