import React from 'react';

const RecentBirdStats = ({ birdStatsArr }) => {
  return(
    <div className="recent-bird-stats">
      <h2>Recent Birb Observations!</h2>
      <table>
        <thead>
          <tr>
            <th>Bird Species</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
        {birdStatsArr.map((bird, index) => {
          let birdName = bird[0].replace(/'+/g,'').replace(/ +/g,'_');
          // console.log(birdName);
          

          return <tr key={index}><td><a target="_blank" href={`https://www.allaboutbirds.org/guide/${birdName}`}>{bird[0]}:</a></td><td>{bird[1]}</td></tr>;
        })}
        </tbody>
      </table>
      
    </div>
  )
}


export default RecentBirdStats;