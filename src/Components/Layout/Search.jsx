import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Search() {
    const [search, setSearch] = useState('');

    const navigate = useNavigate()

    const HandleSearch = (searchItem)=>{
        console.log(searchItem);
        navigate(`/search/${searchItem}`)
        setSearch('')
    }

  return (
   <Box textColor={'white'}>
    <InputGroup>
        <Input
        placeholder={'Search Here...'}
        type='text' onKeyDown={(e)=>{
                if(e.key=="Enter"){
                    HandleSearch(e.target.value)
                }
        }}
        onChange={(e)=>{
            setSearch(e.target.value)
        }}
        value={search}
        />
        <InputRightElement onClick={(e)=>{
            HandleSearch(e.target.value)
        }} children={<SearchIcon color="gray.300" />}/>
    </InputGroup>
   </Box>
  )
}

export default Search