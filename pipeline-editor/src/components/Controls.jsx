// components/Controls.js
import React from 'react';

function Controls({ addNode, applyAutoLayout }) {
  return (
    <div className="controls">
      <button onClick={addNode}>
        <span>+ Add Node</span>
      </button>
      <button onClick={applyAutoLayout}>
        <span>⚡ Auto Layout</span>
      </button>
    </div>
  );
}

export default Controls;