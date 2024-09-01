import { Box, Image, Text, Flex, Spinner, Grid, Tag, Button, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MoviesDetails() {
    const [movie, setMovie] = useState({});
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trailerUrl, setTrailerUrl] = useState('');

    const { id, type } = useParams();
    const api = 'dd3e936ca789d015487ecda9d59bd5fc';

    useEffect(() => {
        fetchData();
    }, [id, type]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const movieResponse = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${api}`);
            const movieData = await movieResponse.json();
            setMovie(movieData);
            console.log(movieData)

            // Fetch actors
            const creditsResponse = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${api}`);
            const creditsData = await creditsResponse.json();
            setActors(creditsData.cast.slice(0, 5)); // Get first 5 actors for display

            // Fetch trailers
            const videosResponse = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${api}`);
            const videosData = await videosResponse.json();
            const trailer = videosData.results.find(video => video.type === 'Trailer');
            setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '');
        } catch (error) {
            console.error('Error fetching movie details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Flex justifyContent="center" alignItems="center" height="100vh" bg="black">
                <Spinner size="xl" color="white" />
            </Flex>
        );
    }

    return (
        <Box>
            {/* Background Image Section */}
            <Box
                position='relative'
                bgImage={`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}
                bgSize='cover'
                bgPosition='center'
                width='100%'
                height={{ base: '40vh', md: '70vh' }}
                textAlign='center'
                color='white'
                mb={8}
            >
                <Box
                    position='absolute'
                    bottom={0}
                    left={0}
                    right={0}
                    p={4}
                    bg='rgba(0, 0, 0, 0.7)'
                >
                    <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight='bold'>{movie.title || movie.name}</Text>
                    <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>{movie.tagline}</Text>
                    <HStack spacing={4} justifyContent='center'>
                        <Tag colorScheme='teal' variant='solid'>Rating: {movie.vote_average}</Tag>
                        <Tag colorScheme='blue' variant='solid'>Release Date: {movie.release_date || movie.first_air_date}</Tag>
                        <Tag colorScheme='orange' variant='solid'>Runtime: {movie.runtime || movie.episode_run_time?.[0]} mins</Tag>
                    </HStack>
                    {trailerUrl && (
                        <Button
                            mt={4}
                            colorScheme='red'
                            onClick={() => window.open(trailerUrl, '_blank')}
                        >
                            Watch Trailer
                        </Button>
                    )}
                </Box>
            </Box>
            {/* Content Section */}
            <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6} p={6} alignItems='start'>
                {/* Movie Poster */}
                <Box>
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title || movie.name}
                        borderRadius='md'
                        width='100%'
                        objectFit='cover'
                        boxShadow='md'
                    />
                </Box>
                {/* Description Section */}
                <Box>
                    <Text fontSize='2xl' fontWeight='bold' mb={4}>Overview</Text>
                    <Text mb={4}>{movie.overview}</Text>
                    <Text fontSize='lg' fontWeight='bold' mb={2}>Genres:</Text>
                    <Flex wrap='wrap'>
                        {movie.genres?.map((genre) => (
                            <Tag key={genre.id} colorScheme='purple' mr={2} mb={2}>{genre.name}</Tag>
                        ))}
                    </Flex>
                </Box>
            </Grid>
            {/* Actors Section */}
            <Box p={6}>
                <Text fontSize='2xl' fontWeight='bold' mb={4}>Actors</Text>
                <Grid templateColumns='repeat(auto-fit, minmax(120px, 1fr))' gap={4}>
                    {actors.map((actor) => (
                        <Box key={actor.id} textAlign='center'>
                            <Image
                                borderRadius='full'
                                boxSize='120px'
                                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                alt={actor.name}
                                mb={2}
                                objectFit='cover'
                            />
                            <Text fontSize='sm'>{actor.name}</Text>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default MoviesDetails;
