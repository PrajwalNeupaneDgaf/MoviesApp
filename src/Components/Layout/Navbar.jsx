import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NavButton from "./NavButton";
import Search from "./Search";
import { HamburgerIcon } from "@chakra-ui/icons";

function Navbar() {
  const [openToggle, setopenToggle] = useState(false);

  const onClose = ()=>{
    setopenToggle(false)
  }
  return (
    <Box
      zIndex={'4'}
      as="nav"
      className="bg-gray-900   sticky top-0 left-0 right-0 p-2 flex flex-row justify-between"
    >
      <Box className="flex flex-row gap-4 align-middle">
        <Box display={['none','none','flex','flex']} className="flex align-middle">
          <Image
            src="https://logolook.net/wp-content/uploads/2021/11/Netflix-Logo-1997.png"
            className="h-14"
          />
        </Box>
        <Box  display={['none','none','flex','flex']} className="flex flex-row gap-4 align-middle text-white opacity-85">
          <NavButton to={"/"} value={"Home"} />
          <NavButton to={"/movies"} value={"Movies"} />
          <NavButton to={"/series"} value={"TV Shows"} />
        </Box>
        <Box   display={['flex','flex','none','none']} className="flex h-full align-middle my-auto justify-center">
          <HamburgerIcon color={'white'} fontSize={'xx-large'}  onClick={()=>{
            setopenToggle(true)
          }}/>
        </Box>
      </Box>
      <Box className="flex flex-col justify-center">
        <Box>
          <Search />
        </Box>
      </Box>
      <Drawer  onClose={onClose} isOpen={openToggle} placeItems={'left'}>
        <DrawerOverlay >
          <DrawerContent bg={'gray.900'} >
            <DrawerHeader>
              <Image
                src="https://logolook.net/wp-content/uploads/2021/11/Netflix-Logo-1997.png"
                className="h-14"
              />
            </DrawerHeader>
            <DrawerBody>
              <Box className="flex flex-col gap-4 align-middle text-white opacity-85">
                <NavButton to={"/"} value={"Home"} click={onClose}/>
                <NavButton to={"/movies"} value={"Movies"} click={onClose}/>
                <NavButton to={"/series"} value={"TV Shows"} click={onClose}/>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
}

export default Navbar;
