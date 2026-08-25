/**
 * roadmap.js
 * Full-Stack Developer 12-Month Learning Roadmap
 * Source: README.md — do NOT modify topic order without updating README
 *
 * Structure:
 *   ROADMAP.months[]
 *     .frontend[]   — frontend subtopic groups
 *     .backend[]    — backend subtopic groups
 *     .project      — month capstone project
 *
 * Each subtopic group:
 *   { id, area, topic, subtopics[], type, totalMinutes }
 *
 * Each subtopic:
 *   { id, title, minutes, practiceTask? }
 */

const ROADMAP = {
  meta: {
    title: "Full-Stack Developer Training Program",
    duration: "12 Months",
    stack: "HTML → CSS → JS → React → TypeScript → Next.js | Node.js → Express → PostgreSQL → Auth → Docker",
    source: "README.md"
  },

  // ─── Time allocation ratios from README ────────────────────────────────────
  timeRatios: {
    60:  { frontend: 30, backend: 30, practice: 0 },
    90:  { frontend: 40, backend: 40, practice: 10 },
    120: { frontend: 60, backend: 60, practice: 0 },
    150: { frontend: 65, backend: 65, practice: 20 },
    180: { frontend: 75, backend: 75, practice: 30 },
    210: { frontend: 85, backend: 85, practice: 40 },
    240: { frontend: 90, backend: 90, practice: 60 },
  },

  // ─── Weekly rhythm from README ─────────────────────────────────────────────
  weeklyRhythm: {
    1: { label: "New Concept Day", icon: "🧠", tip: "Focus on understanding new frontend concepts today." },
    2: { label: "Concept + Exercises", icon: "✏️", tip: "Learn and do small coding exercises." },
    3: { label: "Practice Day", icon: "💻", tip: "Write code from scratch — no tutorial watching." },
    4: { label: "Integration Day", icon: "🔗", tip: "Connect your frontend and backend together." },
    5: { label: "Project Feature Day", icon: "🏗️", tip: "Build a new feature for this month's project." },
    6: { label: "Project + Debugging", icon: "🐛", tip: "Extend your project and fix bugs." },
    0: { label: "Revision + Git + Docs", icon: "📖", tip: "Review, commit your code, and document it." }
  },

  months: [

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 1 — Complete Beginner
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 1,
      title: "Complete Beginner",
      goal: "Stop being scared of code. Understand what websites are and write your first HTML/CSS pages.",
      frontend: [
        {
          id: "m1_fe_webfund",
          area: "frontend",
          topic: "Web Fundamentals",
          type: "learn",
          totalMinutes: 120,
          subtopics: [
            { id: "m1_fe_webfund_0", title: "What is a website?", minutes: 15 },
            { id: "m1_fe_webfund_1", title: "How the internet works", minutes: 20 },
            { id: "m1_fe_webfund_2", title: "Browser, Server & Client", minutes: 15 },
            { id: "m1_fe_webfund_3", title: "HTTP / HTTPS explained", minutes: 15 },
            { id: "m1_fe_webfund_4", title: "Domain & Hosting basics", minutes: 15 },
            { id: "m1_fe_webfund_5", title: "VS Code & Browser DevTools setup", minutes: 20 },
            { id: "m1_fe_webfund_6", title: "Files, folders & Terminal basics", minutes: 20 },
          ]
        },
        {
          id: "m1_fe_html",
          area: "frontend",
          topic: "HTML",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m1_fe_html_0", title: "HTML document structure", minutes: 20 },
            { id: "m1_fe_html_1", title: "Headings & paragraphs", minutes: 15 },
            { id: "m1_fe_html_2", title: "Links & images", minutes: 20 },
            { id: "m1_fe_html_3", title: "Lists & tables", minutes: 20 },
            { id: "m1_fe_html_4", title: "Forms, inputs & buttons", minutes: 25 },
            { id: "m1_fe_html_5", title: "Semantic HTML elements", minutes: 20 },
            { id: "m1_fe_html_6", title: "Accessibility basics", minutes: 20 },
            { id: "m1_fe_html_7", title: "HTML validation & best practices", minutes: 20 },
            { id: "m1_fe_html_8", title: "Practice: Build a basic HTML page", minutes: 20, practiceTask: "Create a full HTML page with headings, a nav, a form, and a footer using only semantic elements." }
          ]
        },
        {
          id: "m1_fe_css",
          area: "frontend",
          topic: "CSS Fundamentals",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m1_fe_css_0", title: "CSS selectors (element, class, id)", minutes: 20 },
            { id: "m1_fe_css_1", title: "Colors & fonts", minutes: 20 },
            { id: "m1_fe_css_2", title: "Margins, padding & borders", minutes: 20 },
            { id: "m1_fe_css_3", title: "Box model explained", minutes: 20 },
            { id: "m1_fe_css_4", title: "Width, height & overflow", minutes: 15 },
            { id: "m1_fe_css_5", title: "Positioning (static, relative, absolute, fixed)", minutes: 25 },
            { id: "m1_fe_css_6", title: "Display (block, inline, flex, grid basics)", minutes: 20 },
            { id: "m1_fe_css_7", title: "Flexbox deep dive", minutes: 25 },
            { id: "m1_fe_css_8", title: "CSS Grid deep dive", minutes: 25 },
            { id: "m1_fe_css_9", title: "Practice: Style the HTML page you built", minutes: 20, practiceTask: "Apply full CSS styling to the HTML page from the previous practice task." }
          ]
        },
        {
          id: "m1_fe_projects",
          area: "frontend",
          topic: "Month 1 Frontend Mini-Projects",
          type: "project",
          totalMinutes: 240,
          subtopics: [
            { id: "m1_fe_proj_0", title: "Project: Personal profile page", minutes: 60, practiceTask: "Build a personal profile page with your name, bio, skills list, and a contact section." },
            { id: "m1_fe_proj_1", title: "Project: Contact form page", minutes: 45, practiceTask: "Build a styled contact form with name, email, subject, and message fields." },
            { id: "m1_fe_proj_2", title: "Project: Simple landing page", minutes: 75, practiceTask: "Create a product landing page with a hero section, features grid, and call-to-action button." },
            { id: "m1_fe_proj_3", title: "Project: Portfolio homepage", minutes: 60, practiceTask: "Create your portfolio homepage combining all HTML/CSS skills learned this month." }
          ]
        }
      ],
      backend: [
        {
          id: "m1_be_webserver",
          area: "backend",
          topic: "Server & Web Fundamentals",
          type: "learn",
          totalMinutes: 120,
          subtopics: [
            { id: "m1_be_webserver_0", title: "What is a server?", minutes: 15 },
            { id: "m1_be_webserver_1", title: "Request & Response cycle", minutes: 20 },
            { id: "m1_be_webserver_2", title: "Client-server model", minutes: 15 },
            { id: "m1_be_webserver_3", title: "What is an API?", minutes: 20 },
            { id: "m1_be_webserver_4", title: "JSON data format", minutes: 15 },
            { id: "m1_be_webserver_5", title: "HTTP methods: GET, POST, PUT, PATCH, DELETE", minutes: 20 },
            { id: "m1_be_webserver_6", title: "HTTP status codes & headers", minutes: 15 }
          ]
        },
        {
          id: "m1_be_jsfund",
          area: "backend",
          topic: "JavaScript Programming Fundamentals",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m1_be_jsfund_0", title: "Variables: var, let, const", minutes: 20 },
            { id: "m1_be_jsfund_1", title: "Data types (string, number, boolean, null, undefined)", minutes: 20 },
            { id: "m1_be_jsfund_2", title: "Operators (arithmetic, comparison, logical)", minutes: 20 },
            { id: "m1_be_jsfund_3", title: "Conditionals: if/else, switch", minutes: 20 },
            { id: "m1_be_jsfund_4", title: "Loops: for, while, for...of", minutes: 20 },
            { id: "m1_be_jsfund_5", title: "Functions & return values", minutes: 25 },
            { id: "m1_be_jsfund_6", title: "Arrays basics", minutes: 20 },
            { id: "m1_be_jsfund_7", title: "Objects basics", minutes: 20 },
            { id: "m1_be_jsfund_8", title: "Scope & basic error handling", minutes: 15 }
          ]
        }
      ],
      project: {
        id: "m1_proj",
        name: "Simple Student Management Website",
        stack: "HTML + CSS + JavaScript (local data)",
        description: "Build a student list app where you can add, view, and delete students. Applies Input → Logic → Output pattern.",
        estimatedMinutes: 300
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 2 — JavaScript Fundamentals
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 2,
      title: "JavaScript Fundamentals",
      goal: "Master JavaScript deeply. Do NOT rush this month — JS is the core of everything.",
      frontend: [
        {
          id: "m2_fe_jsfn",
          area: "frontend",
          topic: "Advanced JavaScript — Functions & Arrays",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m2_fe_jsfn_0", title: "Function declarations vs expressions", minutes: 20 },
            { id: "m2_fe_jsfn_1", title: "Arrow functions", minutes: 20 },
            { id: "m2_fe_jsfn_2", title: "Array methods: map, filter, reduce", minutes: 30 },
            { id: "m2_fe_jsfn_3", title: "Destructuring (arrays & objects)", minutes: 25 },
            { id: "m2_fe_jsfn_4", title: "Spread & rest operators", minutes: 20 },
            { id: "m2_fe_jsfn_5", title: "Template literals", minutes: 15 },
            { id: "m2_fe_jsfn_6", title: "ES6 modules (import/export)", minutes: 20 },
            { id: "m2_fe_jsfn_7", title: "Practice: Functional array challenges", minutes: 30, practiceTask: "Write functions using map/filter/reduce to process a dataset of 10 students." }
          ]
        },
        {
          id: "m2_fe_dom",
          area: "frontend",
          topic: "DOM Manipulation & Events",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m2_fe_dom_0", title: "Selecting DOM elements", minutes: 20 },
            { id: "m2_fe_dom_1", title: "Modifying elements (text, style, attributes)", minutes: 20 },
            { id: "m2_fe_dom_2", title: "Creating & removing elements", minutes: 20 },
            { id: "m2_fe_dom_3", title: "Event listeners & event object", minutes: 25 },
            { id: "m2_fe_dom_4", title: "Form handling & validation", minutes: 25 },
            { id: "m2_fe_dom_5", title: "localStorage & sessionStorage", minutes: 20 },
            { id: "m2_fe_dom_6", title: "Practice: Interactive todo list", minutes: 30, practiceTask: "Build a todo list with add, delete, and complete functionality using DOM manipulation." },
            { id: "m2_fe_dom_7", title: "Mini project: Form with validation", minutes: 20, practiceTask: "Build a registration form with real-time validation feedback." }
          ]
        },
        {
          id: "m2_fe_async",
          area: "frontend",
          topic: "Asynchronous JavaScript",
          type: "learn+practice",
          totalMinutes: 150,
          subtopics: [
            { id: "m2_fe_async_0", title: "Synchronous vs asynchronous code", minutes: 20 },
            { id: "m2_fe_async_1", title: "Callbacks & callback hell", minutes: 20 },
            { id: "m2_fe_async_2", title: "Promises (.then/.catch/.finally)", minutes: 25 },
            { id: "m2_fe_async_3", title: "async/await syntax", minutes: 25 },
            { id: "m2_fe_async_4", title: "fetch API — GET & POST requests", minutes: 30 },
            { id: "m2_fe_async_5", title: "Error handling in async code", minutes: 20 },
            { id: "m2_fe_async_6", title: "Practice: Fetch data from a public API", minutes: 10, practiceTask: "Use fetch to get data from JSONPlaceholder and display posts dynamically." }
          ]
        }
      ],
      backend: [
        {
          id: "m2_be_node",
          area: "backend",
          topic: "Node.js Fundamentals",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m2_be_node_0", title: "What is Node.js and why use it?", minutes: 20 },
            { id: "m2_be_node_1", title: "npm & package.json", minutes: 20 },
            { id: "m2_be_node_2", title: "Node.js modules (require/exports)", minutes: 20 },
            { id: "m2_be_node_3", title: "File system (fs) module", minutes: 25 },
            { id: "m2_be_node_4", title: "Environment variables (.env)", minutes: 20 },
            { id: "m2_be_node_5", title: "Basic HTTP server with Node.js", minutes: 30 },
            { id: "m2_be_node_6", title: "Request/response handling basics", minutes: 25 },
            { id: "m2_be_node_7", title: "Practice: Build a simple file reader server", minutes: 20, practiceTask: "Create a Node.js server that reads a JSON file and returns its contents." }
          ]
        }
      ],
      project: {
        id: "m2_proj",
        name: "Expense Tracker",
        stack: "HTML + CSS + JavaScript + LocalStorage → then Node.js API",
        description: "Build an expense tracker with add/edit/delete/categories/monthly summary. First with localStorage, then upgrade to Node.js API backend.",
        estimatedMinutes: 360
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 3 — Real Web Development
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 3,
      title: "Real Web Development",
      goal: "Master responsive design and start building real client/server applications with Express.js.",
      frontend: [
        {
          id: "m3_fe_responsive",
          area: "frontend",
          topic: "Responsive Design",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m3_fe_responsive_0", title: "Mobile-first design philosophy", minutes: 20 },
            { id: "m3_fe_responsive_1", title: "Media queries (breakpoints)", minutes: 25 },
            { id: "m3_fe_responsive_2", title: "Responsive typography (rem, em, clamp)", minutes: 20 },
            { id: "m3_fe_responsive_3", title: "Flexbox for responsive layouts", minutes: 25 },
            { id: "m3_fe_responsive_4", title: "CSS Grid for responsive layouts", minutes: 25 },
            { id: "m3_fe_responsive_5", title: "Responsive images & viewport", minutes: 20 },
            { id: "m3_fe_responsive_6", title: "Reusable UI patterns (cards, navbars)", minutes: 25 },
            { id: "m3_fe_responsive_7", title: "Practice: Responsive 3-column layout", minutes: 20, practiceTask: "Build a layout that transforms from 3 columns (desktop) to 1 column (mobile) using grid and media queries." }
          ]
        },
        {
          id: "m3_fe_cssadv",
          area: "frontend",
          topic: "Advanced CSS",
          type: "learn+practice",
          totalMinutes: 150,
          subtopics: [
            { id: "m3_fe_cssadv_0", title: "CSS architecture (BEM methodology)", minutes: 25 },
            { id: "m3_fe_cssadv_1", title: "CSS animations & keyframes", minutes: 25 },
            { id: "m3_fe_cssadv_2", title: "CSS transitions", minutes: 20 },
            { id: "m3_fe_cssadv_3", title: "Pseudo-elements (::before, ::after)", minutes: 20 },
            { id: "m3_fe_cssadv_4", title: "UI states (hover, focus, active, disabled)", minutes: 20 },
            { id: "m3_fe_cssadv_5", title: "Loading & error states", minutes: 20 },
            { id: "m3_fe_cssadv_6", title: "CSS variables (custom properties)", minutes: 20 }
          ]
        }
      ],
      backend: [
        {
          id: "m3_be_express",
          area: "backend",
          topic: "Express.js",
          type: "learn+practice",
          totalMinutes: 210,
          subtopics: [
            { id: "m3_be_express_0", title: "Setting up an Express application", minutes: 25 },
            { id: "m3_be_express_1", title: "Routes (GET, POST, PUT, DELETE)", minutes: 30 },
            { id: "m3_be_express_2", title: "Route parameters & query strings", minutes: 20 },
            { id: "m3_be_express_3", title: "Middleware concept & usage", minutes: 25 },
            { id: "m3_be_express_4", title: "Controllers — separating route logic", minutes: 25 },
            { id: "m3_be_express_5", title: "Request & response handling", minutes: 20 },
            { id: "m3_be_express_6", title: "REST API design principles", minutes: 20 },
            { id: "m3_be_express_7", title: "Error handling middleware", minutes: 20 },
            { id: "m3_be_express_8", title: "Input validation", minutes: 20 },
            { id: "m3_be_express_9", title: "Practice: Build CRUD API for /api/users", minutes: 25, practiceTask: "Build GET /users, POST /users, PUT /users/:id, DELETE /users/:id endpoints." }
          ]
        }
      ],
      project: {
        id: "m3_proj",
        name: "Task Management App",
        stack: "HTML/CSS/JavaScript + Node.js + Express",
        description: "Full client/server task manager. Create, edit, delete, complete, filter, search tasks. Frontend talks to your Express backend.",
        estimatedMinutes: 360
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 4 — Databases
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 4,
      title: "Databases",
      goal: "Stop using arrays as data. Start thinking in persistent relational databases.",
      frontend: [
        {
          id: "m4_fe_apiint",
          area: "frontend",
          topic: "API Integration & Async UI",
          type: "learn+practice",
          totalMinutes: 150,
          subtopics: [
            { id: "m4_fe_apiint_0", title: "Connecting frontend to REST API", minutes: 25 },
            { id: "m4_fe_apiint_1", title: "Loading UI (spinners, skeletons)", minutes: 20 },
            { id: "m4_fe_apiint_2", title: "Error UI (error messages, retry)", minutes: 20 },
            { id: "m4_fe_apiint_3", title: "Async UI workflows", minutes: 25 },
            { id: "m4_fe_apiint_4", title: "Reusable component concept (plain JS)", minutes: 25 },
            { id: "m4_fe_apiint_5", title: "Practice: Build a dynamic data table from API", minutes: 35, practiceTask: "Build a table that fetches, displays, and updates data from your Node.js API." }
          ]
        }
      ],
      backend: [
        {
          id: "m4_be_sqlconcepts",
          area: "backend",
          topic: "SQL & Database Concepts",
          type: "learn",
          totalMinutes: 150,
          subtopics: [
            { id: "m4_be_sqlconcepts_0", title: "What is a database, table, row, column?", minutes: 20 },
            { id: "m4_be_sqlconcepts_1", title: "Primary key & foreign key", minutes: 20 },
            { id: "m4_be_sqlconcepts_2", title: "Relationships (1:1, 1:many, many:many)", minutes: 25 },
            { id: "m4_be_sqlconcepts_3", title: "Indexes & constraints", minutes: 20 },
            { id: "m4_be_sqlconcepts_4", title: "Database normalization basics", minutes: 25 },
            { id: "m4_be_sqlconcepts_5", title: "PostgreSQL installation & psql CLI", minutes: 20 },
            { id: "m4_be_sqlconcepts_6", title: "Creating databases & tables", minutes: 20 }
          ]
        },
        {
          id: "m4_be_sqlqueries",
          area: "backend",
          topic: "SQL Queries",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m4_be_sqlqueries_0", title: "SELECT, WHERE, ORDER BY", minutes: 25 },
            { id: "m4_be_sqlqueries_1", title: "INSERT, UPDATE, DELETE", minutes: 25 },
            { id: "m4_be_sqlqueries_2", title: "GROUP BY & aggregate functions (COUNT, SUM, AVG)", minutes: 25 },
            { id: "m4_be_sqlqueries_3", title: "JOIN (INNER, LEFT, RIGHT)", minutes: 30 },
            { id: "m4_be_sqlqueries_4", title: "Subqueries", minutes: 20 },
            { id: "m4_be_sqlqueries_5", title: "Connecting PostgreSQL to Express (pg library)", minutes: 25 },
            { id: "m4_be_sqlqueries_6", title: "Practice: Build API with real PostgreSQL data", minutes: 30, practiceTask: "Migrate your Task Manager to use PostgreSQL instead of in-memory arrays." }
          ]
        }
      ],
      project: {
        id: "m4_proj",
        name: "Inventory Management System",
        stack: "HTML/CSS/JS + Node.js + Express + PostgreSQL",
        description: "Products, categories, stock levels. Full CRUD with database persistence, search, add/update/delete.",
        estimatedMinutes: 360
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 5 — React
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 5,
      title: "React",
      goal: "You now have enough JavaScript to understand React. Build component-based UIs.",
      frontend: [
        {
          id: "m5_fe_reactbasics",
          area: "frontend",
          topic: "React Fundamentals",
          type: "learn+practice",
          totalMinutes: 210,
          subtopics: [
            { id: "m5_fe_reactbasics_0", title: "What is React? Virtual DOM concept", minutes: 20 },
            { id: "m5_fe_reactbasics_1", title: "Components & JSX", minutes: 25 },
            { id: "m5_fe_reactbasics_2", title: "Props — passing data to components", minutes: 20 },
            { id: "m5_fe_reactbasics_3", title: "State with useState hook", minutes: 25 },
            { id: "m5_fe_reactbasics_4", title: "Handling events in React", minutes: 20 },
            { id: "m5_fe_reactbasics_5", title: "Conditional rendering", minutes: 20 },
            { id: "m5_fe_reactbasics_6", title: "Rendering lists (map + key)", minutes: 20 },
            { id: "m5_fe_reactbasics_7", title: "Forms in React (controlled inputs)", minutes: 25 },
            { id: "m5_fe_reactbasics_8", title: "Practice: Build a counter & todo in React", minutes: 35, practiceTask: "Build a todo app in React with useState. Each todo is its own component." }
          ]
        },
        {
          id: "m5_fe_reacthooks",
          area: "frontend",
          topic: "React Hooks & API Integration",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m5_fe_reacthooks_0", title: "useEffect — lifecycle & side effects", minutes: 25 },
            { id: "m5_fe_reacthooks_1", title: "Fetching API data with useEffect", minutes: 25 },
            { id: "m5_fe_reacthooks_2", title: "Loading & error states in React", minutes: 20 },
            { id: "m5_fe_reacthooks_3", title: "Component design & reusability", minutes: 20 },
            { id: "m5_fe_reacthooks_4", title: "React Router — routing & navigation", minutes: 30 },
            { id: "m5_fe_reacthooks_5", title: "Connecting React frontend to Express backend", minutes: 30 },
            { id: "m5_fe_reacthooks_6", title: "Practice: Build a multi-page React app", minutes: 30, practiceTask: "Create a 3-page app (Home, About, Contact) with React Router and API data on the home page." }
          ]
        }
      ],
      backend: [
        {
          id: "m5_be_expressadv",
          area: "backend",
          topic: "Advanced Express + PostgreSQL",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m5_be_expressadv_0", title: "Express architecture: Routes → Controllers → Services", minutes: 30 },
            { id: "m5_be_expressadv_1", title: "PostgreSQL relationships in queries", minutes: 25 },
            { id: "m5_be_expressadv_2", title: "Environment variables & config", minutes: 20 },
            { id: "m5_be_expressadv_3", title: "Centralized error handling", minutes: 25 },
            { id: "m5_be_expressadv_4", title: "Input validation with express-validator", minutes: 25 },
            { id: "m5_be_expressadv_5", title: "CORS configuration for React frontend", minutes: 20 },
            { id: "m5_be_expressadv_6", title: "Practice: Refactor API with proper structure", minutes: 35, practiceTask: "Separate your routes, controllers, and services into different files." }
          ]
        }
      ],
      project: {
        id: "m5_proj",
        name: "Job Portal",
        stack: "React + Node.js + Express + PostgreSQL",
        description: "User registration/login UI, job listings, search & filters, job details, apply button, admin panel.",
        estimatedMinutes: 420
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 6 — Authentication + Real Applications
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 6,
      title: "Authentication + Real Applications",
      goal: "Your apps start feeling professional. Add real auth, security, and role-based access.",
      frontend: [
        {
          id: "m6_fe_reactadv",
          area: "frontend",
          topic: "Advanced React Patterns",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m6_fe_reactadv_0", title: "React Context API for global state", minutes: 30 },
            { id: "m6_fe_reactadv_1", title: "Custom hooks", minutes: 25 },
            { id: "m6_fe_reactadv_2", title: "Reusable form patterns", minutes: 20 },
            { id: "m6_fe_reactadv_3", title: "Protected routes (auth guards)", minutes: 25 },
            { id: "m6_fe_reactadv_4", title: "Application state management", minutes: 20 },
            { id: "m6_fe_reactadv_5", title: "API abstraction layer (services)", minutes: 20 },
            { id: "m6_fe_reactadv_6", title: "Practice: Auth context with login/logout state", minutes: 40, practiceTask: "Implement a React Context that stores user auth state and protects certain routes." }
          ]
        }
      ],
      backend: [
        {
          id: "m6_be_auth",
          area: "backend",
          topic: "Authentication & Authorization",
          type: "learn+practice",
          totalMinutes: 210,
          subtopics: [
            { id: "m6_be_auth_0", title: "Password hashing with bcrypt", minutes: 25 },
            { id: "m6_be_auth_1", title: "User registration endpoint", minutes: 25 },
            { id: "m6_be_auth_2", title: "User login & token generation", minutes: 25 },
            { id: "m6_be_auth_3", title: "JWT (JSON Web Tokens) explained", minutes: 25 },
            { id: "m6_be_auth_4", title: "JWT verification middleware", minutes: 20 },
            { id: "m6_be_auth_5", title: "Role-based authorization (Admin/User/Manager)", minutes: 25 },
            { id: "m6_be_auth_6", title: "User permissions system", minutes: 25 },
            { id: "m6_be_auth_7", title: "Practice: Protect API routes with JWT", minutes: 20, practiceTask: "Add JWT auth to your Express API so only logged-in users can access /api/users." }
          ]
        },
        {
          id: "m6_be_security",
          area: "backend",
          topic: "Security Fundamentals",
          type: "learn",
          totalMinutes: 120,
          subtopics: [
            { id: "m6_be_security_0", title: "CORS configuration & security", minutes: 20 },
            { id: "m6_be_security_1", title: "Input validation & sanitization", minutes: 20 },
            { id: "m6_be_security_2", title: "SQL injection prevention", minutes: 20 },
            { id: "m6_be_security_3", title: "XSS (Cross-Site Scripting) concepts", minutes: 20 },
            { id: "m6_be_security_4", title: "CSRF concepts", minutes: 15 },
            { id: "m6_be_security_5", title: "Rate limiting concept", minutes: 15 },
            { id: "m6_be_security_6", title: "Secure environment variables", minutes: 10 }
          ]
        }
      ],
      project: {
        id: "m6_proj",
        name: "Full-Stack Authentication System",
        stack: "React + Node.js + Express + PostgreSQL + JWT",
        description: "Complete auth system: Register, Login, Logout, Profile, Forgot Password concept, Role-based access, Admin dashboard.",
        estimatedMinutes: 420
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 7 — Advanced React + TypeScript
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 7,
      title: "Advanced React + TypeScript",
      goal: "Become professional. Add TypeScript and improve backend architecture.",
      frontend: [
        {
          id: "m7_fe_typescript",
          area: "frontend",
          topic: "TypeScript Fundamentals",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m7_fe_typescript_0", title: "Why TypeScript? Setting up TS", minutes: 20 },
            { id: "m7_fe_typescript_1", title: "Basic types (string, number, boolean, array)", minutes: 20 },
            { id: "m7_fe_typescript_2", title: "Interfaces & type aliases", minutes: 25 },
            { id: "m7_fe_typescript_3", title: "Union & intersection types", minutes: 20 },
            { id: "m7_fe_typescript_4", title: "Typed functions", minutes: 20 },
            { id: "m7_fe_typescript_5", title: "Generics basics", minutes: 25 },
            { id: "m7_fe_typescript_6", title: "TypeScript with React (component props)", minutes: 30 },
            { id: "m7_fe_typescript_7", title: "API response types", minutes: 20 }
          ]
        },
        {
          id: "m7_fe_reactts",
          area: "frontend",
          topic: "React + TypeScript Advanced",
          type: "learn+practice",
          totalMinutes: 150,
          subtopics: [
            { id: "m7_fe_reactts_0", title: "Typed useState & useEffect", minutes: 20 },
            { id: "m7_fe_reactts_1", title: "Typed custom hooks", minutes: 25 },
            { id: "m7_fe_reactts_2", title: "Typed context & providers", minutes: 25 },
            { id: "m7_fe_reactts_3", title: "Advanced component patterns", minutes: 25 },
            { id: "m7_fe_reactts_4", title: "State management concepts (Redux intro)", minutes: 25 },
            { id: "m7_fe_reactts_5", title: "Practice: Convert existing app to TypeScript", minutes: 30, practiceTask: "Take your Job Portal React app and convert it to TypeScript." }
          ]
        }
      ],
      backend: [
        {
          id: "m7_be_arch",
          area: "backend",
          topic: "Backend Architecture",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m7_be_arch_0", title: "Layered architecture: Routes → Controllers → Services → DB", minutes: 30 },
            { id: "m7_be_arch_1", title: "Data Transfer Objects (DTOs)", minutes: 20 },
            { id: "m7_be_arch_2", title: "Validation layer (schema-based)", minutes: 25 },
            { id: "m7_be_arch_3", title: "Logging with morgan & winston", minutes: 20 },
            { id: "m7_be_arch_4", title: "Configuration management", minutes: 20 },
            { id: "m7_be_arch_5", title: "Reusable service patterns", minutes: 25 },
            { id: "m7_be_arch_6", title: "Practice: Refactor API to clean architecture", minutes: 40, practiceTask: "Split your backend into route → controller → service → repository layers." }
          ]
        }
      ],
      project: {
        id: "m7_proj",
        name: "E-commerce Application",
        stack: "React + TypeScript + Node.js + Express + PostgreSQL",
        description: "Products, categories, product details, cart, wishlist, user auth, orders, admin dashboard.",
        estimatedMinutes: 480
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 8 — Next.js + Better Backend
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 8,
      title: "Next.js + Better Backend",
      goal: "Learn Next.js for its real benefits (SSR, SEO, routing). Improve backend API design.",
      frontend: [
        {
          id: "m8_fe_nextjs",
          area: "frontend",
          topic: "Next.js",
          type: "learn+practice",
          totalMinutes: 210,
          subtopics: [
            { id: "m8_fe_nextjs_0", title: "Why Next.js? SSR vs CSR vs SSG", minutes: 25 },
            { id: "m8_fe_nextjs_1", title: "Next.js file-based routing", minutes: 20 },
            { id: "m8_fe_nextjs_2", title: "Layouts & nested layouts", minutes: 20 },
            { id: "m8_fe_nextjs_3", title: "Server & client components", minutes: 25 },
            { id: "m8_fe_nextjs_4", title: "API integration in Next.js", minutes: 25 },
            { id: "m8_fe_nextjs_5", title: "Metadata & SEO in Next.js", minutes: 20 },
            { id: "m8_fe_nextjs_6", title: "Loading & error UI", minutes: 20 },
            { id: "m8_fe_nextjs_7", title: "Reusable components in Next.js", minutes: 20 },
            { id: "m8_fe_nextjs_8", title: "Practice: Convert React app to Next.js", minutes: 35, practiceTask: "Convert one of your previous React projects to Next.js." }
          ]
        }
      ],
      backend: [
        {
          id: "m8_be_apidesign",
          area: "backend",
          topic: "Advanced REST API Design",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m8_be_apidesign_0", title: "REST API design best practices", minutes: 25 },
            { id: "m8_be_apidesign_1", title: "Pagination (offset & cursor-based)", minutes: 25 },
            { id: "m8_be_apidesign_2", title: "Filtering & sorting query params", minutes: 25 },
            { id: "m8_be_apidesign_3", title: "Search functionality in API", minutes: 20 },
            { id: "m8_be_apidesign_4", title: "File uploads with multer", minutes: 25 },
            { id: "m8_be_apidesign_5", title: "Image handling & storage", minutes: 20 },
            { id: "m8_be_apidesign_6", title: "Transactional thinking in databases", minutes: 20 },
            { id: "m8_be_apidesign_7", title: "Practice: Add pagination & search to API", minutes: 20, practiceTask: "Add ?page=1&limit=10&search=term to your product listing endpoint." }
          ]
        }
      ],
      project: {
        id: "m8_proj",
        name: "Blog / CMS Platform",
        stack: "Next.js + Node.js + Express + PostgreSQL",
        description: "Login, author dashboard, create/edit/delete posts, categories, search, comments, admin moderation.",
        estimatedMinutes: 480
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 9 — Professional Backend
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 9,
      title: "Professional Backend",
      goal: "Your backend gets more serious. Deep API design and database optimization.",
      frontend: [
        {
          id: "m9_fe_uxperf",
          area: "frontend",
          topic: "Advanced React UX & Performance",
          type: "learn+practice",
          totalMinutes: 150,
          subtopics: [
            { id: "m9_fe_uxperf_0", title: "Advanced React patterns (compound, render props)", minutes: 25 },
            { id: "m9_fe_uxperf_1", title: "UI architecture & design systems", minutes: 25 },
            { id: "m9_fe_uxperf_2", title: "Component library integration", minutes: 20 },
            { id: "m9_fe_uxperf_3", title: "Accessibility (a11y) best practices", minutes: 20 },
            { id: "m9_fe_uxperf_4", title: "Performance: lazy loading, code splitting", minutes: 25 },
            { id: "m9_fe_uxperf_5", title: "API state management (React Query intro)", minutes: 35 }
          ]
        }
      ],
      backend: [
        {
          id: "m9_be_apiprof",
          area: "backend",
          topic: "Professional API Design",
          type: "learn+practice",
          totalMinutes: 150,
          subtopics: [
            { id: "m9_be_apiprof_0", title: "REST principles (HATEOAS, statelessness)", minutes: 20 },
            { id: "m9_be_apiprof_1", title: "API versioning (/api/v1/)", minutes: 20 },
            { id: "m9_be_apiprof_2", title: "Consistent response formats", minutes: 20 },
            { id: "m9_be_apiprof_3", title: "Standardized error formats", minutes: 20 },
            { id: "m9_be_apiprof_4", title: "API documentation with Swagger/Postman", minutes: 30 },
            { id: "m9_be_apiprof_5", title: "Practice: Document your entire API", minutes: 40, practiceTask: "Write complete Postman collection for all endpoints in your latest project." }
          ]
        },
        {
          id: "m9_be_dbopt",
          area: "backend",
          topic: "Database Optimization",
          type: "learn+practice",
          totalMinutes: 150,
          subtopics: [
            { id: "m9_be_dbopt_0", title: "Database indexes (EXPLAIN ANALYZE)", minutes: 25 },
            { id: "m9_be_dbopt_1", title: "Query optimization techniques", minutes: 25 },
            { id: "m9_be_dbopt_2", title: "Complex SQL relationships", minutes: 25 },
            { id: "m9_be_dbopt_3", title: "Database transactions (BEGIN/COMMIT/ROLLBACK)", minutes: 25 },
            { id: "m9_be_dbopt_4", title: "Normalization & denormalization trade-offs", minutes: 25 },
            { id: "m9_be_dbopt_5", title: "Performance basics (connection pooling)", minutes: 25 }
          ]
        }
      ],
      project: {
        id: "m9_proj",
        name: "CRM System",
        stack: "Next.js + Node.js + Express + PostgreSQL",
        description: "Dashboard, Clients, Projects, Tasks, Employees, Reports, Notifications, Auth, Roles. Resembles a real business application.",
        estimatedMinutes: 540
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 10 — Testing + Deployment
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 10,
      title: "Testing + Deployment",
      goal: "Stop at 'works on localhost'. Learn to test and deploy like a professional developer.",
      frontend: [
        {
          id: "m10_fe_prod",
          area: "frontend",
          topic: "Production Frontend",
          type: "learn+practice",
          totalMinutes: 120,
          subtopics: [
            { id: "m10_fe_prod_0", title: "Production builds & optimization", minutes: 20 },
            { id: "m10_fe_prod_1", title: "Environment variables in frontend", minutes: 15 },
            { id: "m10_fe_prod_2", title: "Frontend performance basics", minutes: 25 },
            { id: "m10_fe_prod_3", title: "Frontend testing concepts (jest, react testing library)", minutes: 30 },
            { id: "m10_fe_prod_4", title: "Accessibility testing tools", minutes: 30 }
          ]
        }
      ],
      backend: [
        {
          id: "m10_be_testing",
          area: "backend",
          topic: "Backend Testing",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m10_be_testing_0", title: "Unit testing fundamentals (jest)", minutes: 30 },
            { id: "m10_be_testing_1", title: "API testing with Supertest", minutes: 30 },
            { id: "m10_be_testing_2", title: "Integration testing concepts", minutes: 25 },
            { id: "m10_be_testing_3", title: "Postman automated tests", minutes: 25 },
            { id: "m10_be_testing_4", title: "Writing automated test suites", minutes: 30 },
            { id: "m10_be_testing_5", title: "Practice: Write tests for your CRM API", minutes: 40, practiceTask: "Write unit tests for 5 service functions and API tests for 5 endpoints." }
          ]
        },
        {
          id: "m10_be_deploy",
          area: "backend",
          topic: "Deployment",
          type: "learn+practice",
          totalMinutes: 180,
          subtopics: [
            { id: "m10_be_deploy_0", title: "Git & GitHub workflow for deployment", minutes: 20 },
            { id: "m10_be_deploy_1", title: "Hosting options (Railway, Render, VPS)", minutes: 20 },
            { id: "m10_be_deploy_2", title: "Environment variables in production", minutes: 15 },
            { id: "m10_be_deploy_3", title: "Database deployment (managed PostgreSQL)", minutes: 25 },
            { id: "m10_be_deploy_4", title: "Domain & HTTPS setup", minutes: 20 },
            { id: "m10_be_deploy_5", title: "Logs & monitoring basics", minutes: 20 },
            { id: "m10_be_deploy_6", title: "Docker basics: containers, images", minutes: 30 },
            { id: "m10_be_deploy_7", title: "Docker Compose for app + database", minutes: 30 }
          ]
        }
      ],
      project: {
        id: "m10_proj",
        name: "Production-Ready Upgrade",
        stack: "Any previous project → add tests + deploy",
        description: "Take an older project and make it production-ready: add tests, configure deployment, set up environment variables, and deploy live.",
        estimatedMinutes: 480
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 11 — Real-World Full-Stack Engineering
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 11,
      title: "Real-World Full-Stack Engineering",
      goal: "This month should feel like a workplace. Professional engineering practices.",
      frontend: [
        {
          id: "m11_fe_arch",
          area: "frontend",
          topic: "Full-Stack Architecture & Git Workflows",
          type: "learn+practice",
          totalMinutes: 150,
          subtopics: [
            { id: "m11_fe_arch_0", title: "Git branching strategies (feature branches)", minutes: 20 },
            { id: "m11_fe_arch_1", title: "Pull requests & code reviews", minutes: 25 },
            { id: "m11_fe_arch_2", title: "Issue tracking & project planning", minutes: 20 },
            { id: "m11_fe_arch_3", title: "README writing & API documentation", minutes: 25 },
            { id: "m11_fe_arch_4", title: "Frontend architecture decisions", minutes: 25 },
            { id: "m11_fe_arch_5", title: "CI/CD basics (GitHub Actions)", minutes: 35 }
          ]
        }
      ],
      backend: [
        {
          id: "m11_be_eng",
          area: "backend",
          topic: "Professional Engineering",
          type: "learn+practice",
          totalMinutes: 150,
          subtopics: [
            { id: "m11_be_eng_0", title: "Debugging strategies & tools", minutes: 25 },
            { id: "m11_be_eng_1", title: "Structured logging (winston/pino)", minutes: 25 },
            { id: "m11_be_eng_2", title: "Performance profiling", minutes: 25 },
            { id: "m11_be_eng_3", title: "Clean code & refactoring principles", minutes: 25 },
            { id: "m11_be_eng_4", title: "Architecture decisions documentation", minutes: 25 },
            { id: "m11_be_eng_5", title: "Security review checklist", minutes: 25 }
          ]
        }
      ],
      project: {
        id: "m11_proj",
        name: "SanStudio Business Management System",
        stack: "Next.js + TypeScript + Node.js + Express + PostgreSQL",
        description: "Full BMS: Authentication, Dashboard, Clients, Projects, Tasks, Invoices, Employees, Reports, Files, Notifications, Settings. Treat like a real client project.",
        estimatedMinutes: 720
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MONTH 12 — Final Capstone
    // ══════════════════════════════════════════════════════════════════════════
    {
      month: 12,
      title: "Final Capstone",
      goal: "Build your own large production-style app from scratch. No tutorial. No copying. Your own specification.",
      frontend: [
        {
          id: "m12_fe_capstone",
          area: "frontend",
          topic: "Capstone Frontend",
          type: "project",
          totalMinutes: 480,
          subtopics: [
            { id: "m12_fe_capstone_0", title: "Plan your capstone app (UI pages, components)", minutes: 60 },
            { id: "m12_fe_capstone_1", title: "Build Next.js + TypeScript frontend", minutes: 120 },
            { id: "m12_fe_capstone_2", title: "Responsive UI with full design system", minutes: 90 },
            { id: "m12_fe_capstone_3", title: "User accounts, dashboard, search, filtering", minutes: 90 },
            { id: "m12_fe_capstone_4", title: "Admin panel & roles UI", minutes: 60 },
            { id: "m12_fe_capstone_5", title: "Analytics & notifications UI", minutes: 60 }
          ]
        }
      ],
      backend: [
        {
          id: "m12_be_capstone",
          area: "backend",
          topic: "Capstone Backend",
          type: "project",
          totalMinutes: 420,
          subtopics: [
            { id: "m12_be_capstone_0", title: "Design database schema", minutes: 60 },
            { id: "m12_be_capstone_1", title: "Build Node.js + Express + PostgreSQL API", minutes: 120 },
            { id: "m12_be_capstone_2", title: "Authentication & authorization system", minutes: 60 },
            { id: "m12_be_capstone_3", title: "REST APIs with validation & error handling", minutes: 60 },
            { id: "m12_be_capstone_4", title: "File upload, logging, testing", minutes: 60 },
            { id: "m12_be_capstone_5", title: "Deployment & CI/CD pipeline", minutes: 60 }
          ]
        },
        {
          id: "m12_be_portfolio",
          area: "backend",
          topic: "Portfolio & Documentation",
          type: "project",
          totalMinutes: 180,
          subtopics: [
            { id: "m12_be_portfolio_0", title: "Write professional README", minutes: 30 },
            { id: "m12_be_portfolio_1", title: "Create architecture diagram", minutes: 30 },
            { id: "m12_be_portfolio_2", title: "Write API documentation", minutes: 30 },
            { id: "m12_be_portfolio_3", title: "Take screenshots & record demo", minutes: 30 },
            { id: "m12_be_portfolio_4", title: "Create GitHub repository & push all code", minutes: 30 },
            { id: "m12_be_portfolio_5", title: "Create portfolio case study", minutes: 30 }
          ]
        }
      ],
      project: {
        id: "m12_proj",
        name: "SanHub — Full-Stack Developer Platform",
        stack: "Next.js + React + TypeScript + Node.js + Express + PostgreSQL",
        description: "Your own production-style application with user accounts, dashboard, search, filtering, file upload, roles, admin panel, analytics, notifications, error handling, validation, logging, and deployment.",
        estimatedMinutes: 900
      }
    }

  ] // end months[]
};

// ─── Helper: Get all subtopics as flat array with ordering ─────────────────
function getAllSubtopics() {
  const all = [];
  ROADMAP.months.forEach(month => {
    // Interleave frontend and backend — balanced daily learning
    const maxLen = Math.max(month.frontend.length, month.backend.length);
    for (let i = 0; i < maxLen; i++) {
      if (month.frontend[i]) {
        month.frontend[i].subtopics.forEach(st => {
          all.push({ ...st, area: 'frontend', topicId: month.frontend[i].id, topicTitle: month.frontend[i].topic, month: month.month, monthTitle: month.title, type: month.frontend[i].type });
        });
      }
      if (month.backend[i]) {
        month.backend[i].subtopics.forEach(st => {
          all.push({ ...st, area: 'backend', topicId: month.backend[i].id, topicTitle: month.backend[i].topic, month: month.month, monthTitle: month.title, type: month.backend[i].type });
        });
      }
    }
  });
  return all;
}

// ─── Helper: Get time ratio for given minutes ───────────────────────────────
function getTimeRatio(totalMinutes) {
  const keys = Object.keys(ROADMAP.timeRatios).map(Number).sort((a,b)=>a-b);
  // Find closest match
  let closest = keys[0];
  for (const k of keys) {
    if (Math.abs(k - totalMinutes) < Math.abs(closest - totalMinutes)) closest = k;
  }
  const ratio = ROADMAP.timeRatios[closest];
  // Scale to actual totalMinutes
  const scale = totalMinutes / closest;
  return {
    frontend: Math.round(ratio.frontend * scale),
    backend: Math.round(ratio.backend * scale),
    practice: Math.max(0, totalMinutes - Math.round(ratio.frontend * scale) - Math.round(ratio.backend * scale))
  };
}

// ─── Helper: Total subtopics count (for progress % calculation) ────────────
function getTotalSubtopicCount() {
  return getAllSubtopics().length;
}

// ─── Helper: Weekly rhythm for today ───────────────────────────────────────
function getTodayRhythm() {
  const day = new Date().getDay(); // 0=Sun,1=Mon,...6=Sat
  return ROADMAP.weeklyRhythm[day];
}
