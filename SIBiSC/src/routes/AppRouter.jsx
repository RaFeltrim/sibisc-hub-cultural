import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../pages/HomePage';
import HomePageMobile from '../pages/HomePageMobile';
import NewsPage from '../pages/NewsPage';
import NewsDetailPage from '../pages/NewsDetailPage';
import EventsPage from '../pages/EventsPage';
import EventDetailPage from '../pages/EventDetailPage';
import CatalogPage from '../pages/CatalogPage';
import BookDetailPage from '../pages/BookDetailPage';
import UserProfilePage from '../pages/UserProfilePage';
import NotFoundPage from '../pages/NotFoundPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home-mobile" element={<HomePageMobile />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/noticias/:newsId" element={<NewsDetailPage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/eventos/:eventId" element={<EventDetailPage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/catalogo/:bookId" element={<BookDetailPage />} />
          <Route path="/perfil" element={<UserProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
