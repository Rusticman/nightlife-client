import React,{Component} from 'react';
import Login from '../components/auth/login';
import SearchBar from '../components/search_bar';

class Homepage extends Component{
  
render(){

  return(
    <div className="titleContainer">
      <h1 className="title">howl at the moon</h1>
      <div className={" moonImgContainer "+ this.props.moonChange}>
      <div className="imgHolder">
         <img src="../../style/img/moon-yellow.png" className={"yellowMoon "+ this.props.yellowMoonChange}  />
         <img src="../../style/img/moon.png" className={"blueMoon " + this.props.moonColour} />
      </div>
      </div>
      <Login auth={this.props.auth} />
      <SearchBar getSearchData={this.props.getSearchData}
                 moonColourBack={this.props.moonColourBack}
                 moonColourForth={this.props.moonColourForth}
                 />
    </div>
  )
}
//

}


export default Homepage;
