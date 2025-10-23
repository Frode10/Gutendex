import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import BookDetails from './pages/BookDetails';
import Favorites from './pages/Favorites';
import './App.css';

// Layout component that includes the Header
function Layout() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <p>Gutendex Bokapplikasjon &copy; 2024</p>
          <p>Data fra <a href="https://gutendex.com" target="_blank" rel="noopener noreferrer">Gutendex API</a></p>
        </div>
      </footer>
    </div>
  );
}

// Create router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'category/:category',
        element: <CategoryPage />,
      },
      {
        path: 'book/:id',
        element: <BookDetails />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
    ],
  },
], {
  basename: '/Gutendex',
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
