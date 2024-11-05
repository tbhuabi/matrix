export class Coordinate {
  constructor(public x: number,
              public y: number) {
  }

  getDeg(x: number, y: number) {
    const width = x - this.x
    const height = y - this.y

    const deg = 180 / Math.PI * Math.atan(height / width)

    if (width < 0) {
      return 180 + deg
    }
    if (height < 0) {
      return 360 + deg
    }
    return deg
  }

  getHypotenuse(x: number, y: number) {
    const start = Math.sqrt(this.x * this.x + this.y * this.y)
    const end = Math.sqrt(x * x + y * y)
    return start / end
  }
}
