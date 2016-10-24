import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import axios from 'axios';
import PhotoEntry from './Photoentry.js';
import ImageLayout from 'react-image-layout';

class Small extends React.Component {

	constructor(props) {
		super(props)
			this.state = {
				photos: []
			}
	}

	getPhotos(source, section, time, limit) {
		axios.get('api/Large', {
			params: {
				source: 'all',
				section:'all',
				time: '168',
				limit: 50,
				offset: '50'
			}
		})
		.then((response )=>{
			var multimediaPhotos = response.data.results
        .filter((photo) => photo.multimedia.length === 4 )
        .splice(0,50)

      this.setState({
        photos: multimediaPhotos
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getPhotos();
  }
// updating state of small photos here, and passing down state into photo entry
	render() {
		return (
		<div>
		<h1> News From the Month </h1>
	     <PhotoEntry photos={this.state.photos} />
	    </div>
		)
	  }
	}


	export default Small;
