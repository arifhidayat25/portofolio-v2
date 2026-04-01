import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, X } from "lucide-react";

import db from '../../../data/db.json';

export function ManageSkills() {
  const [skills, setSkills] = useState<any[]>(db.skills);
  const loading = false;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: "",
    items: "" // format: SkillName,Level\nSkillName2,Level2
  });

  const fetchSkills = () => {
    // Cannot fetch in fully static mode
    setSkills(db.skills);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Hapus kategori skill ini?")) return;
    fetch(`http://localhost:3001/skills/${id}`, { method: "DELETE" })
      .then(() => fetchSkills());
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ category: "", items: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (category: any) => {
    setEditingId(category.id);
    const itemsString = (category.items || []).map((item: any) => `${item.name},${item.level}`).join("\n");
    setFormData({
      category: category.category,
      items: itemsString
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse items
    const parsedItems = formData.items.split("\n")
      .filter(line => line.trim() !== "")
      .map(line => {
        const [name, level] = line.split(",");
        return { name: name?.trim() || "Unknown", level: parseInt(level?.trim() || "0") };
      });

    const payload = {
      category: formData.category,
      items: parsedItems
    };

    const url = editingId 
      ? `http://localhost:3001/skills/${editingId}`
      : "http://localhost:3001/skills";
    
    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setIsModalOpen(false);
        fetchSkills();
      })
      .catch(err => console.error(err));
  };

  if (loading) return <div>Loading skills...</div>;

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Skills</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          <span>Add Skill Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">{category.category}</h3>
              <div className="flex gap-2">
                <button onClick={() => openEditModal(category)} className="text-blue-500 hover:text-blue-700">
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {(category.items || []).map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-gray-600 text-sm">
                  <span>{item.name}</span>
                  <span className="font-semibold text-cyan-600">{item.level}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {skills.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center text-gray-500 py-12 border-2 border-dashed border-gray-200 rounded-2xl">
            No skill categories found.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingId ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="e.g. Frontend Development"
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills (Format: Name,Level)</label>
                <div className="text-xs text-gray-500 mb-2">Example:<br/>React,95<br/>Tailwind,90</div>
                <textarea required className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={5}
                  value={formData.items} onChange={e => setFormData({...formData, items: e.target.value})} />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {editingId ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
