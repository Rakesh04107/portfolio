function lerp(A, B, t) {
    return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {
    const denominator = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (denominator === 0) {
        return null; // Lines are parallel
    }

    const t = ((D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)) / denominator;
    const u = ((C.y - A.y) * (B.x - A.x) - (C.x - A.x) * (B.y - A.y)) / denominator;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
            x: lerp(A.x, B.x, t),
            y: lerp(A.y, B.y, t),
            offset: t
        };
    }
    return null;
}

function polyIntersect(poly1, poly2) {
    for (let i = 0; i < poly1.length; i++) {
        const A = poly1[i];
        const B = poly1[(i + 1) % poly1.length];

        for (let j = 0; j < poly2.length; j++) {
            const C = poly2[j];
            const D = poly2[(j + 1) % poly2.length];

            const touch = getIntersection(A, B, C, D);
            if (touch) {
                return true;
            }
        }
    }
    return false;
}

function getRGBA(value) {
    const alpha = Math.abs(value);
    const R = value < 0 ? 0 : 255;
    const G = R;
    const B = value > 0 ? 0 : 255;
    return `rgba(${R},${G},${B},${alpha})`;
}

export { lerp, getIntersection, getRGBA, polyIntersect };