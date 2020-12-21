import React from "react";

import {SpecificBusDetail} from './SpecificBusDetail';
import {AddBusDetails} from './form-component/AddBusDetails';
import './box.css';

import {Card,Button} from "react-bootstrap";
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
                       <Card.Img variant="top" src="holder.js/100px180" />
                           <Card.Body>
                               <Card.Title>{bus.busName}</Card.Title>
                               <Card.Text>
                                  
                               </Card.Text>
                               <Button variant="primary">Go somewhere</Button>
                           </Card.Body>
                       </Card>)
                    })}
                </div>
                <div className="float-child">
                    {
                     (this.state.isBusDetails ?  <SpecificBusDetail id={this.state.busId}></SpecificBusDetail> :<AddBusDetails/>)
                    }   
                </div>
            </div>
        );
    }
}
