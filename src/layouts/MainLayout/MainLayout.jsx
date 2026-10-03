import { Outlet } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar/Navbar.jsx';
import Footer from '../../components/layout/Footer/Footer.jsx';

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;