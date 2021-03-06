import { useEffect, useState } from 'react';

import './styles/global.scss';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { MovieProvider } from './Context/MovieContext';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {

  return (
    <MovieProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar/>
        <Content/>
      </div>
    </MovieProvider>
  )
}