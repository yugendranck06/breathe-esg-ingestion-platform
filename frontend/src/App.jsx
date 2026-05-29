import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';

import UploadPage from './pages/UploadPage';

import ReviewPage from './pages/ReviewPage';

import Login from './pages/Login';

import AuditPage from './pages/AuditPage';

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path='/'
          element={<Login />}
        />

        <Route
          path='/dashboard'
          element={<Dashboard />}
        />

        <Route
          path='/upload'
          element={<UploadPage />}
        />

        <Route
          path='/review'
          element={<ReviewPage />}
        />

        <Route
          path='/audit'
          element={<AuditPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;