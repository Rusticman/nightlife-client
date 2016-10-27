import React,{Component} from 'react';


class SearchResults extends Component{

componentWillMount(){
  const {attendingArray,venues} = this.props;


}

goingToVisitVenue(event){
const arrayIndex = event.target.className;

  if(event.target.id === 'notGoingButton'){
    return this.props.userConfirmingAttendance(true, this.props.attendingArray,arrayIndex);
  }
  else{
    return this.props.userConfirmingAttendance(false,this.props.attendingArray,arrayIndex);
  }

}

populateListItems(){
 const visitVenue = this.goingToVisitVenue.bind(this)
  const {searchData,venues,auth,attendingArray} = this.props;
 const userID = sessionStorage.getItem('id');


  return searchData.map(function(item,i){
var userAttendanceButton;
 if(attendingArray[i].visitors.indexOf(userID)){//if user confirmed attendance, change button to 'not going'
   userAttendanceButton = <button id="notGoingButton" className={i} onClick={visitVenue}>not going</button>;
 }
 else{
   userAttendanceButton = <button id="goingButton" className={i} onClick={visitVenue}>going</button>;
 }
    var attendingWrapper;

    if(auth){
      if(attendingArray[i].attendance === 0){
        attendingWrapper = <div className="attendingWrapper">
                              <span>Nobody going.</span><br/>
                              {userAttendanceButton}
                            </div>

      } else if(attendingArray[i].attendance === 1){
        attendingWrapper =  <div className="attendingWrapper">
        <span>{attendingArray[i].attendance}</span><span> person is going</span><br/>
        {userAttendanceButton}
        </div>

      } else{
        attendingWrapper =  <div className="attendingWrapper">
        <span>{attendingArray[i].attendance}</span><span> people are going</span><br/>
        {userAttendanceButton}
        </div>
      }
    }
    else{
      attendingWrapper = <div className="attendingWrapper">
      You need to login to confirm attendance.
      </div>
    }

    return(

      <div key={item.name} className="listItem">
      <a href={item.url} target="_blank">
      <img src={item.image_url} className="listImg" />
      <span className="listTitle">{item.name}</span><br/>
      <span className="listDescription">{'"' + item.snippet_text + '"'}</span>
      </a>
      {attendingWrapper}
      </div>

    )
  })

}



render(){
const {error} = this.props;

if(error){
  return <div className="errorMessage">{error}</div>
}
  return(
    <div className="listContainer">
    <div className="listWrapper">
    {this.populateListItems()}
    </div>
    </div>
  )
}




}


export default SearchResults;
