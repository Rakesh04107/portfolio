import Car from './Car';

export default class FreeCar {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.car = null;
        this.cameraX = 0;
        this.cameraY = 300; // Adjust the camera Y position to control the inclination
        this.cameraZ = (this.height / 2.0) / Math.tan(Math.PI / 6.0); // Adjust the field of view
    }

    freecar(p) {
        p.setup = () => {
            p.createCanvas(this.width, this.height, p.WEBGL);
            this.car = new Car(0, 0, 30, 50); // Position the car at the origin (0, 0)
        };

        p.draw = () => {
            p.background(212, 212, 212);

            // Set the camera view
            p.camera(this.cameraX, this.cameraY, this.cameraZ, 0, 0, 0, 0, 1, 0);

            // Adjust the canvas rotation
            this.car.update();
            this.car.draw(p);
        };

        p.keyPressed = () => {
            this.car.control.keyPressed(p);
        };

        p.keyReleased = () => {
            this.car.control.keyReleased(p);
        };
    }
}
