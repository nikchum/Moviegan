import { Container } from 'components/Container';
import { Loader } from 'components/Loader';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import s from './Layout.module.css';

export function Layout() {
  return (
    <>
      <header className={s.header}>
        <Container>
          <nav className={s.nav}>
            <ul className={s.list}>
              <li className={s.item}>
                <NavLink className={s.link} end to="/">
                  Home
                </NavLink>
              </li>
              <li className={s.item}>
                <NavLink className={s.link} to="/movies">
                  Movies
                </NavLink>
              </li>
            </ul>
          </nav>
        </Container>
      </header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
