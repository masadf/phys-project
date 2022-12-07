export const res = 20;

export function vectorGrid(chargeWindowId, points) {
    let grid_X = [];
    let grid_Y = [];
    let chargeWindow = document.getElementById(chargeWindowId);
    let height = chargeWindow.getBoundingClientRect().height;
    let width = chargeWindow.getBoundingClientRect().width;
    for (let i = 0; i < height / res; i++) {
        for (let j = 0; j < width / res; j++) {
            let Ex = 0;
            let Ey = 0;
            points.forEach((point) => {
                let [dEx, dEy] = calculatePointTension(point, j, i);
                Ex += dEx;
                Ey += dEy;
            })

            let EE = Math.sqrt(Ex * Ex + Ey * Ey);

            let deltax = 15 * Ex / EE;
            let deltay = 15 * Ey / EE;

            if (grid_X[i] === undefined) {
                grid_X[i] = [];
            }
            if (grid_Y[i] === undefined) {
                grid_Y[i] = [];
            }

            grid_X[i][j] = deltax;
            grid_Y[i][j] = deltay;
        }
    }
    return [grid_X, grid_Y];
}

export function calculateTensionInPoint(points, x, y) {
    let Ex = 0;
    let Ey = 0;
    points.forEach((point) => {
        let [dEx, dEy] = calculatePointTension(point, x / res, y / res);
        Ex += dEx;
        Ey += dEy;
    })

    return 9 * Math.sqrt(Ex * Ex + Ey * Ey);
}

function calculatePointTension(point, gridWidthIndex, gridHeightIndex) {
    let dx = point.x - gridWidthIndex * res;
    let dy = point.y - gridHeightIndex * res;
    let d = Math.sqrt(dx * dx + dy * dy);
    let E = point.charge / (d * d);
    let Ex = dx * E / d;
    let Ey = dy * E / d;
    if (isNaN(Ex) && isNaN(Ey)) {
        Ex = 99999999;
        Ey = 99999999;
    }
    return [Ex, Ey];
}