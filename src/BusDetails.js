import React from "react";

import {SpecificBusDetail} from './SpecificBusDetail';
import './box.css';
import { busData } from './busData'
import {Card,Button} from "react-bootstrap";


export class BusDetails extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state={
            isBusDetails:false,
            busData:[]
        }

        console.log(this.state.isBusDetails);
      //  this.busDetailsClicked = this.busDetailsClicked.bind(this);
      //  this.getAllDetails = this.getAllDetails.bind(this);
    }


    componentDidMount()
    {
        this.setState({
            isBusDetails:false
        })
        console.log("DidMount");
    }

    componentWillMount()
    {
        var tempBusData = []
        
        for(var bus of busData)
        {
            tempBusData.push(bus);
        }

        this.setState({
            busData:tempBusData,
            isBusDetails:false
        })

        console.log("WillMount");

        console.log(this.state.isBusDetails);

    }

    busDetailsClicked(busId) {
        console.log("Clicked"+busId);

        this.setState({
            busId:busId,
            isBusDetails:true
        });

        console.log(this.state.isBusDetails);
    }
   

    
    render(){
        return(
            <div class="floar-container"> 
                <div className="grid">
                    {this.state.busData.map((bus) => {
                       return(<Card style={{ width: '5rem' }} className="box" onClick={() => this.busDetailsClicked(bus.id)}>
                       <Card.Img variant="top" src="holder.js/100px180" />
                           <Card.Body>
                               <Card.Title>{bus.title}</Card.Title>
                               <Card.Text>
                                  
                               </Card.Text>
                               <Button variant="primary">Go somewhere</Button>
                           </Card.Body>
                       </Card>)
                    })}
                </div>
                <div className="float-child">
                    {
                     (this.state.isBusDetails ?  <SpecificBusDetail id={this.state.busId}></SpecificBusDetail> : " ")
                    }   
                </div>
            </div>
        );
    }
}
