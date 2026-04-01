import { useEffect, useState } from "react";

import db from '../../../data/db.json';

export function Overview() {
  const stats = { projects: db.projects.length, skills: db.skills.length };
  const loading = false;

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
