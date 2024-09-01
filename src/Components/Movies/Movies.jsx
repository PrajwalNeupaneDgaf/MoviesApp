import { Box, Image, Text, Flex, Spinner, Grid, Select, Button } from '@chakra-ui/react';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Movies() {
    const [data, setData] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [noResults, setNoResults] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const apiKey = 'dd3e936ca789d015487ecda9d59bd5fc';
    const navigate = useNavigate();

    const fetchGenres = useCallback(async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
            const data = await response.json();
            setGenres(data.genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    }, [apiKey]);

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        setNoResults(false);
        try {
            const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${genreQuery}&page=${page}`);
            const data = await response.json();
            setData(data.results || []);
            setTotalResults(data.total_results || 0);
            setTotalPages(data.total_pages || 1);
            setNoResults(data.results.length === 0);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    }, [apiKey, selectedGenre, page]);

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <Box p={5}>
            {/* Genre Filter */}
            <Flex mb={4} alignItems="center">
                <Text fontSize="2xl" fontWeight="bold" mr={4}>Filter by Genre:</Text>
                <Select
                    placeholder="All Genres"
                    value={selectedGenre}
                    onChange={(e) => {
                        setSelectedGenre(e.target.value);
                        setPage(1); // Reset to first page on genre change
                    }}
                    width={{ base: 'full', md: 'auto' }}
                >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </Select>
            </Flex>

            {loading ? (
                <Flex justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" color="teal.500" />
                </Flex>
            ) : (
                <Box>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                        {totalResults} Results
                    </Text>
                    {noResults ? (
                        <Text>No results found</Text>
                    ) : (
                        <Box>
                            <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={6}>
                                {data.map((movie) => (
                                    <Box
                                        key={movie.id}
                                        borderWidth="1px"
                                        borderRadius="lg"
                                        overflow="hidden"
                                        p={3}
                                        onClick={() => navigate(`/details/${movie.id}/movie`)}
                                        cursor="pointer"
                                        _hover={{ bg: 'gray.100' }}
                                    >
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            borderRadius="md"
                                            mb={2}
                                            objectFit="cover"
                                            boxSize="180px"
                                        />
                                        <Text fontWeight="bold" fontSize="lg" mb={1}>
                                            {movie.title}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            ⭐ {movie.vote_average}
                                        </Text>
                                    </Box>
                                ))}
                            </Grid>

                            {/* Pagination Controls */}
                            <Flex justifyContent="space-between" mt={6}>
                                <Button
                                    onClick={handlePreviousPage}
                                    isDisabled={page === 1}
                                >
                                    Previous
                                </Button>
                                <Text>
                                    Page {page} of {totalPages}
                                </Text>
                                <Button
                                    onClick={handleNextPage}
                                    isDisabled={page === totalPages}
                                >
                                    Next
                                </Button>
                            </Flex>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}

export default Movies;
