import React from 'react';
import { Link } from 'react-router-dom';
import { IMG_PATH } from '../../constans/pathImgDB';
import s from './MovieCard.module.css';

export const MovieCard = props => {
  const { id, title, poster, location } = props;

  const checkimg = poster
    ? `${IMG_PATH}${poster}`
    : 'https://img.freepik.com/free-vector/red-prohibited-sign_1284-42862.jpg?w=2000';

  return (
    <li className={s.item}>
      <Link className={s.link} to={`/movies/${id}`} state={location}>
        <div className={s.boxImg}>
          <img className={s.img} width={200} alt={title} src={checkimg} />
        </div>
        {title}
      </Link>
    </li>
  );
};
