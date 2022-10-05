import { Button } from "@chakra-ui/react";

const CustomButton = ({ children, bg, color, onClick, border, mr, hover, w, mt, hoverColor, isLoading, pos, right, mb, m, d, ml, borderColor, disabled }) => (
  <Button
    w={w || "170px"}
    h="55px"
    bg={bg}
    color={color}
    mr={mr}
    fontWeight="black"
    _hover={{ bg: hover, border: border, color: hoverColor || 'brand.primary' }}
    borderRadius="8px"
    onClick={onClick}
    border={border}
    borderColor={borderColor}
    mt={mt}
    type="submit"
    isLoading={isLoading}
    pos={pos}
    right={right}
    mb={mb}
    display={d}
    m={m}
    ml={ml}
    cursor="pointer"
    disabled={disabled}
  >
    {children}
  </Button>
);

export default CustomButton;
