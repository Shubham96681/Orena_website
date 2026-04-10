import React from 'react';

export default function AnimatedWave({
    fillColor = "#ffffff",
    accentColor = "#7ed957",
    secondaryAccentColor = "#a5d6a7",
    height = "120px",
    inverted = false,
    opacity = 1
}) {
    // Unique ID for the gradient to prevent collisions on pages with multiple waves
    const gradientId = React.useMemo(() => `waveGradient-${Math.floor(Math.random() * 10000)}`, []);

    return (
        <svg
            viewBox="0 0 1440 180"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{
                display: 'block',
                width: '100%',
                height: height,
                transform: inverted ? 'rotate(180deg)' : 'none',
                opacity: opacity
            }}
        >
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#d4edda" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#b2d8b5" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#c8e6c9" stopOpacity="0.5" />
                </linearGradient>
            </defs>

            {/* Layer 1 — wide background swell (Green Gradient Band) */}
            <path
                d="M0,60 C200,120 400,20 600,80 C800,140 1000,30 1200,85 C1320,115 1400,75 1440,65 L1440,180 L0,180 Z"
                fill={`url(#${gradientId})`}
            />

            {/* Layer 2 — fill below the sharp wave edge (Matches the section below) */}
            <path
                d="M0,110 C180,70 360,150 560,110 C760,70 960,145 1180,110 C1320,90 1400,120 1440,112 L1440,180 L0,180 Z"
                fill={fillColor}
            />

            {/* Layer 3 — vivid bright green thin ribbon (Primary Accent) */}
            <path
                d="M0,60 C200,120 400,20 600,80 C800,140 1000,30 1200,85 C1320,115 1400,75 1440,65"
                fill="none"
                stroke={accentColor}
                strokeWidth="3"
                strokeLinecap="round"
            />

            {/* Layer 4 — softer secondary ribbon for visual depth */}
            <path
                d="M0,72 C200,130 400,32 600,92 C800,152 1000,42 1200,97 C1320,128 1400,87 1440,77"
                fill="none"
                stroke={secondaryAccentColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
            />
        </svg>
    );
}
