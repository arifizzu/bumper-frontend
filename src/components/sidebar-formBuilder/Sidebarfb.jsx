import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Alert, Button } from "react-bootstrap";

import { Sliders, BookOpen } from "react-feather";

import useOuterClick from "../../hooks/useOuterClick";

const Sidebarfb = () => {
  const [isOpen, setIsOpen] = useState(false);

  const innerRef = useOuterClick(() => {
    setIsOpen(false);
  });

  // Read from query parameter (e.g. ?theme=dark)
  // only for demo purposes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={innerRef}
      className={`settings js-settings ${isOpen ? "open" : ""}`}
    >
      <div className="settings-toggle">
        <div
          className="settings-toggle-option settings-toggle-option-text js-settings-toggle"
          title="Form Builder"
          onClick={() => setIsOpen(true)}
        >
          <Sliders className="feather align-middle" /> Builder
        </div>
      </div>
      <div className="settings-panel">
        <div className="settings-content">
          <div className="settings-body">
            <hr />
            <div className="mb-3">
              <span className="d-block font-size-lg fw-bold">
                Sidebar position
              </span>
              <span className="d-block text-muted mb-2">
                Toggle the position of the sidebar.
              </span>
              <div>hello</div>
            </div>
            <hr />

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebarfb;
