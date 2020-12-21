import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import {Header} from './header/Header';

import {BusDetails} from './BusDetails';

import {AddBusDetails} from './form-component/AddBusDetails';


class RootClass extends React.Component
{
  render()
  {
    return(
      <BrowserRouter>
        <Header/>
        <h1 className='h1'>Fleet Management System</h1>
        <div>
          <Route exact path="/" component={BusDetails}/>
        </div>
      </BrowserRouter>
    );
  }
}

render(<RootClass />, window.document.getElementById('root'));