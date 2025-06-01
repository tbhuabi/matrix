import { Transform } from './transform'
import { Point } from './matrix'

export class Rectangle {
  private transform = new Transform()

  private readonly centerX: number
  private readonly centerY: number

  constructor(public x: number,
              public y: number,
              public width: number,
              public height: number) {
    this.centerX = this.x + width / 2
    this.centerY = this.y + height / 2
  }

  getRect() {
    const points: Point[] = [
      this.getCoordinate(0),
      this.getCoordinate(2),
      this.getCoordinate(4),
      this.getCoordinate(6),
    ]

    const x = Math.min(...points.map(i => i.x))
    const y = Math.min(...points.map(i => i.y))
    const maxX = Math.max(...points.map(i => i.x))
    const maxY = Math.max(...points.map(i => i.y))
    return {
      x,
      y,
      right: maxX,
      bottom: maxY,
      width: maxX - x,
      height: maxY - y,
    }
  }

  getCoordinate(pointIndex: number): Point {
    pointIndex %= 8
    let point: Point
    switch (pointIndex) {
      case 0:
        point = this.transform.matrix.getCoordinate(-this.width / 2, -this.height / 2)
        break
      case 1:
        point = this.transform.matrix.getCoordinate(0, -this.height / 2)
        break
      case 2:
        point = this.transform.matrix.getCoordinate(this.width / 2, -this.height / 2)
        break
      case 3:
        point = this.transform.matrix.getCoordinate(this.width / 2, 0)
        break
      case 4:
        point = this.transform.matrix.getCoordinate(this.width / 2, this.height / 2)
        break
      case 5:
        point = this.transform.matrix.getCoordinate(0, this.height / 2)
        break
      case 6:
        point = this.transform.matrix.getCoordinate(-this.width / 2, this.height / 2)
        break
      default:
        point = this.transform.matrix.getCoordinate(-this.width / 2, 0)
    }

    return {
      x: this.centerX + point.x,
      y: this.centerY + point.y,
    }
  }

  rotate(deg: number) {
    this.transform.rotate(deg)
    return this
  }

  translate(x: number, y: number) {
    this.transform.translate(x, y)
    return this
  }

  translateX(n: number) {
    this.transform.translateX(n)
    return this
  }

  translateY(n: number) {
    this.transform.translateY(n)
    return this
  }

  skew(degX: number, degY: number) {
    this.transform.skew(degX, degY)
    return this
  }

  skewX(n: number) {
    this.transform.skewX(n)
    return this
  }

  skewY(n: number) {
    this.transform.skewY(n)
    return this
  }

  scaleX(n: number) {
    this.transform.scaleX(n)
    return this
  }

  scaleY(n: number) {
    this.transform.scaleY(n)
    return this
  }

  scale(n: number) {
    this.transform.scale(n)
    return this
  }

  getCSSString() {
    return this.transform.toCSSString()
  }
}
