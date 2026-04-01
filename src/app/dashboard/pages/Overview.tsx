import { useEffect, useState } from "react";

export function Overview() {
  const [stats, setStats] = useState({ projects: 0, skills: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/projects").then((res) => res.json()),
      fetch("http://localhost:3001/skills").then((res) => res.json()),
    ])
      .then(([projects, skills]) => {
        setStats({
          projects: projects.length,
          skills: skills.length,
        });
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching stats:", error));
  }, []);

  if (loading) return <div className="text-gray-500">Loading overview...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="text-gray-500 mb-2">Total Projects</div>
          <div className="text-4xl font-bold text-gray-800">{stats.projects}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="text-gray-500 mb-2">Skill Categories</div>
          <div className="text-4xl font-bold text-gray-800">{stats.skills}</div>
        </div>
      </div>
    </div>
  );
}
