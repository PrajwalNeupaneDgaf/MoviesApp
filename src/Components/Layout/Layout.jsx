import React from 'react'
import Navbar from './Navbar'
import { Box } from '@chakra-ui/react'
import Footer from './Footer'

function Layout({children}) {
  return (
    <>
    <Navbar/>
    <Box>
        {children}
    </Box>
    <Footer/>
    </>
  )
}

export default Layout