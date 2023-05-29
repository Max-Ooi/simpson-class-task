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


  onNameOrderInput = (e) => {
    this.setState({NameOrderInput: e.target.value})
  }



  getFilteredSimpsons = () => {


    const { simpsons, searchInput, NameOrderInput } = this.state;

    let filteredSimpsons = [...simpsons]

    //filter by the SearchInput box
    if (searchInput) {

      filteredSimpsons = filteredSimpsons.filter((item)=>{
        
        if (item.character.toLowerCase().includes(searchInput.toLowerCase()))
        {return true;}

      })
    }

    //Sort by Name order
    
    if (NameOrderInput === "A to Z") {
      filteredSimpsons.sort((a, b) => {
        if (a.character > b.character) return 1;
        if (a.character < b.character) return -1;
      }
      )
    } else if (NameOrderInput === "Z to A") {
      filteredSimpsons.sort((a, b) => {
        if (a.character > b.character) return -1;
        if (a.character < b.character) return 1;
      }
      )
    }

    return filteredSimpsons;

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


    return (
      <>
        <h1>Total no of liked chars #{total}</h1>
        <Simpsons
          simpsons={this.getFilteredSimpsons()}
          onDelete={this.onDelete}
          onLikeToggle={this.onLikeToggle}
          onSearchInput={this.onSearchInput}
          onNameOrderInput={this.onNameOrderInput}
        />
      </>
    );
  }
}



export default App;
