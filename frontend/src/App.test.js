import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';
import {within} from '@testing-library/dom'
import ListProcesoComponent from './components/ListProcesoComponent';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import SignUp from './components/auth/SignUp';
import AddProcesoComponent from './components/AddProcesoComponent';
import Main from './components/Main';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('login without crashing', () => {
  const div = document.createElement('App');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
})
// it('profile without crashing', () => {
//   const div = document.createElement('App');
//   ReactDOM.render(<Profile />, div);
//   ReactDOM.unmountComponentAtNode(div);
// })
// it('signup without crashing', () => {
//   const div = document.createElement('App');
//   ReactDOM.render(<SignUp />, div);
//   ReactDOM.unmountComponentAtNode(div);
// })
// it('add without crashing', () => {
//   const div = document.createElement('App');
//   ReactDOM.render(<AddProcesoComponent />, div);
//   ReactDOM.unmountComponentAtNode(div);
// })

// it('renders password', () => {
//   render(<App />);
//   const {getByText} = within(screen.getByTestId('test-id'))
//   expect(getByText('password')).toBeInTheDocument();
// })