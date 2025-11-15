import React from "react";
import { Routes, Route } from "react-router-dom";
import ProjectPreview from "./ProjectPreview";

export default function ProjectRoutes() {
  return (
    <Routes>
      <Route path="/preview/:projectName" element={<ProjectPreview />} />
      {/* add other routes as needed */}
    </Routes>
  );
}
