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
import AlreadySelectedTokens from "../templates/alreadySelectedTokens";

const SelectTokens = () => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getTokensLoading, setGetTokensLoading] = useState(false);
  const [prevTokens, setPrevTokens] = useState(false);
  const [active, setActive] = useState();

  useEffect(() => {
    setGetTokensLoading(true);
    getTokens();
  }, []);

  const getTokens = async () => {
    if (isDisconnected()) {
      return;
    }
    const user = await checkConnection();
    // console.log(user);
    console.log("fetching tokens...");
    try {
      const url = new URL(
        `https://deep-index.moralis.io/api/v2/${user}/erc20?chain=avalanche%20testnet`
      );

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key":
            "4QdwNluHelpTw9qmoAXTsaodpYXP1E1cpdrRmqbTGf9sPhO9hBFPrRydJxkl5TPP",
        },
      });
      const res_json = await res.json();
      // console.log(res_json);
      setTokens(res_json);
      setGetTokensLoading(false);
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

  const selectToken = async (token, index) => {
    try {
      await approve(token.token_address);
      setActive(() => {
        if (index === active) {
          index = null;
        };
        return index;
      })
      toaster.success(`${token.symbol} successfully selected`);
    } catch (error) {
      console.log(error);
    }
    console.log(index);
    setSelectedTokens([...selectedTokens, token]);

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
      minH="100vh"
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
                  {tokens.map((token, index) => (
                    <Box
                      w="230px"
                      boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
                      borderRadius="10px"
                    >
                      <Flex
                        color="brand.dark"
                        bg={active === index ? "brand.teal" : "brand.white"}
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
                          onClick={() => selectToken(token, index)}
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

        <Box m="20px 0">
          <Box h="1px" bgColor="brand.grey"></Box>
          <Text color="brand.white" m="20px 0" float="right" cursor="pointer" _hover={{ color: "brand.teal" }} w="fit-content" fontSize="14px" onClick={() => setPrevTokens(!prevTokens)}>View already selected tokens here</Text>
          {prevTokens &&
            <AlreadySelectedTokens />
          }
        </Box>
      </Box>
    </Box>
  );
};

export default SelectTokens;
