const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchData = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    try {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            let errorMessage = 'Service temporarily unavailable. Please try again.';

            if (contentType && contentType.includes("application/json")) {
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.message || errorMessage;
                } catch {
                    console.log("some error is coming ..")
                }
            } else {
                const text = await response.text();
                if (text.trim().startsWith('<')) {
                    errorMessage = `Service error (${response.status}). Please check your connection and try again.`;
                } else {
                    errorMessage = text || errorMessage;
                }
            }

            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Network error. Please check your internet connection.');
        }
        throw err;
    }
};

export const login = (credentials) => fetchData('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
});

export const signup = (data) => fetchData('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
});
