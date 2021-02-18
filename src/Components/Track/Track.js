import React from 'react';
import './Track.css';

export default class Track extends React.Component{
    constructor(props){
        super(props);

        this.addTrack = this.addTrack.bind(this);
    }

    // creates a button with a + or - button based on the conditional statement
    renderAction(){
        if(this.props.isRemoval){
            return <button className="Track-action">-</button>
        }
        return <button  className="Track-action" onClick={this.addTrack}>+</button>
    }

    addTrack(){
        this.props.onAdd(this.props.track)
    }

    render(){
        return (
            <div className="Track">
                
                <div className="Track-information"> 
                    {/* displays track information from the track object */}
                    <h3>Title: {this.props.track.name}</h3>
                    <p> Artist: {this.props.track.artist} |  Album: {this.props.track.album} </p>
                </div>
                {/* displays a + or - button */}
                {this.renderAction()}
            </div>
        )
    }
}