const API_URL = import.meta.env.VITE_API_URL;

export const fetchData = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    // Log outgoing request for debugging
    console.log(`[API REQUEST] ${options.method || 'GET'} ${API_URL}${endpoint}`);

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                ...options.headers,
            },
        });

        // Try parsing JSON error if not OK
        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            let errorMessage = 'An unexpected error occurred';

            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                errorMessage = errorData.error || errorData.message || errorMessage;
            } else {
                errorMessage = await response.text();
            }

            console.error(`[API ERROR] ${response.status}: ${errorMessage}`);
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log(`[API SUCCESS] ${endpoint}`, data);
        return data;
    } catch (err) {
        console.error(`[API FATAL] ${endpoint}`, err.message);
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
