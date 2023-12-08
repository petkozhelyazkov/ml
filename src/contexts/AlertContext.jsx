import { createContext, useState, useCallback } from 'react';

export const AlertContext = createContext();

export const alertType = {
    success: 'success',
    error: 'error'
}

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ visible: false, message: '', type: '' });

    const showAlert = useCallback((message, type) => {
        setAlert({ visible: true, message, type });

        setTimeout(() => {
            setAlert({ visible: false, message: '', type: '' });
        }, 5000);
    }, []);

    const hideAlert = useCallback(() => {
        setAlert({ visible: false, message: '', type: '' });
    }, []);

    return (
        <AlertContext.Provider
            value={{ alert, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    )
}