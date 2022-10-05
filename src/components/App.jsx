import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { Layout } from './Layout';

export const Home = lazy(() =>
  import('pages/Home').then(module => ({
    ...module,
    default: module.Home,
  }))
);

export const Movies = lazy(() =>
  import('pages/Movies').then(module => ({
    ...module,
    default: module.Movies,
  }))
);

export const Cast = lazy(() =>
  import('./Cast').then(module => ({
    ...module,
    default: module.Cast,
  }))
);

export const MovieDetails = lazy(() =>
  import('../pages/MovieDetails').then(module => ({
    ...module,
    default: module.MovieDetails,
  }))
);

export const Reviews = lazy(() =>
  import('./Reviews').then(module => ({
    ...module,
    default: module.Reviews,
  }))
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index exact element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
