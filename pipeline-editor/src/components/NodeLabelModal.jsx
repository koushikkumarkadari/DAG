import React, { useState, useEffect } from 'react';

export default function NodeLabelModal({ open, onClose, onSubmit }) {
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (open) setLabel('');
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Enter node label</h3>
        <input
          autoFocus
          value={label}
          onChange={e => setLabel(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && label.trim()) onSubmit(label); }}
          placeholder="Node label..."
        />
        <div className="modal-actions">
          <div className="modal-buttons">
            <button onClick={() => onSubmit(label)} disabled={!label.trim()}>
              <span className="add-button">Add</span>
            </button>
            <button onClick={onClose}>
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}