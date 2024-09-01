import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function NavButton({to , value ,click}) {
  return (
    <Box onClick={click} as={Link} to={to} className='p-2 text-lg hover:opacity-65'>
        {value}
    </Box>
  )
}

export default NavButton