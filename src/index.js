import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link} from 'react-router-dom';

import {BusDetails} from './BusDetails';


class RootClass extends React.Component
{
  render()
  {
    return(
      <BrowserRouter>
        <div>
          <Route path="/" component={BusDetails}/>
        </div>
      </BrowserRouter>
    );
  }
}

render(<RootClass />, window.document.getElementById('root'));
