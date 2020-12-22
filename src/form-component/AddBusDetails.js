import React from "react";
import { Redirect } from 'react-router-dom';
import { BusDetailForm } from '../form/BusDetailForm';

export class AddBusDetails extends React.Component{



    render()
    {
        var busObject = {
            garageId:1,
            status:"readyToUse"
        };
       return (
           <div>
                <BusDetailForm busObject={busObject} update={false}></BusDetailForm>
            </div>

       );
    }


}

