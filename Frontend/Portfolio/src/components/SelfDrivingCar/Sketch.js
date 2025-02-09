import Car from './Car';
import NeuralNetwork from './network';
import Road from './road';
import { Visualizer } from './visualizer';

const width = 300;
const height = 500;
const N = 300;

const config = {
    carColors: [[0, 0, 255]],
    carSizes: [30, 50],
    laneCenters: [0, 1, 2, 3],
};

let road;
let bestCar;
let workingcars;
let cars = [];
let traffic = [];
let passed = false;

function save() {
    try {
        localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain));
        console.log('Saved to localStorage');
    } catch (error) {
        console.error('Failed to save to localStorage', error);
    }
}

function deleteBrain() {
    localStorage.clear();
    console.log('LocalStorage cleared');
}

function setup(p) {
    p.createCanvas(width, height);
    road = new Road(width / 2, width * 0.9, config.laneCenters.length);
    for (let i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI", [0, 0, 255], 3));
    }

    if (localStorage.getItem('bestBrain')) {
        for (let i = 0; i < cars.length; i++) {
            cars[i].brain = JSON.parse(localStorage.getItem('bestBrain'));
            if (i !== 0) {
                NeuralNetwork.mutate(cars[i].brain, 0.1);
            }
        }
    }

    traffic = [
        new Car(getRandomLaneCenter(), -300, 30, 50, 'traffic', [255, 0, 0], 2),
        new Car(getRandomLaneCenter(), -150, 30, 50, 'traffic', [255, 0, 0], 2),
        // ... other traffic cars
    ];

    // Initialize bestCar
    bestCar = cars[0];
}

function getRandomColor() {
    return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
}

function getRandomLaneCenter() {
    const randomLaneIndex = Math.floor(Math.random() * config.laneCenters.length);
    return road.getLaneCenter(config.laneCenters[randomLaneIndex]);
}

function mouseClicked() {
    if (bestCar) {
        traffic.push(new Car(getRandomLaneCenter(), bestCar.y - 400, 30, 50, 'traffic', getRandomColor(), Math.floor(Math.random() * 3) + 1));
    }
}

function keyPressed(p) {
    if (bestCar) {
        bestCar.control.keyPressed(p);
    }
}

function keyReleased(p) {
    if (bestCar) {
        bestCar.control.keyReleased(p);
    }
}

function draw(p) {
    p.background(212, 212, 212);

    // Update traffic cars
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    // Update working cars
    workingcars = cars.filter(car => !car.damaged);

    if (workingcars.length > 0) {
        // Update working cars
        for (let i = 0; i < workingcars.length; i++) {
            workingcars[i].update(road.borders, traffic);
        }

        // Find the best car (the one closest to the goal)
        bestCar = workingcars.reduce((prev, curr) => (curr.y < prev.y ? curr : prev));

        // Translate based on bestCar
        p.translate(0, -bestCar.y + height * 0.7);
    } else {
        // All cars are damaged
        console.log('All cars are damaged.');

        // Stop the draw loop
        p.noLoop();

        // Optionally, display a message on the canvas
        p.textSize(32);
        p.fill(255, 0, 0);
        p.textAlign(p.CENTER, p.CENTER);
        p.text('All cars have crashed!', p.width / 2, -bestCar.y + height / 2);

        // Return early to avoid drawing the road, traffic, and cars
        return;
    }

    // Draw the road
    road.draw(p);

    // Draw traffic
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(p);
    }

    // Draw all cars with reduced opacity
    for (let i = 0; i < cars.length; i++) {
        cars[i].alpha = 0.2;
        cars[i].draw(p);
    }

    // Highlight the best car
    if (bestCar) {
        bestCar.alpha = 1;
        bestCar.draw(p);
    }
}

function visualizer(networkCtx) {
    if (bestCar) {
        Visualizer.drawNetwork(networkCtx, bestCar.brain);
    }
}

function randomTraffic() {
    if (passed) {
        mouseClicked();
        passed = false;
    }
}

export { setup, visualizer, mouseClicked, keyPressed, keyReleased, draw, save, deleteBrain, randomTraffic };