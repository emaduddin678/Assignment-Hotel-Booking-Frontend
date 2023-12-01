import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hotels' element={<List />} />
          <Route path='/hotels/:id' element={<Hotel />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
