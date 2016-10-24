import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import { default as Fade } from 'react-fade';

class PhotoStory extends React.Component {
  constructor(props) {
    super(props);
//state contains an array of photos, and an array of currentPhotos  which will be rendered, and an index to see what photo will be rendered when the next or previous buttons are clicked
    this.state = {
      photos: [],
      currentPhotos: [],
      currentPhotoIndex: 1
    };
  }
//get request for photos, filters photos for ones with all image sizes, and then sets the state for photos with the whole array, and sets the currentPhoto which will be rendered (setState triggers rendering)
  getPhotos(source, section, time) {
    axios
    .get('api/Large', {
      params: {
        source: source || 'all',
        section: section || 'all',
        time: time || '24',
        limit: 20,
        offset: 0
      }
    })
    .then((response) => {
      var multimediaPhotos = response.data.results
      .filter((photo) => photo.multimedia.length === 4);
      this.setState({
        photos: multimediaPhotos,
        currentPhotos: multimediaPhotos.slice(0, this.state.currentPhotoIndex)
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
//this function is triggered when the next article button is clicked
  getNextPhoto(e) {
    //e is the event passed in from the click event
    //the if statement is to make sure only indices in the array are rendered
    //prevent default is needed to prevent the default action and the whole page from reloading
    var index = this.state.currentPhotoIndex + 1;
    var last = this.state.photos.length - 1;
    if(index > last) {
      e.preventDefault();
      return null;
    }
    var photos = this.state.photos.slice(index - 1, index);
    this.setState({
      currentPhotoIndex: index,
      currentPhotos: photos
    });
    e.preventDefault();
  }
//triggered when previous button is clicked, same idea as getNextPhoto()
  getPreviousPhoto(e) {
    var index = this.state.currentPhotoIndex - 1;
    if(index < 1) {e.preventDefault(); return null;}
    var photos = this.state.photos.slice(index - 1, index);
    this.setState({
      currentPhotoIndex: index,
      currentPhotos: photos
    });
    e.preventDefault();
  }
//get request to get photos from nytimes whne the component is mounted
  componentDidMount() {
    this.getPhotos('all', 'all', '24');
  }

//renders the current photo, buttons, and abstract for the photo
  render() {
    return (
      <div>
        <Fade duration={.8}>
        {this.state.currentPhotos.map((photo, i) =>
              <div style={divStyles} key={i} >
                <a style={center} href={photo.url}>
                  <img className="grow" src={photo.multimedia[3].url} />
                </a>
                <div>
                    <button style={buttonRight} onClick={this.getNextPhoto.bind(this)}>Next</button>
                    <button style={buttonLeft} onClick={this.getPreviousPhoto.bind(this)}>Previous</button>
                </div>
                <div style={centerAbstract}>{photo.abstract}</div>
              </div>
        )}
        </Fade>
      </div>
    )

  }
}

//styles to attach to style attribute of elements
//inlines styles- yeah
var center = {
  'text-align': 'center'
}
var centerAbstract = {
     'width': '50%',
     'height': '50%',
     'margin': '0 auto',
     'font-family': 'avenir',
     'font-size': '1.2em',
}
var buttonRight = {
  'background-color': 'white',
   'border-radius': '8px',
   'margin': '3px',
   'width': '20%',
   'float': 'right'
}
var buttonLeft = {
  'background-color': 'white',
   'border-radius': '8px',
   'margin': '3px',
   'width': '20%',
   'float': 'left'
}
var divStyles = {
  'color': 'black',
  'fontFamily': 'sans-serif',
  'display': 'flex',
  'justify-content': 'center',
  'flex-direction':'column',
  'align-text': 'center',
  'padding': '5px',
  'margin': '5px'
}

export default PhotoStory;
