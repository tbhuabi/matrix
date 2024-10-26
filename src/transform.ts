import { Matrix } from './matrix'

export class Transform {
  constructor(public matrix = new Matrix()) {
  }

  rotate(deg: number): Transform {
    const angle = deg * Math.PI / 180
    const matrix = new Matrix(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0, 0)
    return new Transform(this.matrix.multiply(matrix))
  }

  translate(x: number, y: number): Transform {
    return new Transform(this.matrix.multiply(new Matrix(1, 0, 0, 1, x, y)))
  }

  translateX(n: number) {
    return this.translate(n, 0)
  }

  translateY(n: number) {
    return this.translate(0, n)
  }

  skew(degX: number, degY: number) {
    const angleX = degX * Math.PI / 180
    const angleY = degY * Math.PI / 180
    return new Transform(this.matrix.multiply(new Matrix(1, Math.tan(angleY), Math.tan(angleX), 1, 0, 0)))
  }

  skewX(n: number) {
    return this.skew(n, 0)
  }

  skewY(n: number) {
    return this.skew(0, n)
  }

  toCSSString() {
    const matrix = this.matrix
    return `matrix(${matrix.scaleX}, ${matrix.skewY}, ${matrix.skewX}, ${matrix.scaleY}, ${matrix.translateX}, ${matrix.translateY})`
  }
}
