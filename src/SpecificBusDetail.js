import React from "react";

export class SpecificBusDetail extends React.Component{

    constructor(props)
    {
        super(props);

        this.state={
            busId : props.id
        }
    }

    componentWillReceiveProps(props)
    {
        this.setState({
            busId:props.id
        })
    }


    render()
    {
        return(
        <p> Id is {this.state.busId}</p>
        );
    }
}