import React from 'react';
import s from './Container.module.css';

export const Container = ({ children, style }) => {
  return (
    <div className={s.box} style={{ style }}>
      {children}
    </div>
  );
};
