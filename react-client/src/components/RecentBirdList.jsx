import React from 'react';
import RecentBird from './RecentBird.jsx';

const RecentBirdList = ({ recentBirds, birdStatsArr }) => {
  return (
    <div className="recent-bird-list">
      There are {recentBirds.length} recent sightings
      { recentBirds.map((bird, index) => {return <RecentBird bird={bird} key={index}/>})}
    </div>
  )
}

export default RecentBirdList;