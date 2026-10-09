import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Features from './pages/Features';
import Security from './pages/Security';
import Download from './pages/Download';
import Changelog from './pages/Changelog';
import Demo from './pages/Demo';
import Documentation from './pages/Documentation';
import About from './pages/About';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'features', element: <Features /> },
      { path: 'security', element: <Security /> },
      { path: 'download', element: <Download /> },
      { path: 'changelog', element: <Changelog /> },
      { path: 'documentation', element: <Documentation /> },
      { path: 'demo', element: <Demo /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
