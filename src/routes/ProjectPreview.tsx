import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ProjectPreview() {
  const { projectName } = useParams();
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  const [isValidPreview, setIsValidPreview] = useState(true);

  // Validate projectName as a folder name (basic check)
  useEffect(() => {
    if (
      !projectName ||
      // Check if projectName looks like a full URL or domain, simple heuristic
      projectName.startsWith("http") ||
      projectName.includes(".com")
    ) {
      setIsValidPreview(false);
    } else {
      setIsValidPreview(true);
    }
  }, [projectName]);

  // Build preview path only if valid
  const projectPath = isValidPreview
    ? `/ProjectsPreview/${projectName}/index.html`
    : null;

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Back Button - always visible */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          padding: "8px 15px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        ← Back
      </button>

      {!isError && isValidPreview && projectPath ? (
        <iframe
          src={projectPath}
          title={`${projectName} Preview`}
          style={{ width: "100%", height: "100%", border: "none" }}
          onError={() => setIsError(true)}
        />
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            color: "#fff", // error red
            padding: 20,
            textAlign: "center",
            backgroundColor: "#330000", // dark red background for better contrast
            borderRadius: 10,
            margin: "0 20px",
            boxShadow: "0 0 15px rgba(176, 0, 32, 0.7)",
          }}
        >
          <FaExclamationTriangle size={60} style={{ marginBottom: 20 }} />
          <p>
            Live demo is not available for this project. To see this demo
            request for project on <strong>Request Custom project</strong>
          </p>
        </div>
      )}
    </div>
  );
}
