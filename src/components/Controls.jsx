import React, { Component } from 'react';

class Controls extends Component {
    
    render() { 

        const {onSearchInput, onNameOrderInput } = this.props;

        return (
           <>
           <input onInput={onSearchInput} type="text"/>
           <select onInput={onNameOrderInput} >
            <option value=""></option>
            <option value="A to Z">A to Z</option>
            <option value="Z to A">Z to A</option>
           </select>
           </> 
        );
    }
}
 
export default Controls;