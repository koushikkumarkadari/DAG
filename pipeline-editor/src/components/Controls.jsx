// components/Controls.js
import React from 'react';

function Controls({ addNode, applyAutoLayout,deleteSelected }) {
  return (
    <div className="controls">
      <button onClick={addNode}>
        <span>+ Add Node</span>
      </button>
      <button onClick={applyAutoLayout}>
        <span>⚡ Auto Layout</span>
      </button>
      <button onClick={deleteSelected}>Delete Selected</button>
    </div>
  );
}

export default Controls;