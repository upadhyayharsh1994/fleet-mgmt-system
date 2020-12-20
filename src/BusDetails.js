import React from "react";

import {SpecificBusDetail} from './SpecificBusDetail';

import {BusDetailGrid} from './BusDetailGrid';

import { busData } from './busData'

export class BusDetails extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state={
            isBusDetails:false,
            busData:[]
        }

        this.busDetailsClicked = this.busDetailsClicked.bind(this);
        this.getAllDetails = this.getAllDetails.bind(this);
    }


    componentWillMount()
    {
        var tempBusData = []
        
        for(var bus of busData)
        {
            tempBusData.push(bus);
        }

        this.setState({
            busData:tempBusData
        })

    }

    busDetailsClicked(busId) {
        console.log("Clicked"+busId);

        this.setState({
            busId:busId,
            isBusDetails:true
        });
    }

    render(){
        return(
            <div>
                <div>
                    {this.state.busData.map((bus) => {
                       return(<div onClick={() => this.busDetailsClicked(bus.id)}> <BusDetailGrid busId={bus.id} busImage={bus.img} busTitle={bus.title}/></div>)
                    })}
                </div>
                <div>
                    {
                     (this.state.isBusDetails ?  <SpecificBusDetail id={this.state.busId}></SpecificBusDetail> : " ")
                    }   
                </div>
            </div>
        );
    }
}

