import React from "react"

export default function FloatingIcons() {
    return (
        <>
            <div className="absolute top-10 left-10 animate-float bg-white/10 p-4 rounded-xl backdrop-blur">
                ⚙️
            </div>

            <div className="absolute bottom-10 right-10 animate-float2 bg-white/10 p-4 rounded-xl backdrop-blur">
                🛡️
            </div>

            <div className="absolute top-1/2 left-[-40px] animate-float bg-white/10 p-4 rounded-xl backdrop-blur">
                ☁️
            </div>
        </>
    );
}
