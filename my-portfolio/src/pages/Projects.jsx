// src/pages/Projects.jsx
import { useMemo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../GameSite/css/styles.css';

/* ---------------------------------------------------------------------------
   1) PROJECT DATA — the single source of truth the UI renders from
      Each project includes two extra fields to support filtering:
      - `stack`: array of technologies used (e.g., ['React', 'SQL'])
      - `type` : one category string (e.g., 'web', 'game', 'data')
   --------------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: 'Cinema E-Booking Website',
    slug: 'cinema-ebooking',
    thumb: '/images/cinema-ebooking.jpg',
    description:
      'Spring Boot + MySQL ticketing app with seat selection, showtimes, and admin management.',
    download: '/downloads/Cinema_E_Booking_System-main (2).zip',
    details: '/projects/cinema-ebooking',
    stack: ['Java', 'Spring Boot', 'SQL', 'HTML', 'CSS', 'React'],
    type: 'web',
  },
  {
    title: 'Video Game Query Website',
    slug: 'vg-query',
    thumb: '/images/video-game-query.jpg',
    description:
      'Flask web app to browse and filter video games with search, sorting, and charts.',
    download: '/downloads/Flask App (2).zip',
    details: '/projects/vg-query',
    stack: ['Python', 'Flask', 'SQL'],
    type: 'web', 
  },
  {
    title: 'NBA Predicting Stats',
    slug: 'nba-stats-predictor',
    thumb: '/images/nba-predictor.jpg',
    description:
      'Python/ML project that ingests JSON -> CSV and predicts per-game player stats.',
    download: '/downloads/NBA_Player_Props-main.zip',
    details: '/projects/nba-stats-predictor',
    stack: ['Python', 'Pandas', 'Sklearn'],
    type: 'data',
  },
  {
    title: 'Old Portfolio Website',
    slug: 'school-portfolio',
    thumb: '/images/school-portfolio.jpg',
    description:
      'Responsive personal site showcasing coursework and projects, built with React + Vite.',
    download: '/downloads/cannondyer-main.zip',
    details: '/projects/school-portfolio',
    stack: ['React', 'Vite', 'HTML', 'CSS'],
    type: 'web',
  },
  // NEW: Image Post Gallery (MERN)
  {
    title: 'Image Post Gallery (MERN)',
    slug: 'image-post-gallery',
    thumb: '/images/image-post-gallery.jpg',
    description:
      'React + Node/Express image gallery backed by MongoDB. Users upload images with titles/descriptions; posts render on the homepage with basic auth.',
    download: '/downloads/4300-Final-Project-main.zip',
    details: '/projects/image-post-gallery',
    stack: ['React', 'Node', 'Express', 'MongoDB', 'Axios', 'HTML', 'CSS'],
    type: 'web',
  },
  {
    title: 'DB Project: Linear Hashing Index',
    slug: 'db-proj3',
    thumb: '/images/db-proj3.jpg',
    description:
      'Java database systems project: implements a linear-hashing map for indexing, a Table abstraction, and a Tuple Generator for data.',
    download: '/downloads/DBProj3.zip',
    details: '/projects/db-proj3',
    stack: ['Java', 'Indexing', 'Linear Hashing'],
    type: 'data',
  },
  {
    title: 'TCP Client/Server (Java Sockets)',
    slug: 'java-tcp-sockets',
    thumb: '/images/java-tcp-sockets.jpg',
    description:
      'Java networking mini-project: TCP server on port 6789 and client using sockets, BufferedReader/DataOutputStream, and a tiny text protocol.',
    download: '/downloads/Networks_1.zip',
    details: '/projects/java-tcp-sockets',
    stack: ['Java', 'TCP'],
    type: 'systems',
  },
];

/* ---------------------------------------------------------------------------
   2) UTIL: derive unique filter options from the data
      - This keeps the UI and data in sync automatically.
      - `unique` returns a sorted array of unique strings.
   --------------------------------------------------------------------------- */
function unique(list) {
  return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b));
}

const ALL_STACKS = unique(PROJECTS.flatMap((p) => p.stack || []));
const ALL_TYPES  = unique(PROJECTS.map((p) => p.type).filter(Boolean));

/* ---------------------------------------------------------------------------
   3) PRESENTATIONAL CHIP COMPONENT
   --------------------------------------------------------------------------- */
function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`chip ${active ? 'chip--active' : ''}`}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

// --- Page -------------------------------------------------------------------
export default function Projects() {
  const location = useLocation();

  // Smoothly scroll to the top of the Projects list when URL hash is #projectsTop
  useEffect(() => {
    if (location.hash === '#projectsTop') {
      const el = document.getElementById('projectsTop');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  const [query, setQuery] = useState('');
  const [stacks, setStacks] = useState(() => new Set());
  const [types, setTypes] = useState(() => new Set());

  const toggle = (set, value) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value); else next.add(value);
    return next;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PROJECTS.filter(p => {
      const matchesQuery = !q || [
        p.title,
        p.description,
        ...(p.stack || []),
        p.type,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q);

      const matchesStacks =
        stacks.size === 0 || (p.stack || []).some(s => stacks.has(s));

      const matchesTypes =
        types.size === 0 || (p.type && types.has(p.type));

      return matchesQuery && matchesStacks && matchesTypes;
    });
  }, [query, stacks, types]);

  const clearAll = () => {
    setQuery('');
    setStacks(new Set());
    setTypes(new Set());
  };

  return (
    <main>
      {/* Anchor target: this is where the button lands on /projects#projectsTop */}
      <section id="projectsTop" className="projects-section">
        <h2>All Projects</h2>

        {/* Filters Bar */}
        <div className="filters-bar" role="region" aria-label="Project filters">
          <div className="filters-row">
            <label htmlFor="project-search" className="visually-hidden">Search projects</label>
            <input
              id="project-search"
              type="search"
              placeholder="Search by title, tech, or description..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="input"
            />
            <button type="button" className="btn btn--ghost" onClick={clearAll}>
              Clear
            </button>
          </div>

          <div className="filters-row">
            <span className="filters-label">Type:</span>
            <div className="chips">
              {ALL_TYPES.map(t => (
                <Chip
                  key={t}
                  active={types.has(t)}
                  onClick={() => setTypes(prev => toggle(prev, t))}
                >
                  {t}
                </Chip>
              ))}
            </div>
          </div>

          <div className="filters-row">
            <span className="filters-label">Stack:</span>
            <div className="chips">
              {ALL_STACKS.map(s => (
                <Chip
                  key={s}
                  active={stacks.has(s)}
                  onClick={() => setStacks(prev => toggle(prev, s))}
                >
                  {s}
                </Chip>
              ))}
            </div>
          </div>

          <div className="filters-meta" aria-live="polite">
            Showing {filtered.length} of {PROJECTS.length}
          </div>
        </div>

        {/* Grid */}
        <div className="project-grid">
          {filtered.map((p) => (
            <div className="project-card" key={p.slug}>
              {/* Thumbnail removed */}
              <h3>{p.title}</h3>
              <p>{p.description}</p>

              <div className="project-tags">
                <span className="badge badge--type">{p.type}</span>
                {(p.stack || []).map((s) => (
                  <span className="badge" key={s}>{s}</span>
                ))}
              </div>

              <div className="project-actions">
                <Link to={p.details} className="btn">Learn More</Link>
                <a href={p.download} className="btn" download>Download</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minimal inline styles for the new bits; tailor in your CSS if you want */}
      <style>{`
        .filters-bar { display: grid; gap: .75rem; margin-bottom: 1rem; }
        .filters-row { display: flex; align-items: center; flex-wrap: wrap; gap: .5rem; }
        .filters-label { font-weight: 600; margin-right: .25rem; }
        .chips { display: flex; gap: .5rem; flex-wrap: wrap; }
        .chip { border: 1px solid var(--border, #ddd); padding: .35rem .6rem; border-radius: 999px; font-size: .9rem; cursor: pointer; background: var(--chip-bg, #fff); }
        .chip--active { background: #111; color: #fff; border-color: #111; }
        .input { padding: .5rem .75rem; border: 1px solid #ddd; border-radius: .5rem; min-width: 260px; }
        .btn.btn--ghost { background: transparent; border: 1px solid #ddd; }
        .project-tags { display: flex; gap: .35rem; flex-wrap: wrap; margin: .5rem 0; }
        .badge { font-size: .75rem; border: 1px solid #e5e5e5; padding: .2rem .45rem; border-radius: 999px; }
        .badge--type { background: #f5f5f5; }

        /* Small cosmetic tweaks since there's no thumbnail */
        .project-card h3 { margin-top: .25rem; margin-bottom: .35rem; }
        .project-card p { margin: 0 0 .5rem 0; line-height: 1.45; }
      `}</style>
    </main>
  );
}
