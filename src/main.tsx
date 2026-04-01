import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import { DashboardLayout } from "./app/dashboard/DashboardLayout.tsx";
import { Overview } from "./app/dashboard/pages/Overview.tsx";
import { ManageProjects } from "./app/dashboard/pages/ManageProjects.tsx";
import { ManageSkills } from "./app/dashboard/pages/ManageSkills.tsx";
import { ManageProfile } from "./app/dashboard/pages/ManageProfile.tsx";
import { ThemeProvider } from "./providers/theme-provider";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="skills" element={<ManageSkills />} />
          <Route path="profile" element={<ManageProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);