// Import dependencies
import Control from './controls';
import Sensor from './sensor';
import NeuralNetwork from './network';
import { polyIntersect } from './utility';

export default class Car {
    constructor(x, y, widthCar, length, carType, color, maxSpeed = 3) {
        this.x = x;
        this.y = y;
        this.widthCar = widthCar;
        this.length = length;
        this.carAI = carType === 'AI';

        // Initialize sensor and brain if the car is not traffic
        if (carType !== 'traffic') {
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork([this.sensor.rayCount, 7, 4]);
        }

        // Initialize control system
        this.control = new Control(carType);

        // Initialize car physics properties
        this.speed = 0;
        this.acceleration = 0.5;
        this.maxSpeed = maxSpeed;
        this.carType = carType;
        this.friction = 0.05;
        this.angle = 0;

        // Initialize collision detection and drawing properties
        this.polygon = [];
        this.damaged = false;
        this.color = color;
        this.alpha = 1;
    }

    // Update method to handle car behavior each frame
    update(roadBorders, traffic) {
        if (!this.damaged) {
            this.moveCar();
            this.polygon = this.createPolygon();
            this.damaged = this.assertDamage(roadBorders, traffic);
        }

        if (this.sensor) {
            this.sensor.update(roadBorders, traffic);
            const offsets = this.sensor.readings.map(s => (s == null ? 0 : 1 - s.offset));
            const outputs = NeuralNetwork.feedForward(offsets, this.brain);

            if (this.carAI) {
                this.control.up = outputs[0];
                this.control.down = outputs[1];
                this.control.right = outputs[2];
                this.control.left = outputs[3];
            }
        }
    }

    // Method to check for collisions with road borders or other cars
    assertDamage(roadBorders, traffic) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polyIntersect(this.polygon, roadBorders[i])) {
                return true;
            }
        }
        for (let i = 0; i < traffic.length; i++) {
            if (polyIntersect(this.polygon, traffic[i].polygon)) {
                return true;
            }
        }
        return false;
    }

    // Method to create the car's polygon for collision detection
    createPolygon() {
        const points = [];
        const rad = Math.hypot(this.widthCar, this.length) / 2;
        const alpha = Math.atan2(this.widthCar, this.length);

        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });

        return points;
    }

    // Method to move the car based on controls and apply physics
    moveCar() {
        // Update speed based on acceleration and controls
        if (this.control.up) {
            this.speed += this.acceleration;
        }
        if (this.control.down) {
            this.speed -= this.acceleration;
        }

        // Update angle based on controls and current speed direction
        if (this.speed !== 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.control.left) {
                this.angle += 0.03 * flip;
            }
            if (this.control.right) {
                this.angle -= 0.03 * flip;
            }
        }

        // Limit the speed
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        // Apply friction
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        // Stop the car if speed is very low
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        // Update position based on speed and angle
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    // Method to draw the car on the canvas
    draw(p) {
        if (this.damaged) {
            // Draw damaged car in grey color
            p.fill(128, 128, 128, this.alpha * 255); // Grey color with alpha
        } else {
            // Draw car with its assigned color
            p.fill(this.color[0], this.color[1], this.color[2], this.alpha * 255); // Custom color with alpha
        }

        // Set stroke and stroke weight
        p.stroke(0);
        p.strokeWeight(1);
        p.smooth();

        // Draw the car's polygon
        p.beginShape();
        for (let i = 0; i < this.polygon.length; i++) {
            p.vertex(this.polygon[i].x, this.polygon[i].y);
        }
        p.endShape(p.CLOSE);

        // Optionally draw the sensor
        if (this.sensor && this.alpha === 1) {
            this.sensor.draw(p);
        }
    }
}