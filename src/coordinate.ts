export class Coordinate {
  constructor(public x: number,
              public y: number) {
  }

  getDeg(x: number, y: number) {
    const width = x - this.x
    const height = y - this.y

    const deg = 180 / Math.PI * Math.atan2(height, width)
    return (deg + 360) % 360
  }

  getHypotenuse(x: number, y: number) {
    const start = Math.sqrt(this.x * this.x + this.y * this.y)
    const end = Math.sqrt(x * x + y * y)
    return start / end
  }
}
