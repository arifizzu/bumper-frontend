import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./css/styles.css";
import "./css/example-styles.css";
typeof window !== "undefined" && (window.React = React); // for devtools

export default function makeLayout(Layout) {
  //   // Basic layout that mirrors the internals of its child layout by listening to `onLayoutChange`.
  //   // It does not pass any other props to the Layout.
  const ListeningLayout = () => {
    const [layout, setLayout] = useState([]);

    const onLayoutChange = (newLayout) => {
      setLayout(newLayout);
    };

    const renderLayoutItems = () => {
      return layout.map((item) => (
        <div className="layoutItem" key={item.i}>
          <b>{item.i}</b>: [{item.x}, {item.y}, {item.w}, {item.h}]
        </div>
      ));
    };

    return (
      <React.StrictMode>
        <div>
          <div className="layoutJSON">
            Displayed as <code>[x, y, w, h]</code>:
            <div className="columns">{renderLayoutItems()}</div>
          </div>
          <Layout layout={layout} onLayoutChange={onLayoutChange} />
        </div>
      </React.StrictMode>
    );
  };

  function run() {
    const contentDiv = document.getElementById("content");
    const gridProps = window.gridProps || {};
    ReactDOM.render(<ListeningLayout {...gridProps} />, contentDiv);
  }

  if (!document.getElementById("content")) {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  return ListeningLayout;
}
