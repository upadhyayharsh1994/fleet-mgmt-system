import React from "react";
import { Redirect } from 'react-router-dom';
import { BusDetailForm } from '../form/BusDetailForm';

export class AddBusDetails extends React.Component{



    render()
    {
        var busObject = {};
       return (
           <div>
                <BusDetailForm busObject={busObject} update={false}></BusDetailForm>
            </div>

       );
    }


}

