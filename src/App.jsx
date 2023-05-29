import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";

class App extends Component {
  state = {};



  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`
    );

    //fixed the api data to have unique id
    data.forEach((element, index) => {
      element.id = index + Math.random();
    });

    this.setState({ simpsons: data });

    console.log(this.state.simpsons)
  }




  onLikeToggle = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];
    //invert if liked or not liked
    simpsons[indexOf].liked = !simpsons[indexOf].liked;
    this.setState({ simpsons });
  };




  onDelete = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];
    simpsons.splice(indexOf, 1);
    this.setState({ simpsons });
  };


  onSearchInput = (e) => {
    this.setState({searchInput: e.target.value})
  }



  render() {

    console.log(this.state);

    const { simpsons, searchInput } = this.state;

    if (!simpsons) return <Loading />;

    if (simpsons.length === 0) return <p>You deleted everything!</p>;


    //calculate the total
    let total = 0;
    simpsons.forEach((char) => {
      if (char.liked) total++;
    });


    //calculate the data we want to show

    let filteredSimpsons = [...simpsons]

    if (searchInput) {

      filteredSimpsons = filteredSimpsons.filter((item)=>{
        
        if (item.character.toLowerCase().includes(searchInput.toLowerCase()))
        {return true;}

      })
    }


    return (
      <>
        <h1>Total no of liked chars #{total}</h1>
        <Simpsons
          simpsons={filteredSimpsons}
          onDelete={this.onDelete}
          onLikeToggle={this.onLikeToggle}
          onSearchInput={this.onSearchInput}
        />
      </>
    );
  }
}



export default App;
