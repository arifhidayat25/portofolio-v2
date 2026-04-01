import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, X } from "lucide-react";

export function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    image: "",
    technologies: "",
    language: "",
    languageColor: "#3178C6",
    github: "",
    live: "",
    stars: 0,
    forks: 0
  });

  const fetchProjects = () => {
    fetch("http://localhost:3001/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Hapus project ini?")) return;
    fetch(`http://localhost:3001/projects/${id}`, { method: "DELETE" })
      .then(() => fetchProjects());
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "", description: "", fullDescription: "", image: "", technologies: "", language: "", languageColor: "#3178C6", github: "", live: "", stars: 0, forks: 0
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: any) => {
    setEditingId(project.id);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      fullDescription: project.fullDescription || "",
      image: project.image || "",
      technologies: project.technologies ? project.technologies.join(", ") : (project.tags ? project.tags.join(", ") : ""),
      language: project.language || "",
      languageColor: project.languageColor || "#3178C6",
      github: project.github || "",
      live: project.live || "",
      stars: project.stars || 0,
      forks: project.forks || 0
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process form data back to arrays
    const payload = {
      ...formData,
      technologies: formData.technologies.split(",").map(t => t.trim()).filter(Boolean),
    };

    const url = editingId 
      ? `http://localhost:3001/projects/${editingId}`
      : "http://localhost:3001/projects";
    
    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setIsModalOpen(false);
        fetchProjects();
      })
      .catch(err => console.error(err));
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Projects</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-gray-500 font-medium">Image</th>
              <th className="px-6 py-4 text-gray-500 font-medium">Title</th>
              <th className="px-6 py-4 text-gray-500 font-medium">Language</th>
              <th className="px-6 py-4 text-gray-500 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{p.title}</td>
                <td className="px-6 py-4 text-gray-600">{p.language || "-"}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openEditModal(p)} className="text-blue-500 hover:text-blue-700 mr-4">
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingId ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input required type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                    value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea required className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={2}
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                <textarea required className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3}
                  value={formData.fullDescription} onChange={e => setFormData({...formData, fullDescription: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma separated)</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="React, Node.js"
                    value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="TypeScript"
                    value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language Color (Hex)</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="#3178C6"
                    value={formData.languageColor} onChange={e => setFormData({...formData, languageColor: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Github URL</label>
                  <input type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                    value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                  <input type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                    value={formData.live} onChange={e => setFormData({...formData, live: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stars</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                    value={formData.stars} onChange={e => setFormData({...formData, stars: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Forks</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                    value={formData.forks} onChange={e => setFormData({...formData, forks: Number(e.target.value)})} />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {editingId ? 'Save Changes' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
