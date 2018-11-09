import React from 'react';

export default class ErrorBoundary extends React.Component {
    state = { error: null, errorInfo: null };
    
    componentDidCatch = (error, errorInfo) => {
        // Catch errors in any components and render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        // log error messages to an error reporting service
    };

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div className="errFrame">
                    <h2 className="failMSG">
                        Cancel my subscription.
                    </h2>
                    <span className="info">
                        Click details to see more info..
                    </span>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}
window.gm_authFailure = () => { 
    alert("Please check your Google API key") 
};
