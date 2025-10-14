// src/pages/Projects.jsx
import { useMemo, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../GameSite/css/styles.css';

/* ---------------------------------------------------------------------------
   Helper: build a correct URL for GitHub Pages.
--------------------------------------------------------------------------- */
const BASE = import.meta.env.BASE_URL;
const dlUrl = (path) => encodeURI(`${BASE}${path.replace(/^\//, '')}`);

/* ---------------------------------------------------------------------------
   1) PROJECT DATA — single source of truth
--------------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: 'Cinema E-Booking Website',
    slug: 'cinema-ebooking',
    thumb: '/images/cinema-ebooking.jpg',
    description:
      'Full Stack Web Application built with React, Spring-Boot, and MySQL. Allows users to create an account and log in, book a showtime for a movie, and even use promo codes to get deals!',
    download: 'downloads/cinema-e-booking.zip',
    longDescription:
      'Built a full-stack ticketing flow (auth, seat selection, promos). API: Spring Boot + MySQL; Frontend: React. Payment flow mocked; strong focus on schema design and validation.',
    stack: ['Java', 'Spring Boot', 'SQL', 'HTML', 'CSS', 'React'],
    type: 'web',
  },
  {
    title: 'Video Game Recommender Website',
    slug: 'vg-query',
    thumb: '/images/VideoGameRecommenderThumb.PNG',
    description:
      'Flask web app to browse and filter recommended video games based on user searches!',
    download: 'downloads/flask-app.zip',
    longDescription:
      'Search games, filter by platform/genre, and view curated recommendations. Flask + Jinja templates, SQLite for data, requests for metadata, simple caching layer.',
    stack: ['Python', 'Flask', 'SQL'],
    type: 'web',
  },
  {
    title: 'NBA Predicting Stats',
    slug: 'nba-stats-predictor',
    thumb: '/images/nbathumb.PNG',
    description:
      'Machine learning pipeline that extracts NBA game data from JSON APIs, transforms it into CSV datasets, and trains models to predict player performance stats.',
    download: 'downloads/nba-player-props.zip',
    longDescription:
      'ETL in Jupyter: JSON → clean CSVs (pandas). Features: rolling avgs, opponent splits. Models: baseline LR and RandomForest; tracked MAE across seasons.',
    stack: ['Python', 'Pandas', 'Sklearn'],
    type: 'data',
  },
  {
    title: 'Old Portfolio Website',
    slug: 'school-portfolio',
    thumb: '/images/oldportfoliopic.PNG',
    description: 'This is my old Portfolio Site that I made in school! Built with HTML and CSS',
    download: 'downloads/old-portfolio.zip',
    stack: ['HTML', 'CSS'],
    type: 'web',
  },
  {
    title: 'Image Post Gallery (MERN)',
    slug: 'image-post-gallery',
    thumb: '/images/goonThumb.PNG',
    description:
      'React + Node/Express image gallery backed by MongoDB. Users upload images with titles/descriptions; posts render on the homepage with basic auth.',
    download: 'downloads/image-post-gallery.zip',
    longDescription:
      'JWT auth, multer for uploads, GridFS storage option, pagination on feed, and a tiny admin panel. Focus on CRUD and REST patterns.',
    stack: ['React', 'Node', 'Express', 'MongoDB', 'Axios', 'HTML', 'CSS'],
    type: 'web',
  },
  {
    title: 'DB Project: Linear Hashing Index',
    slug: 'db-proj3',
    thumb: '/images/dbproj3.PNG',
    description:
      'Java database systems project: Implements a linear-hashing map for indexing, a Table abstraction, and a Tuple Generator for data.',
    download: 'downloads/db-proj3.zip',
    longDescription:
      'Implements split/merge buckets on overflow, load factor tracking, and probes. Benchmarked against Java HashMap on synthetic tuples.',
    stack: ['Java', 'Indexing', 'Linear Hashing'],
    type: 'data',
  },
  {
    title: 'TCP Client/Server (Java Sockets)',
    slug: 'java-tcp-sockets',
    thumb: '/images/SocketThumb.PNG',
    description:
      'Java networking mini-project: TCP server on port 6789 and client using sockets, BufferedReader/DataOutputStream, and a tiny text protocol.',
    download: 'downloads/networks_1.zip',
    longDescription:
      'Echo + simple commands. Robust I/O handling with try-with-resources, thread-per-connection model, and basic framing.',
    stack: ['Java', 'TCP'],
    type: 'systems',
  },
];

/* ---------------------------------------------------------------------------
   2) UTIL: derive unique filter options
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

/* ---------------------------------------------------------------------------
   Modal (accessible, focus-managed, ESC/overlay close)
--------------------------------------------------------------------------- */
function Modal({ project, onClose }) {
  const closeBtnRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const long = project.longDescription || project.description;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      aria-hidden="false"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="modal"
      >
        <div className="modal-header">
          <h3 id="modal-title">{project.title}</h3>
          <button
            type="button"
            ref={closeBtnRef}
            className="btn btn--ghost"
            onClick={onClose}
            aria-label="Close dialog"
          >
            Close
          </button>
        </div>

        <div className="modal-body">
          {/* Project image in modal */}
          {project.thumb && (
            <img
              src={dlUrl(project.thumb)}
              alt={`${project.title} preview`}
              className="modal-thumb"
            />
          )}

          <p className="modal-desc">{long}</p>

          <div className="modal-meta">
            {project.type && <span className="badge badge--type">{project.type}</span>}
            {(project.stack || []).map((s) => (
              <span className="badge" key={s}>{s}</span>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <a href={dlUrl(project.download)} className="btn" download>
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

// --- Page -------------------------------------------------------------------
export default function Projects() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#projectsTop') {
      const el = document.getElementById('projectsTop');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  const [query, setQuery] = useState('');
  const [stacks, setStacks] = useState(() => new Set());
  const [types, setTypes] = useState(() => new Set());
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [selected]);

  const toggle = (set, value) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value); else next.add(value);
    return next;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter(p => {
      const matchesQuery = !q || [
        p.title, p.description, ...(p.stack || []), p.type,
      ].filter(Boolean).join(' ').toLowerCase().includes(q);

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
                  onClick={() => setTypes(prev => toggle(prev, t))}>
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
                  onClick={() => setStacks(prev => toggle(prev, s))}>
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
              {/* NEW: thumbnail on card */}
              {p.thumb && (
                <img
                  src={dlUrl(p.thumb)}
                  alt={`${p.title} thumbnail`}
                  className="project-thumb"
                />
              )}

              <h3>{p.title}</h3>
              <p>{p.description}</p>

              <div className="project-tags">
                <span className="badge badge--type">{p.type}</span>
                {(p.stack || []).map((s) => (
                  <span className="badge" key={s}>{s}</span>
                ))}
              </div>

              <div className="project-actions">
                <a href={dlUrl(p.download)} className="btn" download>
                  Download
                </a>
                <button
                  type="button"
                  className="btn btn--accent"
                  onClick={() => setSelected(p)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal mount point */}
      {selected && (
        <Modal project={selected} onClose={() => setSelected(null)} />
      )}

      {/* Minimal inline tweaks */}
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
        .project-card h3 { margin-top: .5rem; margin-bottom: .35rem; }
        .project-card p { margin: 0 0 .5rem 0; line-height: 1.45; }
        .project-actions { display: flex; gap: .5rem; }

        /* NEW: thumbnails */
        .project-thumb {
          width: 100%;
          height: auto;
          border-radius: 8px;
          object-fit: cover;
          display: block;
          margin-bottom: .5rem;
        }
        .modal-thumb {
          width: 100%;
          height: auto;
          border-radius: 10px;
          object-fit: cover;
          margin-bottom: .75rem;
        }
      `}</style>
    </main>
  );
}
