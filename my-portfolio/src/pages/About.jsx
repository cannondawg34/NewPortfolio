import '../GameSite/css/styles.css';
import profpic from '../GameSite/images/profpic.JPG';  // ✅ Import the image

function About() {
  return (
    <main>
      <div className="about-section">
        <h2 className="about-header">Welcome to My "About Me" Page</h2>
        
        {/* ✅ Use the imported image variable */}
        <img src={profpic} alt="Cannon Dyer" className="profile-photo" />  

        <div className="about-box">
          <p>
            Hello! My name is Cannon Dyer, and I’m a senior Computer Science student at the University of Georgia. 
            I built this website to showcase my academic and passion projects.
          </p>
          <p>
            My journey into the tech world began in 6th grade when my dad gifted me my first PC. 
            That sparked my curiosity about computers, and I’ve been obsessed ever since. 
            Today, I channel that passion into developing software, designing innovative game projects, 
            and exploring the boundless possibilities of Computer Science.
          </p>
          <p>
            When I’m not coding or working on game projects, you can find me playing basketball, 
            lifting weights, exploring the outdoors, gaming, or spending time with friends. 
            Thanks for visiting my site — I hope you enjoy my work!
          </p>
        </div>
      </div>
    </main>
  );
}

export default About;
