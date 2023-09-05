import React from 'react';

function ErrorAlert({ message }) {
    if (!message) return null;

    return (
        <div className="alert" >
            {message}
        </div>
    );
}

export default ErrorAlert;
