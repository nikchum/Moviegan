import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCastById } from '../../api/movieDbApi';
import { IMG_PATH } from '../../constans/pathImgDB';
import { Loader } from 'components/Loader';
import { Container } from 'components/Container';
import s from './Cast.module.css';

export const Cast = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getMovieCastById(movieId)
      .then(({ data: { cast } }) => {
        // console.log(cast);
        setData(cast);
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <Container>
      {isLoading && <Loader />}
      <ul className={s.list}>
        {data &&
          data.map(({ id, profile_path, original_name, character }) => {
            const checkimg = profile_path
              ? `${IMG_PATH}${profile_path}`
              : 'https://img.freepik.com/free-vector/red-prohibited-sign_1284-42862.jpg?w=2000';

            return (
              <li className={s.item} key={id}>
                <img
                  className={s.img}
                  width={200}
                  src={checkimg}
                  alt={original_name}
                />
                <p className={s.name}>{original_name}</p>
                <p className={s.char}>Character: {character}</p>
              </li>
            );
          })}
      </ul>
    </Container>
  );
};
