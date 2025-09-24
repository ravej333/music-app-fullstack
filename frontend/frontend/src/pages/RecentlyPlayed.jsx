// src/pages/RecentlyPlayed.jsx
import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import RecentlyPlayedList from '../components/RecentlyPlayedList.jsx';

const RecentlyPlayed = () => {
  // Get both the data and the new clear function from the context
  const { recentlyPlayed, clearRecentlyPlayed } = useContext(PlayerContext);

  return (
    <div>
      <div className="page-header-with-action">
        <h1>Recently Played</h1>
        {/* NEW: Clear History Button */}
        {recentlyPlayed.length > 0 && (
          <button onClick={clearRecentlyPlayed} className="clear-history-btn">
            Clear History
          </button>
        )}
      </div>
      <RecentlyPlayedList songs={recentlyPlayed} />
    </div>
  );
};

export default RecentlyPlayed;