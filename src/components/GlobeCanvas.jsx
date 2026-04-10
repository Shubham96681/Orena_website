import { useEffect, useRef } from "react";

const CONTINENTS = [
    [[70, -140], [72, -100], [70, -85], [60, -65], [47, -53], [44, -66], [35, -75], [25, -80], [20, -87], [15, -85], [8, -77], [9, -83], [15, -92], [22, -106], [30, -112], [32, -117], [38, -122], [48, -124], [54, -130], [60, -140], [65, -168], [68, -166], [70, -163], [72, -157], [70, -140]],
    [[12, -72], [10, -62], [8, -60], [5, -52], [2, -50], [-5, -35], [-15, -39], [-23, -43], [-33, -53], [-40, -62], [-52, -68], [-55, -66], [-53, -70], [-45, -65], [-35, -57], [-25, -48], [-15, -75], [-5, -80], [0, -78], [5, -77], [10, -73], [12, -72]],
    [[71, 28], [70, 20], [65, 14], [58, 5], [51, 2], [44, -8], [36, -6], [36, 4], [37, 15], [41, 28], [45, 30], [47, 22], [48, 17], [54, 18], [60, 25], [65, 25], [68, 18], [70, 28], [71, 28]],
    [[37, 10], [30, 32], [10, 42], [0, 42], [-10, 40], [-20, 35], [-35, 27], [-34, 18], [-30, 17], [-18, 12], [-5, 10], [5, 2], [4, -8], [5, -5], [10, -15], [15, -17], [20, -17], [25, -15], [30, -10], [32, 2], [37, 10]],
    [[70, 30], [72, 60], [72, 100], [68, 140], [60, 150], [50, 142], [40, 130], [35, 120], [22, 114], [10, 104], [5, 100], [2, 104], [1, 110], [5, 115], [10, 124], [20, 120], [25, 122], [30, 120], [35, 130], [40, 140], [50, 142], [60, 150], [68, 140], [72, 100], [75, 80], [75, 60], [70, 30]],
    [[55, 30], [60, 40], [65, 50], [68, 60], [70, 80], [72, 100], [75, 100], [75, 80], [72, 60], [70, 40], [65, 32], [60, 28], [55, 30]],
    [[-15, 130], [-12, 136], [-13, 142], [-18, 147], [-28, 153], [-37, 150], [-38, 145], [-35, 138], [-32, 133], [-28, 114], [-22, 113], [-18, 122], [-15, 130]],
    [[83, -45], [80, -25], [76, -18], [72, -22], [68, -25], [66, -36], [68, -52], [72, -56], [76, -64], [80, -58], [83, -45]],
    [[45, 141], [40, 141], [34, 136], [34, 130], [37, 136], [40, 140], [45, 141]],
    [[58, -5], [57, 0], [52, 2], [50, -4], [52, -5], [54, -3], [58, -5]],
];

const NODES = [
    [51.5, -0.1], [40.7, -74], [35.7, 139.7], [28.6, 77.2], [31.2, 121.5],
    [-33.9, 151.2], [48.8, 2.35], [55.7, 37.6], [19.4, -99.1], [-23.5, -46.6],
    [1.3, 103.8], [25.2, 55.3], [41.0, 29.0], [-26, 28], [6.5, 3.4],
    [30.0, 31.2], [39.9, 116.4], [37.5, 127], [34.0, 118.2], [43.7, -79.4],
];

const EDGES = [
    [0, 6], [0, 9], [1, 14], [1, 18], [2, 8], [2, 16], [3, 16], [3, 12],
    [4, 16], [5, 8], [6, 9], [7, 12], [10, 5], [11, 12], [13, 15], [17, 16], [18, 1], [19, 1], [15, 3],
];

const toRad = (d) => d * Math.PI / 180;

export default function GlobeCanvas({ size = 520 }) {
    const canvasRef = useRef(null);
    const rotRef = useRef(0);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = size;
        canvas.width = W;
        canvas.height = W;
        const cx = W / 2, cy = W / 2, R = W * 0.42;

        const project = (latDeg, lonDeg) => {
            const lat = toRad(latDeg);
            const lon = toRad(lonDeg);
            const x = Math.cos(lat) * Math.sin(lon + rotRef.current);
            const y = Math.sin(lat);
            const z = Math.cos(lat) * Math.cos(lon + rotRef.current);
            return { x: cx + x * R, y: cy - y * R, z };
        };

        const drawGlow = () => {
            const g = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.4);
            g.addColorStop(0, "rgba(46,204,113,0.4)");
            g.addColorStop(0.3, "rgba(46,204,113,0.15)");
            g.addColorStop(1, "rgba(46,204,113,0)");
            ctx.beginPath();
            ctx.arc(cx, cy, R * 1.4, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();
        };

        const drawOcean = () => {
            // Realistic 3D Sphere Shading
            const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
            g.addColorStop(0, "rgba(15, 61, 46, 0.95)"); // Bright highlight
            g.addColorStop(0.6, "rgba(10, 30, 25, 0.98)");
            g.addColorStop(1, "rgba(5, 10, 8, 1)"); // Deep shadow on edges
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();
        };

        const drawGrid = () => {
            for (let lat = -75; lat <= 75; lat += 30) {
                ctx.beginPath();
                let first = true;
                for (let lo = 0; lo <= 360; lo += 3) {
                    const p = project(lat, lo);
                    if (p.z < -0.1) { first = true; continue; }
                    first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
                    first = false;
                }
                ctx.strokeStyle = "rgba(0,255,100,0.1)";
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
            for (let lo = 0; lo < 360; lo += 30) {
                ctx.beginPath();
                let first = true;
                for (let lat = -90; lat <= 90; lat += 3) {
                    const p = project(lat, lo);
                    if (p.z < -0.1) { first = true; continue; }
                    first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
                    first = false;
                }
                ctx.strokeStyle = "rgba(0,255,100,0.1)";
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        };

        const drawContinents = () => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.clip(); // Creates realistic wrapping edge

            CONTINENTS.forEach((poly) => {
                ctx.beginPath();
                let started = false;
                poly.forEach(([lat, lon]) => {
                    const p = project(lat, lon);
                    if (!started) { ctx.moveTo(p.x, p.y); started = true; }
                    else ctx.lineTo(p.x, p.y);
                });
                ctx.closePath();

                // Match continent lighting to the sphere shading
                const grad = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
                grad.addColorStop(0, "rgba(46, 255, 113, 0.7)");
                grad.addColorStop(1, "rgba(10, 40, 20, 0.2)");

                ctx.fillStyle = grad;
                ctx.fill();

                // Smooth jagged edges
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                ctx.strokeStyle = "rgba(46, 255, 113, 0.6)";
                ctx.lineWidth = 1.2;
                ctx.stroke();
            });
            ctx.restore();
        };

        const drawEdges = () => {
            EDGES.forEach(([i, j]) => {
                const a = project(NODES[i][0], NODES[i][1]);
                const b = project(NODES[j][0], NODES[j][1]);
                if (a.z < 0 || b.z < 0) return;
                const alpha = Math.min(a.z, b.z) * 0.6;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(0,255,100,${alpha * 0.5})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            });
        };

        const drawNodes = () => {
            NODES.forEach(([lat, lon]) => {
                const p = project(lat, lon);
                if (p.z < 0) return;
                const alpha = 0.4 + 0.6 * p.z;
                const sz = 2.5 + 2 * p.z;
                const pulse = (Math.sin(Date.now() / 600 + lat) + 1) / 2;
                ctx.beginPath();
                ctx.arc(p.x, p.y, sz * 2.5 + pulse * 3, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0,255,100,${alpha * 0.2 * pulse})`;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(p.x, p.y, sz * 1.8, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0,255,100,${alpha * 0.35})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0,255,100,${alpha})`;
                ctx.fill();
            });
        };

        const drawRim = () => {
            ctx.beginPath();
            ctx.arc(cx, cy, R * 1.08, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(0,255,100,0.4)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
        };

        const drawPulseRing = () => {
            const t = (Date.now() % 2000) / 2000;
            const r = R * (1.0 + t * 0.2);
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,255,100,${0.15 * (1 - t)})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        const draw = () => {
            ctx.clearRect(0, 0, W, W);
            drawGlow();
            drawPulseRing();
            drawOcean();
            drawGrid();
            drawContinents();
            drawEdges();
            drawNodes();
            drawRim();
            rotRef.current += 0.003;
            rafRef.current = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(rafRef.current);
    }, [size]);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "auto", maxWidth: size, display: "block", aspectRatio: "1/1" }}
        />
    );
}
