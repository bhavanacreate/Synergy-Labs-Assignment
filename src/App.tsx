import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import './App.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';

const HomePage = lazy(() => import('./pages/HomePage'));
const CreateUserForm = lazy(() => import('./pages/CreateUserForm'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const EditUser = lazy(() => import('./pages/EditUser')); // Lazy load EditUser page

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-user" element={<CreateUserForm />} />
            <Route path="/user-profile/:id" element={<UserProfile />} />
            <Route path="/edit-user/:id" element={<EditUser />} /> 
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
