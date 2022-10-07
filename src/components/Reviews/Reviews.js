import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviewsById } from '../../api/movieDbApi';
import { Loader } from 'components/Loader';
import { Container } from 'components/Container';
import s from './Reviews.module.css';

export const Reviews = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getMovieReviewsById(movieId)
      .then(({ data }) => setData(data.results))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <Container>
      <ul className={s.list}>
        {isLoading && <Loader />}
        {data?.length ? (
          data.map(({ id, author, content }) => {
            return (
              <li className={s.item} key={id}>
                <h3 className={s.title}>AUTHOR: {author}</h3>
                <p className={s.text}>{content}</p>
              </li>
            );
          })
        ) : (
          <p className={s.error}>We don't have any reviews for this movie</p>
        )}
      </ul>
    </Container>
  );
};
