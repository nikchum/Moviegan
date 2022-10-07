import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTrandingMovies } from 'api/movieDbApi';
import { Container } from 'components/Container';
import { Loader } from 'components/Loader';
import s from './Home.module.css';
import { MovieCard } from 'components/MovieCard';

export function Home() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getTrandingMovies()
      .then(({ data }) => {
        setMovies(data.results);
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      <h1 className={s.title}>Trending Movies Today</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <ul className={s.list}>
          {movies &&
            movies.map(({ id, title, poster_path }) => (
              <MovieCard
                key={id}
                id={id}
                title={title}
                poster={poster_path}
                location={{ from: location }}
              />
            ))}
        </ul>
      )}
    </Container>
  );
}
