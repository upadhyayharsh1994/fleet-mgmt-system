import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';

export class BusDetailGrid extends React.Component
{


    constructor(props)
        {
            super(props);
            this.state={
                busId:props.busId,
                busImage:props.busImage,
                busTitle:props.busTitle
            }

            console.log(props.busId+" "+props.busTitle);
        }

      classes = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        },
        gridList: {
          width: 500,
          height: 500,
        },
        titleBar: {
          background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        icon: {
          color: 'rgba(255, 255, 255, 0.54)',
        },
      }));


     render()
     {
        return (
        <div>            
            <GridList cellHeight={300}  spacing={30} className={this.classes.gridList}>
                <GridListTile key={this.props.busImage}>
                <img src={this.props.busImage} alt={this.props.busTitle} />
                    <GridListTileBar
                        title={this.props.busTitle}
                        actionIcon={
                        <IconButton aria-label={`info about ${this.props.busTitle}`} className={this.classes.icon}>
                        </IconButton>
                        }
                    />
                </GridListTile>
            </GridList>
        </div>
        );
     }
}