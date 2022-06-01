import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import { FooterComponent } from './components/FooterComponent';
import ListProcesoComponent from './components/ListProcesoComponent';
import AddProcesoComponent from './components/AddProcesoComponent';
import ViewProcesoComponent from './components/ViewProcesoComponent';
import UpdateProcesoComponent from './components/UpdateProcesoComponent';
import SignIn from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Main from './components/Main'
import Profile from './components/auth/Profile';

import './App.css';
import AuthVerify from './components/AuthVerify';
import AdminCandidatosComponent from './components/AdminCandidatosComponent';


function App() {


  return (
    <div className="App">
      <Router >
        <AuthVerify />
        <HeaderComponent />

        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<SignIn />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/proceso' element={<ListProcesoComponent />}></Route>
          <Route path='/add-proceso' element={<AddProcesoComponent />}></Route>
          <Route path='/edit-proceso/:id' element={<UpdateProcesoComponent />}></Route>
          <Route path='/view-proceso/:id' element={<ViewProcesoComponent />}></Route>
          <Route path='/candidatos' element={<AdminCandidatosComponent />}></Route>
        </Routes>


        <FooterComponent />
      </Router>
    </div >
  );
}

export default App;
