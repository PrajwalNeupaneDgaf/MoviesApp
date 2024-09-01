import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import MoviesDetails from './Components/MoviesDetails/MoviesDetails';
import SearchDetails from './Components/SearchDetails';
import Movies from './Components/Movies/Movies';
import TVShowsTab from './Components/Movies/TVShowsTab';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<TVShowsTab />} />
            <Route path="/details/:id/:type" element={<MoviesDetails/>} />
            <Route path="/search/:search" element={<SearchDetails/>} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
