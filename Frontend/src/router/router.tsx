// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import indexRoute from './indexRoute';
import aboutRoute from './aboutRoute';
import errorRoute from './errorRoute';

const router = createBrowserRouter([
    indexRoute,
    aboutRoute,
    errorRoute,
]);

export default router;
