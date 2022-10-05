import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import s from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={s.box}>
      <CirclesWithBar
        height="150"
        width="150"
        color="#ea003d"
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
};
