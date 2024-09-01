import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import Categories from './Categories'

function Home() {
  const [toFetch , settoFetch] =useState('movie')
  const api = 'dd3e936ca789d015487ecda9d59bd5fc'; 
  return (
    <Box>
      <Categories toFetch={toFetch} settoFetch={settoFetch} link={`https://api.themoviedb.org/3/trending/${toFetch}/day?api_key=${api}`} tittle={'Trending Now'}/>
      <Categories toFetch={toFetch} settoFetch={settoFetch} link={`https://api.themoviedb.org/3/${toFetch}/popular?api_key=${api}`} tittle={'Popular NowDays'}/>
      <Categories toFetch={toFetch} settoFetch={settoFetch} link={`https://api.themoviedb.org/3/${toFetch}/top_rated?api_key=${api}`} tittle={'Top Rated'}/>
      <Categories toFetch={toFetch} settoFetch={settoFetch} link={toFetch=='movie'?`https://api.themoviedb.org/3/${toFetch}/now_playing?api_key=${api}`:`https://api.themoviedb.org/3/${toFetch}/on_the_air?api_key=${api}`} tittle={'Playing Now'}/>
    </Box>
  )
}

export default Home