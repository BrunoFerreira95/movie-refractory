import { createContext, ReactNode, useEffect, useState } from "react"

import { api } from '../services/api';

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface MovieProviderProps {
    children: ReactNode
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

interface ProductContextData {
    selectedGenreId: number,
    genres: GenreResponseProps[],
    movies: MovieProps[] ,
    selectedGenre: GenreResponseProps
    handleClickButton: (id: number) => void
}

export const MovieContext = createContext({} as ProductContextData)

export function MovieProvider({children, ...rest}: MovieProviderProps) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  
    useEffect(() => {
      api.get<GenreResponseProps[]>('genres').then(response => {
        setGenres(response.data);
      });
    }, []);
  
    useEffect(() => {
      api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
        setMovies(response.data);
      });
  
      api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
        setSelectedGenre(response.data);
      })
    }, [selectedGenreId]);
  
    function handleClickButton(id: number) {
      setSelectedGenreId(id);
    }

    return (
        <MovieContext.Provider value={{
          selectedGenreId,
          genres,
          movies,
          selectedGenre,
          handleClickButton
        }}>
            {children}
        </MovieContext.Provider>
    )
}