import React from 'react';
import './index.css';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import {Header} from './header/Header';

import {BusDetails} from './BusDetails';


//Root Class to define route for home page
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