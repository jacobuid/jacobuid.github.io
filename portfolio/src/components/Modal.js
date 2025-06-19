import React from 'react';
import './Modal.css';

export function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
                <div className='modal-body'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export function Trigger({ children, onOpen }) {
    // Clone the child and inject onClick
    return React.cloneElement(children, {
        onClick: (e) => {
            if (children.props.onClick) children.props.onClick(e);
            onOpen();
        }
    });
}