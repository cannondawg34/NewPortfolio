// src/pages/Games.jsx
import '../GameSite/css/styles.css';
import gameThumb1 from '../GameSite/images/SDVthumb.PNG';
import gameThumb2 from '../GameSite/images/topdownrpgthumbnail.PNG';
import GameCard from '../components/GameCard.jsx';

// 🔑 Import videos (place them in /public/videos or src/videos)
//import gameVideo1 from '../GameSite/videos/SDVdemo.mp4';
//import gameVideo2 from '../GameSite/videos/MysticQuestDemo.mp4';

function Games() {
  // Centralized game data
  const GAMES = [
    {
      thumb: gameThumb1,
      video: null, 
      title: "Super Dragon Vanguard",
      description: "An immersive on-rails shooter game. Choose your paths and explore!",
      download: "/downloads/SuperDragonVanguardBeta.zip",
    },
    {
      thumb: gameThumb2,
      video: null,
      title: "[UNTITLED] Top Down RPG",
      description: "A story-driven RPG adventure with puzzles and epic battles.",
      download: "/downloads/game2.zip",
    },
  ];

  return (
    <main>
      <section className="games-section">
        <h2>Check Out My Games!</h2>

        <div className="games-container">
          {GAMES.map((game, idx) => (
            <GameCard key={idx} {...game} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Games;
