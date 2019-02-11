import React from 'react';

const RecentBird = ({bird}) => {

  return (
    <div className="recent-bird">
      {/* {console.log(bird)} */}
      { bird.comName }
      <div className="sci-name">{ bird.sciName }</div>
      <div>Number seen: {bird.howMany}</div>
      <div>Date: {bird.obsDt}</div>
      
    </div>

  )
}

export default RecentBird;