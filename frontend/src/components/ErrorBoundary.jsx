import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch() {}

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--text)' }}>
                        Something went wrong
                    </h1>
                    <p style={{ color: 'var(--text-dim)', marginBottom: '30px' }}>
                        We're experiencing technical difficulties. Please refresh the page or try again later.
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="btn btn-primary"
                        style={{ padding: '12px 24px' }}
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;