import React from "react";

import {SpecificBusDetail} from './right-panel/SpecificBusDetail';
import {AddBusDetails} from './form-component/AddBusDetails';
import './box.css';
import { BusResaleValue } from './right-panel/BusResaleValue';
import {Card} from "react-bootstrap";
import axios from 'axios';


export class BusDetails extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state={
            isBusDetails:false,
            busData:[]
        }
    }

    componentWillReceiveProps(props)
    {
        var busData = [];
         axios.get('http://localhost:8080/fleet/getAllDetails').then((response) => {
            if(response)
            {
                for(var busDetails of response.data)
                {
                    busData.push(busDetails);
                }
            }

            this.setState({
                busData:busData,
                isBusDetails:false
            })

        });
    }

    componentWillMount()
    {

        var busData = [];
        axios.get('http://localhost:8080/fleet/getAllDetails').then((response) => {
            if(response)
            {
                for(var busDetails of response.data)
                {
                    busData.push(busDetails);
                }
            }

            this.setState({
                busData:busData,
                isBusDetails:false
            })
            console.log(this.state.busData);

        });


    }

    busDetailsClicked(busId) {

        this.setState({
            busId:busId,
            isBusDetails:true
        });

    }
   


    render(){
        return(
            <div class="floar-container"> 
                <div className="grid">
                    {this.state.busData.map((bus) => {
                       return(<Card style={{ width: '5rem' }} className="box" onClick={() => this.busDetailsClicked(bus.busId)}>
                       <Card.Img variant="top" src={`data:image/jpeg;base64,${bus.image}`} className="img"/>
                           <Card.Body>
                               <Card.Title className="title">{bus.busName}</Card.Title>
                           </Card.Body>
                       </Card>)
                    })}
                </div>
                <div className="float-child">
                    <div>
                    {
                     (this.state.isBusDetails ?  <SpecificBusDetail id={this.state.busId}></SpecificBusDetail> :<AddBusDetails/>)
                    }   
                    </div>
                    <div>
                        {
                        (this.state.isBusDetails ?  <BusResaleValue id={this.state.busId}></BusResaleValue> : "")
                        }
                    </div>
                </div>
            </div>
        );
    }
}
