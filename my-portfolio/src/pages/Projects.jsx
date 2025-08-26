import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
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
  stack: ['Java', 'Spring Boot', 'MySQL'],
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
  title: 'School Portfolio Website',
  slug: 'school-portfolio',
  thumb: '/images/school-portfolio.jpg',
  description:
    'Responsive personal site showcasing coursework and projects, built with React + Vite.',
  download: '/downloads/cannondyer-main.zip',
  details: '/projects/school-portfolio',
  stack: ['React', 'Vite', 'CSS'],
  type: 'web',
},
];

/* ---------------------------------------------------------------------------
   2) UTIL: derive unique filter options from the data
      - This keeps the UI and data in sync automatically.
      - `unique` returns a sorted array of unique strings.
   --------------------------------------------------------------------------- */
function unique(list) {
  // Create a Set to remove duplicates, then convert back to array and sort.
  return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b));
}

// All distinct technologies across all projects (e.g., React, Python, SQL)
const ALL_STACKS = unique(PROJECTS.flatMap((p) => p.stack || []));
// All distinct types (e.g., 'web', 'data', 'game')
const ALL_TYPES = unique(PROJECTS.map((p) => p.type).filter(Boolean));

/* ---------------------------------------------------------------------------
   3) PRESENTATIONAL CHIP COMPONENT
      - A small button that can be toggled on/off.
      - `aria-pressed` helps screen readers announce its state.
      - No state lives here; it receives `active` + `onClick` from the parent.
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
  // `query` holds the search string from the input box
  const [query, setQuery] = useState('');
  // `stacks` is a Set of selected technology chips (e.g., React, SQL)
  const [stacks, setStacks] = useState(() => new Set());
  // `types` is a Set of selected category chips (e.g., web, data, game)
  const [types, setTypes] = useState(() => new Set());

  // Helper to immutably toggle a value inside a Set (so React sees a new object)
  const toggle = (set, value) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value); else next.add(value);
    return next;
  };

  // Compute the list of projects that should be visible based on current filters.
  // useMemo caches the result until one of the dependencies changes.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PROJECTS.filter(p => {
      // Build a single searchable string of relevant fields for text matching.
      const matchesQuery = !q || [
        p.title,
        p.description,
        ...(p.stack || []),
        p.type,
      ]
        .filter(Boolean)       // ignore null/undefined
        .join(' ')             // combine everything into one string
        .toLowerCase()
        .includes(q);          // simple substring search (case-insensitive)

      // Stacks filter logic:
      // - If no stack chips selected, match everything.
      // - Otherwise, project must have at least one of the selected stacks.
      const matchesStacks =
        stacks.size === 0 || (p.stack || []).some(s => stacks.has(s));

      // Types filter logic:
      // - If no type chips selected, match everything.
      // - Otherwise, project's type must be one of the selected types.
      const matchesTypes =
        types.size === 0 || (p.type && types.has(p.type));

      // Project is included only if it matches all three checks.
      return matchesQuery && matchesStacks && matchesTypes;
    });
  }, [query, stacks, types]);

  // Reset the search and both filter sets in one click.
  const clearAll = () => {
    setQuery('');
    setStacks(new Set());
    setTypes(new Set());
  };

  return (
    <main>
      <section className="projects-section">
        <h2>Explore My Projects</h2>

        {/* Filters Bar: search, Clear, Type chips, Stack chips, and live count */}
        <div className="filters-bar" role="region" aria-label="Project filters">
          {/* Search row */}
          <div className="filters-row">
            {/* Keep the input accessible for screen readers without showing text visually */}
            <label htmlFor="project-search" className="visually-hidden">Search projects</label>
            <input
              id="project-search"
              type="search"
              placeholder="Search by title, tech, or description..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="input"
            />
            {/* Clears query + all selected chips */}
            <button type="button" className="btn btn--ghost" onClick={clearAll}>
              Clear
            </button>
          </div>

          {/* Type chips (web, data, game, etc.). Selecting multiple uses OR logic. */}
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

          {/* Stack chips (React, Java, SQL, etc.). Selecting multiple uses OR logic. */}
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

          {/* Live status—updates as filters change. aria-live announces changes to AT. */}
          <div className="filters-meta" aria-live="polite">
            Showing {filtered.length} of {PROJECTS.length}
          </div>
        </div>

        {/* Grid of cards: uses the filtered list (not the raw PROJECTS array) */}
        <div className="project-grid">
          {filtered.map((p) => (
            <div className="project-card" key={p.slug}>
              <img
                src={p.thumb}
                alt={`${p.title} thumbnail`}
                className="project-thumb"
                loading="lazy"        /* hint browser to defer off-screen images */
              />

              <h3>{p.title}</h3>
              <p>{p.description}</p>

              {/* Badges show type + technologies at a glance */}
              <div className="project-tags">
                <span className="badge badge--type">{p.type}</span>
                {(p.stack || []).map((s) => (
                  <span className="badge" key={s}>{s}</span>
                ))}
              </div>

              {/* Primary actions for each project */}
              <div className="project-actions">
                <Link to={p.details} className="btn">
                  Learn More
                </Link>
                <a href={p.download} className="btn" download>
                  Download
                </a>
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
        .visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
      `}</style>
    </main>
  );
}
