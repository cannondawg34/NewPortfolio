// src/components/GameCard.jsx
import { motion } from "framer-motion";

function GameCard({ thumb, title, description, download }) {
  return (
    <motion.div
      className="game-card"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img src={thumb} alt={`${title} Thumbnail`} className="game-thumb" />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={download} className="download-btn" download>
        Download
      </a>
    </motion.div>
  );
}

export default GameCard;