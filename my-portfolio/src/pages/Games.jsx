import '../GameSite/css/styles.css';
import gameThumb1 from '../GameSite/images/SDVthumb.PNG';
import gameThumb2 from '../GameSite/images/background1.jpg';

function Games() {
  return (
    <main>
      <section className="games-section">
        <h2>Explore and Download My Games</h2>

        <div className="games-container">
          {/* Game 1 */}
          <div className="game-card">
            <img src={gameThumb1} alt="Game 1 Thumbnail" className="game-thumb" />
            <h3>Super Dragon Vanguard</h3>
            <p>An immersive on-rails shooter game. Choose your paths and explore!</p>
            <a href="/downloads/SuperDragonVanguardBeta.zip" className="download-btn" download>
            Download
            </a>
          </div>

          {/* Game 2 */}
          <div className="game-card">
            <img src={gameThumb2} alt="Game 2 Thumbnail" className="game-thumb" />
            <h3>Game Title 2</h3>
            <p>Brief description of the game goes here. Highlight its features or genre.</p>
            <a href="/downloads/game2.zip" className="download-btn" download>
              Download
            </a>
          </div>
        </div> {/* ✅ closes .games-container */}
      </section>
    </main>
  );
}

export default Games;