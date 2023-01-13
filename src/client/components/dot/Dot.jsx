import React from 'react';

export default ({ color, size }) => (
    <div 
        style={{
            borderRadius: '99%',
            width: size ? `${size}px` : '10px',
            height: size ? `${size}px` : '10px',
            backgroundColor: color,
        }}
    />
);