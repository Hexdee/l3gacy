import { Box, Image, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";

const SuccessMessage = () => {
  const imgLink = "https://pngimg.com/uploads/confetti/confetti_PNG86957.png";
  return (
    <Box padding={{ base: '10px 40px', lg: "30px 80px"}}>
     <Navbar />

      <Box m="80px auto" w="80%">
        <Image src={imgLink} alt="congrats" w="200px" m="20px auto" />
        <Text fontSize={{ base: '25px', lg: "40px"}} mt="60px" textAlign="center">Congratulations</Text>
        <Text textAlign="center" fontSize={{ base: '12px', lg: "16px"}} color="brand.primary" w={{ base: '100%', lg: "30%"}} m="20px auto">
          You have successfully updated your check in interval and you have successfully checked in today
        </Text>
      </Box>

      <Link to="/">
        <CustomButton m={{ base: '30px auto', lg: "-30px auto"}} bg="brand.primary" hoverColor="brand.yellow" color="brand.white" w={{ base: '100%', lg: '170px' }} d="flex">Go Home</CustomButton>
      </Link>
    </Box>
  );
};

export default SuccessMessage;
