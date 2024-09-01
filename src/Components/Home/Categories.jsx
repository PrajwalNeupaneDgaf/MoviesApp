import { Box, Image, Text, Flex, Spinner, Grid, ButtonGroup, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Categories({ link,settoFetch,toFetch,tittle }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
   
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, [toFetch ,link]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${link}`);
            const jsonResponse = await res.json();
            setData(jsonResponse.results || []); // Correctly set data from the API response
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box p={5}>
            {loading ? (
                <Flex justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" color="teal.500" />
                </Flex>
            ) : (
               <Box>
                    <Box className=' flex flex-row justify-between align-middle p-1 bg-slate-100 rounded'>
                    <Text className=' text-gray-600 font-serif' fontSize="2xl" fontWeight="bold" mb={4}>{tittle}</Text>
                    <Box
                    className='border-solid flex text-xl flex-row border-gray-700 border rounded h-fit my-auto'
                    >
                        <Box className='cursor-pointer p-1' textColor={toFetch=='tv'?'black':'white'}  bg={toFetch=='movie'?'black':'white'} onClick={() => settoFetch('movie')}>Movie</Box>
                        <Box className='cursor-pointer p-1 pl-2 pr-2' textColor={toFetch=='movie'?'black':'white'}   bg={toFetch=='tv'?'black':'white'} onClick={() => settoFetch('tv')}>TV</Box>
                    </Box>
                    </Box>
                     <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={6}>
                    
                    {data.map((item) => (
                        <Box onClick={()=>{
                            navigate(`/details/${item.id}/${toFetch}`)
                        }} key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={3}>
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title || item.name}
                                borderRadius="md"
                                mb={2}
                            />
                            <Text fontWeight="bold" fontSize="lg" mb={1}>
                                {item.title || item.name}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                                ⭐ {item.vote_average}
                            </Text>
                        </Box>
                    ))}
                </Grid>
               </Box>
            )}
        </Box>
    );
}

export default Categories;
