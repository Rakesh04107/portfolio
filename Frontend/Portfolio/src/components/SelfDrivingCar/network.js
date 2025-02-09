import { lerp } from './utility';

export default class NeuralNetwork {
    constructor(layerNeuronCounts) {
        this.levels = [];
        for (let i = 0; i < layerNeuronCounts.length - 1; i++) {
            this.levels.push(
                new Level(layerNeuronCounts[i], layerNeuronCounts[i + 1])
            );
        }
    }

    static feedForward(inputs, network) {
        let outputs = Level.feedForward(inputs, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    }

    static mutate(network, amount = 1) {
        network.levels.forEach(level => {
            for (let i = 0; i < level.bias.length; i++) {
                level.bias[i] = lerp(
                    level.bias[i],
                    getRandomBias(),
                    amount
                );
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        getRandomWeight(),
                        amount
                    );
                }
            }
        });
    }
}

class Level {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.bias = new Array(outputCount);
        this.weights = [];

        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount);
        }

        this.#initializeNetwork(inputCount, outputCount);
    }

    #initializeNetwork(inputCount, outputCount) {
        for (let i = 0; i < inputCount; i++) {
            for (let j = 0; j < outputCount; j++) {
                this.weights[i][j] = getRandomWeight();
            }
        }
        for (let j = 0; j < outputCount; j++) {
            this.bias[j] = getRandomBias();
        }
    }

    static feedForward(inputs, level) {
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = inputs[i];
        }

        for (let j = 0; j < level.outputs.length; j++) {
            let sum = 0;
            for (let i = 0; i < level.inputs.length; i++) {
                sum += level.inputs[i] * level.weights[i][j] + level.bias[j];
            }
            level.outputs[j] = sum >= 0 ? 1 : 0;
        }

        return level.outputs;
    }
}

// Helper functions for generating random weights and biases
function getRandomWeight() {
    return Math.random() * 2 - 1;
}

function getRandomBias() {
    return Math.random() * 2 - 1;
}
