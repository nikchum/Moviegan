import { useEffect, useState, Suspense } from 'react';
import {
  NavLink,
  useParams,
  Link,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { Loader } from 'components/Loader';
import { getMovieById } from '../../api/movieDbApi';
import s from './MovieDetails.module.css';
import { IMG_PATH } from '../../constans/pathImgDB';
import { Container } from 'components/Container';

export const MovieDetails = ({ backPath }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const loc = location.state?.from ?? '/';

  useEffect(() => {
    setIsLoading(true);
    getMovieById(movieId)
      .then(({ data }) => {
        setMovie(data);
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [movieId]);

  const getGanres = () => {
    return movie.genres.map(genr => genr.name).join(', ');
  };

  const checkimg = movie?.poster_path
    ? `${IMG_PATH}${movie.poster_path}`
    : 'https://img.freepik.com/free-vector/red-prohibited-sign_1284-42862.jpg?w=2000';

  return (
    <>
      <section className={s.section}>
        <Container>
          <Link className={s.linkBack} to={loc}>
            Go back
          </Link>
          {isLoading && <Loader />}
          {movie && (
            <div className={s.boxCard}>
              <img
                className={s.img}
                width={250}
                alt={movie.title}
                src={checkimg}
              />
              <div className={s.boxDescr}>
                <h2 className={s.title}>
                  {movie.title} ({movie.release_date.slice(0, 4)})
                </h2>
                <p className={s.score}>
                  User Score:{' '}
                  {Math.round((Number(movie.vote_average) * 100) / 10)}%
                </p>
                <h3 className={s.over}>Overview</h3>
                <p className={s.overText}>{movie.overview}</p>
                <h4 className={s.genres}>Genres</h4>
                <p className={s.genresText}>{getGanres()}</p>
              </div>
            </div>
          )}
        </Container>
      </section>
      <section className={s.info}>
        <Container>
          <p className={s.titleInfo}>Additional information</p>
          <ul className={s.listInfo}>
            <li className={s.itemInfo}>
              <NavLink
                to="cast"
                className={s.linkInfo}
                state={{ from: location.state?.from }}
              >
                Cast
              </NavLink>
            </li>
            <li className={s.itemInfo}>
              <NavLink
                to="reviews"
                className={s.linkInfo}
                state={{ from: location.state?.from }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </Container>
      </section>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
