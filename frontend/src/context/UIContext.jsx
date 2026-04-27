import React, { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info', // info, success, error, confirm
        onConfirm: null,
        onCancel: null,
        confirmText: 'Confirm',
        cancelText: 'Cancel'
    });

    const [toast, setToast] = useState({
        isVisible: false,
        message: '',
        type: 'info' // info, success, error
    });

    const showModal = useCallback(({
        title,
        message,
        type = 'info',
        onConfirm = null,
        onCancel = null,
        confirmText = 'Confirm',
        cancelText = 'Cancel'
    }) => {
        setModal({
            isOpen: true,
            title,
            message,
            type,
            onConfirm,
            onCancel,
            confirmText,
            cancelText
        });
    }, []);

    const hideModal = useCallback(() => {
        setModal(prev => ({ ...prev, isOpen: false }));
    }, []);

    const showToast = useCallback((message, type = 'info') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, isVisible: false }));
        }, 3000);
    }, []);

    return (
        <UIContext.Provider value={{ modal, toast, showModal, hideModal, showToast }}>
            {children}
        </UIContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUIContext = () => useContext(UIContext);
