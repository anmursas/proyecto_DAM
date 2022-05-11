import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import { FooterComponent } from './components/FooterComponent';
import ListProcesoComponent from './components/ListProcesoComponent';
import AddProcesoComponent from './components/AddProcesoComponent';
import ViewProcesoComponent from './components/ViewProcesoComponent';
import UpdateProcesoComponent from './components/UpdateProcesoComponent';
import SignIn from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Checkout from './components/Main'
import Profile from './components/auth/Profile';

import './App.css';
import AuthVerify from './components/AuthVerify';


function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent />

        <Routes>
          <Route exact path='/' element={<Checkout />}></Route>
          <Route path='/login' element={<SignIn />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/singup' element={<SignUp />}></Route>
          <Route path='/proceso' element={<ListProcesoComponent />}></Route>
          <Route path='/add-proceso' element={<AddProcesoComponent />}></Route>
          <Route path='/edit-proceso/:id' element={<UpdateProcesoComponent />}></Route>
          <Route path='/view-proceso/:id' element={<ViewProcesoComponent />}></Route>
        </Routes>
        <AuthVerify />

        <FooterComponent />
      </Router>
    </div >
  );
}

export default App;
