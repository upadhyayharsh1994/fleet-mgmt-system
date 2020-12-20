import React from "react";
import { BusDetailForm } from './BusDetailForm';

export class SpecificBusDetail extends React.Component{

    constructor(props)
    {
        super(props);

        this.state={
            busId : undefined,
            busDetails:{}
        }
    }


    componentWillReceiveProps(props)
    {
        var busDetail={
            busName:"Nano",
            makeYear:"2001",
            noOfWheels:"4",
            odometerReading:"20000",
            airConditioned:"true",
            capacity:"4",
            busStatus:"readyToUse",
            garageId:"2",
            scheduledDate:"01/01/2021"
        };
        // api call

        this.setState({
            busId:props.id,
            busDetails:busDetail
        })

        
    
    }


    render()
    {
       return (
           <div>
                <BusDetailForm busObject={this.state.busDetails} update={true}></BusDetailForm>
            </div>

       );
    }
}