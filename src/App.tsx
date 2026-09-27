import React, { useState, useEffect } from "react";

// Update this if your GitHub username is different
const GITHUB_USERNAME = "bezawitsolomon202-sudo";

export default function App() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load repositories");
        return res.json();
      })
      .then((data) => {
        const filtered = data
          .filter((repo: any) => !repo.fork)
          .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);
        setRepos(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "3rem",
          borderBottom: "1px solid #334155",
          paddingBottom: "1rem",
        }}
      >
        <h2 style={{ color: "#818cf8", margin: 0 }}>Beza | Portfolio</h2>
        <div>
          <a
            href="#about"
            style={{
              color: "#cbd5e1",
              marginRight: "1.5rem",
              textDecoration: "none",
            }}
          >
            About
          </a>
          <a
            href="#projects"
            style={{ color: "#cbd5e1", textDecoration: "none" }}
          >
            Projects
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="about"
        style={{ textAlign: "center", margin: "3rem 0 5rem" }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Frontend Developer & UI Specialist
        </h1>
        <p
          style={{
            color: "#94a3b8",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6",
            fontSize: "1.1rem",
          }}
        >
          Hi, I'm Beza! Building clean, responsive web application interfaces
          using React, JavaScript, HTML, and modern CSS.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2
          style={{
            borderBottom: "2px solid #818cf8",
            paddingBottom: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          Featured GitHub Repositories
        </h2>

        {loading && (
          <p style={{ color: "#94a3b8" }}>
            Loading live repositories from GitHub...
          </p>
        )}
        {error && <p style={{ color: "#f87171" }}>{error}</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {!loading &&
            !error &&
            repos.map((repo) => (
              <div
                key={repo.id}
                style={{
                  backgroundColor: "#1e293b",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    textTransform: "capitalize",
                    color: "#38bdf8",
                  }}
                >
                  {repo.name.replace(/-/g, " ")}
                </h3>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    minHeight: "2.8em",
                  }}
                >
                  {repo.description || "Frontend repository project."}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", color: "#818cf8" }}>
                    {repo.language || "TypeScript"}
                  </span>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#38bdf8",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    View Code →
                  </a>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          marginTop: "5rem",
          color: "#64748b",
          fontSize: "0.85rem",
        }}
      >
        © {new Date().getFullYear()} Beza. All rights reserved.
      </footer>
    </div>
  );
}
