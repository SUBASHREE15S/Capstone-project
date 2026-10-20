import React, { useState } from "react";

function RequirementsTable({ requirements = [], requirementDNA = [], requirementInfluence = [], setSelectedDNA }) {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReq, setSelectedReq] = useState(null);

  const rowsPerPage = 5;
  const modules = ["All", "Authentication", "Payment", "Dashboard", "Admin", "Profile", "General"];

  // Filter logic
  const filtered = (requirements || []).filter((req) => {
    const matchesSearch =
      req.requirement_id?.toLowerCase().includes(search.toLowerCase()) ||
      req.description?.toLowerCase().includes(search.toLowerCase()) ||
      req.module?.toLowerCase().includes(search.toLowerCase());

    const matchesModule = moduleFilter === "All" || req.module === moduleFilter;

    return matchesSearch && matchesModule;
  });

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRows = filtered.slice(startIndex, startIndex + rowsPerPage);

  const handleRowClick = (req) => {
    setSelectedReq(req);
  };

  return (
    <div id="requirements" className="requirements-table-container">
      <div style={{ padding: "20px 20px 0 20px" }}>
        <h3 className="section-title">Extracted Requirements List</h3>
        
        <div className="toolbar" style={{ marginTop: "10px" }}>
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Filter requirements..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="filter-group">
            {modules.map((m) => (
              <button
                key={m}
                className={`filter-btn ${moduleFilter === m ? "active" : ""}`}
                onClick={() => {
                  setModuleFilter(m);
                  setCurrentPage(1);
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <table className="requirements-table">
        <thead>
          <tr>
            <th style={{ width: "15%" }}>Requirement</th>
            <th style={{ width: "15%" }}>Influence</th>
            <th style={{ width: "15%" }}>Priority</th>
            <th style={{ width: "15%" }}>Complexity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "var(--text-muted)" }}>
                No matching requirements found.
              </td>
            </tr>
          ) : (
            paginatedRows.map((req, index) => {
              const dna = (requirementDNA || []).find(
                item => item.requirement_id === req.requirement_id
              ) || {};
              const inf = (requirementInfluence || []).find(
                item => item.requirement_id === req.requirement_id
              ) || {};

              const influenceScore = inf.influence_score !== undefined ? `${inf.influence_score}%` : "--";
              const complexityScore = dna.complexity_score !== undefined ? `${Math.round(dna.complexity_score * 100)}%` : "--";
              const priority = req.priority || dna.priority || "Low";

              return (
                <tr 
                  key={index} 
                  onClick={() => {
                    handleRowClick(req);
                    if (requirementDNA && setSelectedDNA) {
                      setSelectedDNA(dna);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <td style={{ fontWeight: "bold" }}>{req.requirement_id}</td>
                  <td>
                    <span className="badge" style={{
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "var(--color-primary)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontWeight: "600"
                    }}>
                      {influenceScore}
                    </span>
                  </td>
                  <td>
                    <span className="badge" style={{
                      backgroundColor: priority.toLowerCase() === "high" ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)",
                      color: priority.toLowerCase() === "high" ? "#ef4444" : "#3b82f6",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontWeight: "600"
                    }}>
                      {priority}
                    </span>
                  </td>
                  <td>{complexityScore}</td>
                  <td>{req.description}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {filtered.length > rowsPerPage && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Requirement Details Modal */}
      {selectedReq && (
        <div className="dialog-overlay" onClick={() => setSelectedReq(null)}>
          <div className="dialog-card" onClick={(e) => e.stopPropagation()}>
            <button className="dialog-close" onClick={() => setSelectedReq(null)}>×</button>
            <h2 style={{ marginBottom: "16px", color: "var(--color-primary)" }}>Requirement Detail</h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <strong>ID:</strong>
                <div style={{ background: "var(--bg-primary)", padding: "10px", borderRadius: "8px", marginTop: "4px" }}>
                  {selectedReq.requirement_id}
                </div>
              </div>

              <div>
                <strong>Module Category:</strong>
                <div style={{ background: "var(--bg-primary)", padding: "10px", borderRadius: "8px", marginTop: "4px" }}>
                  {selectedReq.module}
                </div>
              </div>

              <div>
                <strong>Description:</strong>
                <div style={{ background: "var(--bg-primary)", padding: "10px", borderRadius: "8px", marginTop: "4px", lineHeight: "1.4" }}>
                  {selectedReq.description}
                </div>
              </div>

              {selectedReq.actor && (
                <div>
                  <strong>Primary Actor:</strong>
                  <div style={{ background: "var(--bg-primary)", padding: "10px", borderRadius: "8px", marginTop: "4px" }}>
                    {selectedReq.actor}
                  </div>
                </div>
              )}

              {selectedReq.priority && (
                <div>
                  <strong>Calculated Priority:</strong>
                  <div style={{ background: "var(--bg-primary)", padding: "10px", borderRadius: "8px", marginTop: "4px" }}>
                    {selectedReq.priority}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequirementsTable;
