import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import axios from 'axios';
import { default as Fade } from 'react-fade';

//This component fetches saved links from the database and renders saved count
class Saved extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    };
  }
//get request to server which sends get request to the db
  getLinks() {
    axios.get('api/article')
      .then((res) => {
        console.log(res, "dbLinks get res recieved");
        //res is an object with property data containing array of ulrs
        //res mapped in articleRoutes.js to just be the url
        var links = [];

        //noRepeats should = an object with each link in the database with its number of occurances so that images are only rendered once,
        //hence no repeats
        var noRepeats = res.data.reduce((obj, cur)=> {
          if(!(cur in obj)){
            obj[cur] = 1;
            return obj;
          } else {
            obj[cur] = obj[cur] + 1;
            return obj;
          }
        }, {});
        for (var key in noRepeats) {
          links.push({url:key, count:noRepeats[key]});
        }
        this.setState({links: links});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getLinks();
  }

  render() {
    return (
      <div>
        <h2>Saved Stories</h2>
        <div className="savedContainer">
          {this.state.links.map((link, i) =>
            <Fade>
            <div className="saved" key={i*10}>
              <a className="showCount" href={link.url}>
                <img className="savedImg" src={link.url} />
              </a>
              <div className="revealCount"> Save Count: {link.count} </div>
            </div>
            </Fade>
          )}
        </div>
      </div>
    )
  }
}

//see class .revealCount in style.css for on hover effects

export default Saved;
