import React from 'react';
import { useUIContext } from '../context/UIContext';

const GlobalUI = () => {
    const { modal, hideModal, toast } = useUIContext();

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            if (modal.type !== 'blocking') { // Optional: prevent closing on backdrop click if needed
                hideModal();
                if (modal.onCancel) modal.onCancel();
            }
        }
    };

    const handleConfirm = () => {
        if (modal.onConfirm) modal.onConfirm();
        hideModal();
    };

    const handleCancel = () => {
        if (modal.onCancel) modal.onCancel();
        hideModal();
    };

    return (
        <>
            {/* MODAL */}
            {modal.isOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <h3 className="modal-title">{modal.title}</h3>
                        <p className="modal-message">{modal.message}</p>

                        <div className="modal-actions">
                            {modal.type === 'confirm' ? (
                                <>
                                    <button className="btn btn-outline" onClick={handleCancel}>
                                        {modal.cancelText}
                                    </button>
                                    <button className="btn btn-primary" onClick={handleConfirm}>
                                        {modal.confirmText}
                                    </button>
                                </>
                            ) : (
                                <button className="btn btn-primary" onClick={handleConfirm}>
                                    OK
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* TOAST */}
            <div className={`toast ${toast.isVisible ? 'show' : ''} toast-${toast.type}`}>
                {toast.message}
            </div>
        </>
    );
};

export default GlobalUI;
