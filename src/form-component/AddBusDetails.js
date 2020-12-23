import React from "react";
import { BusDetailForm } from '../form/BusDetailForm';

export class AddBusDetails extends React.Component{
    render(){
        var busObject = {
            garageId:1,
            status:"readyToUse"
        };
       return (
           <div>
               {/* Form Component is rendered with empty object since new bus is to be saved */}
                <BusDetailForm busObject={busObject} update={false}></BusDetailForm>
            </div>
       );
    }
}

