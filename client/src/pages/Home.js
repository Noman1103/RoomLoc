import React, { Fragment } from 'react';
import Carousel from '../components/home/Carousel';
import VilleList from '../components/home/Ville';
import SearchBar from '../components/SearchBar';

function Home(){
  return (
    <Fragment>
      <div className='home'>
        <Carousel />
        <SearchBar />
        <VilleList />
      </div>
    </Fragment>
  );
}

export default Home;
