import React from 'react';
import { default as Fade } from 'react-fade';
// this is the component for the weekly photos
// maps over the results and renders each photo
// retrieves url for the medium sized images
var MediumPhotoEntry = ({mediumPhotos}) => (
  <div className="medium-photos">
    {mediumPhotos.map((photo, i) =>
      <Fade duration={.8}>
      <a href={photo.url} key={i}>
        <img className="medium-item" src={photo.multimedia[2].url} />
      </a>
      </Fade>
    )}
  </div>
);

export default MediumPhotoEntry
