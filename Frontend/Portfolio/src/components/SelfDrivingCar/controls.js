export default class Control {
    constructor(carType) {
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;

        if (carType === 'traffic') {
            this.up = true;
        }
    }

    keyPressed(p) {
        if (p.keyCode === p.UP_ARROW) {
            this.up = true;
        }
        if (p.keyCode === p.DOWN_ARROW) {
            this.down = true;
        }
        if (p.keyCode === p.RIGHT_ARROW) {
            this.right = true;
        }
        if (p.keyCode === p.LEFT_ARROW) {
            this.left = true;
        }
    }

    keyReleased(p) {
        if (p.keyCode === p.UP_ARROW) {
            this.up = false;
        }
        if (p.keyCode === p.DOWN_ARROW) {
            this.down = false;
        }
        if (p.keyCode === p.RIGHT_ARROW) {
            this.right = false;
        }
        if (p.keyCode === p.LEFT_ARROW) {
            this.left = false;
        }
    }
}