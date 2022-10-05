import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrandingMovies } from 'api/movieDbApi';
import { IMG_PATH } from '../../constans/pathImgDB';
import { Container } from 'components/Container';
import { Loader } from 'components/Loader';
import s from './Home.module.css';

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
            movies.map(({ id, title, poster_path }) => {
              const checkimg = poster_path
                ? `${IMG_PATH}${poster_path}`
                : 'https://img.freepik.com/free-vector/red-prohibited-sign_1284-42862.jpg?w=2000';

              return (
                <li className={s.item} key={id}>
                  <Link
                    className={s.link}
                    to={`/movies/${id}`}
                    state={{ from: location }}
                  >
                    <div className={s.boxImg}>
                      <img
                        className={s.img}
                        width={200}
                        alt={title}
                        src={checkimg}
                      />
                    </div>
                    {title}
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </Container>
  );
}
