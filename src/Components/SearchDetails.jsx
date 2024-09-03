import { Box, Image, Text, Flex, Spinner, Grid, ButtonGroup, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SearchDetails() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [noResults, setNoResults] = useState(false);
    const [searchType, setSearchType] = useState('movie'); // Default to movie
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [totalPages, setTotalPages] = useState(0); // State for total pages

    const { search } = useParams();
    const navigate = useNavigate();
    const apiKey = 'dd3e936ca789d015487ecda9d59bd5fc';

    // Effect for fetching data based on search type, search query, and current page
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setNoResults(false);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/${searchType}?api_key=${apiKey}&query=${search}&page=${currentPage}`
                );
                const data = await response.json();
                setData(data.results || []);
                setTotalResults(data.total_results || 0);
                setTotalPages(data.total_pages || 0); // Set total pages
                setNoResults(data.total_results === 0);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchType, search, currentPage]);

    // Reset to page 1 when searchType or search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchType, search]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    return (
        <Box p={5}>
            {/* Category Switcher */}
            <ButtonGroup spacing={4} mb={4}>
                <Button
                    colorScheme={searchType === 'movie' ? 'teal' : 'gray'}
                    onClick={() => setSearchType('movie')}
                >
                    Movies
                </Button>
                <Button
                    colorScheme={searchType === 'tv' ? 'teal' : 'gray'}
                    onClick={() => setSearchType('tv')}
                >
                    TV Shows
                </Button>
            </ButtonGroup>

            {loading ? (
                <Flex justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" color="teal.500" />
                </Flex>
            ) : (
                <Box>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                        {totalResults} Results for "{search}"
                    </Text>
                    {noResults ? (
                        <Text>No results found</Text>
                    ) : (
                        <>
                            <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={6}>
                                {data.map((item) => (
                                    <Box
                                        key={item.id}
                                        borderWidth="1px"
                                        borderRadius="lg"
                                        overflow="hidden"
                                        p={3}
                                        onClick={() => navigate(`/details/${item.id}/${searchType}`)}
                                    >
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
                            {/* Pagination Controls */}
                            {totalPages > 1 && ( // Only show pagination if there are multiple pages
                                <Flex justifyContent="center" alignItems="center" mt={4}>
                                    <Button
                                        onClick={handlePreviousPage}
                                        isDisabled={currentPage === 1}
                                        mr={2}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        onClick={handleNextPage}
                                        isDisabled={currentPage >= totalPages}
                                    >
                                        Next
                                    </Button>
                                </Flex>
                            )}
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
}

export default SearchDetails;
