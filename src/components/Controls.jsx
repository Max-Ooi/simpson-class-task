import React, { Component } from 'react';

class Controls extends Component {
    
    render() { 
        return (
           <>
           <input onInput={this.props.onSearchInput} type="text"/>
           </> 
        );
    }
}
 
export default Controls;