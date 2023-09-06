import React from 'react';

function ErrorAlert({ message }) {
    if (!message) return null;

    return (
        <div className="container card alert error-alert bottom-margin" >
            {message}
        </div>
    );
}

export default ErrorAlert;
