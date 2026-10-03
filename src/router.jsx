import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import Home from './pages/Home/Home.jsx';
import Features from './pages/Features/Features.jsx';
import Security from './pages/Security/Security.jsx';
import Download from './pages/Download/Download.jsx';
import Changelog from './pages/Changelog/Changelog.jsx';
import Documentation from './pages/Documentation/Documentation.jsx';
import About from './pages/About/About.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'features',
        element: <Features />,
      },
      {
        path: 'security',
        element: <Security />,
      },
      {
        path: 'download',
        element: <Download />,
      },
      {
        path: 'changelog',
        element: <Changelog />,
      },
      {
        path: 'documentation',
        element: <Documentation />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

export default router;