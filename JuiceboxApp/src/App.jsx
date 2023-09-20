import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import RenderPosts from '../components/RenderPosts';
import LoginForm from '../components/Login';
import Logout from '../components/Logout';
import RegistrationForm from '../components/RegistrationForm';
import AddNewPostForm from '../components/AddNewPostForm';
import EditPostForm from '../components/EditPostForm';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function userSessionHandler() {
      const result = window.sessionStorage.getItem("token");
      if (result) {
        setToken(result);
      }
    }
    userSessionHandler();

  }, [])

  return (
    <>
      <div>
        <div id="container">
          <Navbar token={token} />
          <div id="main-section">
            <Routes>
              <Route path='/' element={<Home token={token} setToken={setToken} />} />
              <Route path='/account/login' element={<LoginForm token={token} setToken={setToken} />} />
              <Route path='/account/logout' element={<Logout token={token} setToken={setToken} />} />
              <Route path='/account/register' element={<RegistrationForm token={token} setToken={setToken} />} />
              <Route path='/posts' element={<RenderPosts token={token} setToken={setToken} />} />
              <Route path='/posts/addNewPost' element={<AddNewPostForm token={token} setToken={setToken} /> } />
              <Route path='/posts/editPost/:id' element={<EditPostForm token={token} setToken={setToken}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
