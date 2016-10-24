import React from 'react';
import { default as Fade } from 'react-fade';

//creating template for small photos for the monthly("SmallPhotos") component
// maps over the results and renders each photo
// retrieves url for the medium sized images, there are small ('thumbnail') photos available
//with this api, but we found that resizing the photos in css produced a clearer image
//you can adjust the image size you want by altering item you are accessing in the multimedia array

var PhotoEntry = ({photos, handleSearchParamChange}) => (
	<div className="smallPhotos">
	{photos.map((photo, i) =>
		<Fade duration={.8}>
     <div>
       <a href={photo.url}>
         <img className="smallPhotoItem" src={photo.multimedia[2].url} />
       </a>
    </div>
		</Fade>
   )}
 </div>
)


export default PhotoEntry;
