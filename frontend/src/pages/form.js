import { Box, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import TextInput from "../common/TextInput";
import {ethers} from "ethers";
import { useState } from "react";
import { toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import {createLegacy } from "../utils/helpers.js"

const Form = () => {
  let navigate = useNavigate();
  const [legatee, setLagatee] = useState("");
  const [checkInterval, setCheckInterval] = useState();
  const [createLoading, setCreateLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userNextOfKin, setUserNextOfKin] = useState('');
  const getUserDetails = localStorage.getItem('userDetails');
 

  const create = async(e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      const res = await createLegacy(legatee, checkInterval * 3600 * 24);
      const userDetails = { userName, userNextOfKin, checkInterval, legatee };
      console.log(userDetails)
      localStorage.setItem('userDetails', userDetails);
      setCreateLoading(false);
      if(res) {
        navigate('/select-token');
      }
    } catch (error) {
      toaster.danger("An Error occured!");
      setCreateLoading(false);
    }
  }

  const handleLegateeChange = (event) => {
    setLagatee(event.target.value);
  }

  const handleCheckIntervalChange = (event) => {
    setCheckInterval(event.target.value);
  }  


  return (
    <Box padding={{ base: '10px 40px', lg: "30px 80px"}}>
      <Navbar />
      <Box textAlign="center" border="1px solid #7000FF" p="15px" w={{ base: '100%', lg: "40%"}} borderRadius="10px" margin="80px auto">
        <Text color="brand.primary" fontSize={{ base: '20px', lg: "30px"}}>Fill in the form<br/>below appropraitely</Text>
        <Text color="brand.dark" fontSize={{ base: '12px', lg: "14px"}} mt="10px">
            This allows your next of kin to inherits your wallets assets when you're
            no more alive.
        </Text>
        <Box m="40px auto" w={{ base: '90%', lg: "80%"}} fontSize="14px">
            <form>
                <TextInput
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    defaultValue={getUserDetails && getUserDetails.userName}
                />
                <TextInput
                    label="Name of your next of kin"
                    placeholder="Enter your next of kin name"
                    type="text"
                    onChange={(e) => setUserNextOfKin(e.target.value)}
                    defaultValue={getUserDetails && getUserDetails.userNextOfKin}
                />

                <TextInput
                    label="Next of kin wallet address"
                    placeholder="Enter your next of kin wallet address"
                    type="text"
                    onChange={handleLegateeChange}
                    defaultValue={getUserDetails && getUserDetails.legatee}
                />
                <TextInput
                    label="CheckInterval (In Days)"
                    placeholder="Enter how frequently you want to check in"
                    type="number"
                    onChange={handleCheckIntervalChange}
                    defaultValue={getUserDetails && getUserDetails.checkInterval}
                />
                <CustomButton mt="20px" w="100%" bg="brand.primary" color="brand.white" hoverColor="brand.yellow" isLoading={createLoading} onClick={create}>Secure Now</CustomButton>
            </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
