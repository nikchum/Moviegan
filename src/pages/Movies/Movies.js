import { useState, useEffect, useRef } from 'react';
import { getMoviesByQuery } from '../../api/movieDbApi';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Container } from 'components/Container';
import { Loader } from 'components/Loader';
import { MovieCard } from 'components/MovieCard';
import s from './Movies.module.css';

export function Movies() {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const form = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getQuery = searchParams.get('name');

    if (getQuery) {
      setQuery(getQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      getMoviesByQuery(query)
        .then(({ data }) => {
          setMovies(data.results);
          setSearchParams({ name: query });
        })
        .catch(console.log)
        .finally(() => setIsLoading(false));
    }
  }, [query, setSearchParams]);

  const handleSubmitForm = e => {
    const { searchQuery } = e.target.elements;
    e.preventDefault();
    setQuery(searchQuery.value);
    form.current.reset();
  };

  return (
    <Container>
      <form className={s.form} ref={form} onSubmit={handleSubmitForm}>
        <input
          className={s.input}
          placeholder="Enter movie to search"
          name="searchQuery"
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>

      {movies?.length < 1 && !null && (
        <div className={s.notFound}>
          Movies matching your search{' '}
          <span className={s.notFoundName}>{query}</span> not found
        </div>
      )}

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
