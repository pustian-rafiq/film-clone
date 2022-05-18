
import './App.scss';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Watch from './pages/watch/Watch';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
function App() {
  const user = false;
  return (
    <div >
      <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Navigate to={user ? "/" : "/register"} />} />  
      <Route path='login' element={<Navigate to={user ? "/" : "/login"} />} />  
        {/* {
            user ?
              <Route path='/' element={<Home />} />
              :
              <Route path='register' element={<Register />} />
          }
       
        <Route path='register'>
          {
            !user ?
              <Route path='register' element={<Register />} />
              :
              <Route path='/' element={<Home />} />
          }
        </Route>   */}
        {
          user &&
          <>
            <Route  path='/' element={<Home />} />
            <Route path='movies' element={<Home type="movies" />} />
            <Route path='series' element={<Home type="series" />} />
            <Route path='watch' element={<Watch />} />
          </>

        }
         {
          !user &&
          <>
            {/* <Route path='/' element={<Home />} /> */}
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </>
        }   
          <Route path='/login' element={<Login />} />
          <Route path='*' element={ <Navigate to={user ? "/" : "/login"} />}  />  
        {/* <Route path='/' exact element={<Home type="movies" />} /> */}
      </Routes>
    </div>
  );
}

export default App;
