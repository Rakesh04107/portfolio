// import NeuralNetwork from './network';
import { lerp, getRGBA } from './utility';
const WIDTH = 600;
const HEIGHT = 500;
function visualizersetup(networkCtx) {
    networkCtx.canvas.width = WIDTH;
    networkCtx.canvas.height = HEIGHT;
    networkCtx.createCanvas(networkCtx.canvas.width, networkCtx.canvas.height);


}


class Visualizer {
    static drawNetwork(networkCtx, network, time) {
        networkCtx.background(0);

        // console.log(network);
        const margin = 50;
        const left = margin;
        const top = margin;

        // const width = networkCtx.canvas.width - margin * 2;
        // const height = networkCtx.canvas.height - margin * 2;
        const width = WIDTH - margin * 2;
        const height = HEIGHT - margin * 2;
        const levelHeight = height / network.levels.length;
        networkCtx.lineDashOffset = Math.random() * 3000;

        for (let i = network.levels.length - 1; i >= 0; i--) {
            const levelTop = top + lerp(height - levelHeight, 0,
                network.levels.length === 1 ? 0.5 : i / (network.levels.length - 1));
            this.drawLevel(networkCtx, network.levels[i], left, levelTop,
                width, levelHeight, i === network.levels.length - 1 ? ['▲', '▼', '➤', '◀'] : [], time);
        }
    }
    static drawLevel(networkCtx, level, left, top, width, height, outputLabels, time) {
        // Clear the canvas

        const right = left + width;
        const bottom = top + height;
        const nodeRadius = 20;
        var currentTime = new Date().getTime();
        // console.log(currentTime);
        const { inputs, outputs, weights, bias } = level;

        networkCtx.drawingContext.setLineDash([8, 4]);

        for (let i = 0; i < inputs.length; i++) {
            for (let j = 0; j < outputs.length; j++) {
                networkCtx.stroke(getRGBA(weights[i][j]));

                networkCtx.strokeWeight(2);
                networkCtx.line(this.#getNodePos(inputs, i, left, right), bottom, this.#getNodePos(outputs, j, left, right), top);
                networkCtx.drawingContext.lineDashOffset = currentTime % 200000;
            }
        }
        networkCtx.drawingContext.setLineDash([2, 3]);

        for (let i = 0; i < outputs.length; i++) {

            networkCtx.fill('black');
            const x = this.#getNodePos(outputs, i, left, right)
            networkCtx.noStroke();

            networkCtx.ellipse(x, top, nodeRadius); // Use ellipse to draw circles
            networkCtx.fill(getRGBA(outputs[i]));
            networkCtx.noStroke();
            networkCtx.ellipse(x, top, nodeRadius * 0.6); // Use ellipse to draw circles
            networkCtx.stroke(getRGBA(bias[i]));
            networkCtx.strokeWeight(1);
            networkCtx.ellipse(x, top, nodeRadius * 0.8); // Use ellipse to draw circles

            if (outputLabels[i]) {
                networkCtx.fill('black');
                networkCtx.textAlign('centre');
                networkCtx.stroke('yellow');
                networkCtx.text(outputLabels[i], x - nodeRadius * 0.3, top + nodeRadius * 0.18);
            }
        }
        networkCtx.strokeWeight(0);

        for (let i = 0; i < inputs.length; i++) {
            const x = this.#getNodePos(inputs, i, left, right);
            networkCtx.fill('black');
            networkCtx.ellipse(x, bottom, nodeRadius); // Use ellipse to draw circles
            networkCtx.fill(getRGBA(inputs[i]));
            networkCtx.ellipse(x, bottom, nodeRadius * 0.8); // Use ellipse to draw circles
        }

        networkCtx.drawingContext.setLineDash([]);


    }
    static #getNodePos(nodes, index, left, right) {
        return lerp(left, right, nodes.length === 1 ? 0.5 : index / (nodes.length - 1))
    }

}


export { visualizersetup, Visualizer };