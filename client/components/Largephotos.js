import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import axios from 'axios';
import Select from 'react-select';
import { default as Fade } from 'react-fade';

class Large extends React.Component {
  constructor(props) {
    super(props);
    //values and options are for the Select module from React-select,
    //values contains all of the API searchable NY times sections, and is used to check if what is entered in the search bar is a valid section
    this.state = {
      photos: [],
      values: {
        all: 'all',
        arts: 'arts',
        blogs: 'blogs',
        books: 'books',
        briefing: 'briefing',
        business: 'business',
        food: 'food',
        health: 'health',
        magazine: 'magazine',
        movies: 'movies',
        'photos': 'multimedia/photos',
        'n.y.': 'n.y. / region',
        obituaries: 'obituaries',
        open: 'open',
        opinion: 'opinion',
        'public editor': 'public editor',
        'real estate': 'real estate',
        science: 'science',
        sports: 'sports',
        style: 'style',
        'sunday review': 'sunday review',
        't magazine': 't magazine',
        technology: 'technology',
        theater: 'theater',
        'today’s paper': 'today’s paper',
        travel: 'travel',
        'u.s.': 'u.s.',
        washington: 'washington',
        'week in review': 'week in review',
        well: 'well',
        world: 'world',
        'your money': 'your money'
      },
      //options populates Select module dropdown list, see react-select docs for more details
      options: [
        { value:  'all', label: 'all' },
        { value: 'arts', label: 'arts' },
        { value: 'blogs', label: 'blogs' },
        { value: 'books', label: 'books' },
        { value: 'briefing', label: 'briefing' },
        { value: 'business', label: 'business' },
        { value: 'food', label: 'food' },
        { value: 'health', label: 'health' },
        { value: 'magazine', label: 'magazine' },
        { value: 'movies', label: 'movies' },
        { value: 'multimedia', label: 'multimedia' },
        { value: 'multimedia/photos', label: 'photos' },
        { value: 'n.y. / region', label: 'new york' },
        { value: 'obituaries', label: 'obituaries' },
        { value: 'open', label: 'open' },
        { value: 'opinion', label: 'opinion' },
        { value: 'public editor', label: 'public editor' },
        { value: 'real estate', label: 'real estate' },
        { value: 'science', label: 'science' },
        { value: 'sports', label: 'sports' },
        { value: 'style', label: 'style' },
        { value: 'sunday review', label: 'sunday review' },
        { value: 'technology', label: 'technology' },
        { value: 'theater', label: 'theater' },
        { value: 'today’s paper', label: 'today' },
        { value: 'travel', label: 'travel' },
        { value: 'u.s.', label: 'u.s.' },
        { value: 'washington', label: 'washington' },
        { value: 'week in review', label: 'week in review' },
        { value: 'well', label: 'well' },
        { value: 'world', label: 'world' },
        { value: 'yougr money', label: 'your money' }
      ]
    };
  }
  //getNewImages checks if the key in the Select search bar is in values, this prevents some but not all api requests returning nothing
  getNewImages(value) {
    for(let key in this.state.values) {
      if(key === value) {
        this.getPhotos('all', value, '24');
      }
    }
  }
//get request to nytimes api, see their docs for details
  getPhotos(source, section, time, limit) {
    axios
    .get('api/Large', {
      //setting parameters for api, short circuiting the logical operator 'or', so if no source/section or time is entered, then there are default search params.
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
        //filters response to only keep articles with 4 sizes of photos, so the largest can be rendered
      this.setState({
        photos: multimediaPhotos
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getPhotos('all', 'all', '24');
  }

  saveLink(e) {
    //jquerry imported in index.html, used to access the src attribute on element that was clicked on which is avaiable on the event object
    axios.post('api/article', {
      articleImageUrl: $(e.currentTarget).attr('src')
    })
    .then((res) => console.log('success!')
    )
    .catch(function (error) {
      console.log(error);
    });
  }
// the photos from this.state and the saveLink method are passed down to LargePhotos
//saveLink is bound to this component so that when it is called outside of this component it will be executed with this context
  render() {
    return (
      <div>
      <div className="select">
      {/* Select is an npm module that creates a search bar... look it up */}
          <Select
            placeholder=""
            options={this.state.options}
            autosize={false}
            onInputChange={this.getNewImages.bind(this)}
            scrollMenuIntoView={false}
            searchable={true}
            matchProp={'value'}
          />
      </div>
      <div>
        <LargePhotos
          photos={this.state.photos}
          saveLink={this.saveLink.bind(this)}
        />
      </div>
      </div>
    )

  }
}
//stateless functional component for rendering images, could be placed in a separate file to improve modularity
// Fade is an npm module that fades components when they are rendered
//when mapping photos, something besides i should be used as the key because i will not be a unique id, but this does not cause problems in this situation
//if you look at the multimedia array in the photos object, the url at the 3rd index is the image with the greatest resolution
var LargePhotos = ({ photos, saveLink }) => (
  <Fade duration={.8}>
  <div className="largePhotos">
   {photos.map((photo, i) =>
         <div className="largePhoto"  key={i} >
           <a className="show" href={photo.url} target="_blank">
             <img className='showImg'  onClick={saveLink} src={photo.multimedia[3].url} />
           </a>
           <div className="reveal"> {photo.abstract} </div>
         </div>
   )}
   </div>
   </Fade>
)
//the classnames here enable the div with photo.abstract to only appear on hover
//export default enables this code to be imported without { }  (without object destructuring)
  //although you would need { } when importing if you export multiple things with export default
export default Large;
