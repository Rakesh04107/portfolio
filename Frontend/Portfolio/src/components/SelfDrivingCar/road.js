// Road.js
export default class Road {
  constructor(x, roadWidth, laneCount = 3) {
    this.x = x;
    this.laneCount = laneCount;
    this.roadWidth = roadWidth;
    this.left = x - roadWidth / 2;
    this.right = x + roadWidth / 2;
    const infinity = 50000;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };

    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }

  getLaneCenter(laneIndex) {
    const laneWidth = this.roadWidth / this.laneCount;
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.laneCount - 1) * laneWidth
    );
  }

  draw(p) {
    // Use p5.js functions here
    p.stroke("white");
    p.strokeWeight(4);

    for (let i = 1; i <= this.laneCount - 1; i++) {
      const pos = p.lerp(this.left, this.right, i / this.laneCount);
      p.drawingContext.setLineDash([20, 20]);
      p.line(pos, this.top, pos, this.bottom);
    }

    p.drawingContext.setLineDash([]);
    this.borders.forEach((border) => {
      p.line(border[0].x, border[0].y, border[1].x, border[1].y);
    });
  }
}
