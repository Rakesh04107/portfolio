import { getIntersection, lerp } from './utility';

export default class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 150;
        this.raySpread = Math.PI / 2; // Fixed typo from 'raySpreed' to 'raySpread'
        this.rays = [];
        this.readings = [];
    }

    update(roadBorders, traffic) {
        this.updateSensors(); // Changed from '#updateSensors()' to 'updateSensors()'
        this.readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.getReading(this.rays[i], roadBorders, traffic) // Changed from '#getReading' to 'getReading'
            );
        }
    }

    getReading(ray, roadBorders, traffic) { // Changed from '#getReading' to 'getReading'
        let touches = [];
        for (let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(
                ray[0], ray[1],
                roadBorders[i][0], roadBorders[i][1]
            );
            if (touch) {
                touches.push(touch);
            }
        }
        for (let i = 0; i < traffic.length; i++) {
            const polygon = traffic[i].polygon;
            for (let j = 0; j < polygon.length; j++) {

                const touchCar = getIntersection(
                    ray[0], ray[1],
                    polygon[j], polygon[(j + 1) % polygon.length]
                );
                if (touchCar) {
                    touches.push(touchCar);
                }
            }
        }

        if (touches.length === 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset === minOffset);
        }
    }

    updateSensors() { // Changed from '#updateSensors' to 'updateSensors'
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
            ) + this.car.angle;
            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([start, end]);
        }
    }

    draw(p) {
        p.strokeWeight(2);
        for (let i = 0; i < this.rayCount; i++) {
            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }
            p.stroke('yellow');
            p.line(this.rays[i][0].x, this.rays[i][0].y, end.x, end.y);
            p.stroke('black');
            p.line(end.x, end.y, this.rays[i][1].x, this.rays[i][1].y);
        }
    }
}