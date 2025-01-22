import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AboutPage } from './pages/About';
import { HomePage } from './pages/Home';

const routes = [
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component }, i) => (
          <Route key={i} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
