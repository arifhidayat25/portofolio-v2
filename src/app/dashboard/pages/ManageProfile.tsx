import { useState, useEffect } from "react";
import { Save } from "lucide-react";

import db from '../../../data/db.json';

export function ManageProfile() {
  const [profile, setProfile] = useState<any>(db.profile);
  const loading = false;
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    // profile has fields that are numbers, ensure they are parsed if needed,
    // but the input type="number" returns a string value in onChange.
    // Let's parse them here for correctness.
    const updatedProfile = {
      ...profile,
      yearsOfExperience: Number(profile.yearsOfExperience),
      totalProjects: Number(profile.totalProjects),
      totalClients: Number(profile.totalClients),
    };

    fetch("http://localhost:3001/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save profile");
        setMessage("Profile berhasil disimpan!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
        setMessage("Gagal menyimpan profile.");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) return <div className="text-gray-500">Loading profile...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Profile</h1>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded-lg ${message.includes('berhasil') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={profile?.name || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role / Profesi
              </label>
              <input
                type="text"
                name="role"
                value={profile?.role || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-gray-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto Hero (Link URL)
            </label>
            <input
              type="url"
              name="heroImage"
              value={profile?.heroImage || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-gray-800"
              placeholder="https://example.com/foto-hero.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">URL foto untuk halaman utama (Hero section).</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto About (Link URL)
            </label>
            <input
              type="url"
              name="aboutImage"
              value={profile?.aboutImage || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-gray-800"
              placeholder="https://example.com/foto-about.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">URL foto untuk bagian Tentang Saya.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tentang Saya (About)
            </label>
            <textarea
              name="about"
              value={profile?.about || ""}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-gray-700 leading-relaxed resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pengalaman (Tahun)
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={profile?.yearsOfExperience || 0}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Projek
              </label>
              <input
                type="number"
                name="totalProjects"
                value={profile?.totalProjects || 0}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Klien
              </label>
              <input
                type="number"
                name="totalClients"
                value={profile?.totalClients || 0}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-gray-800"
              />
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Menyimpan..." : "Simpan Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
