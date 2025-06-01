import { Matrix } from './matrix'

export class Transform {
  constructor(public matrix = new Matrix()) {
  }

  rotate(deg: number) {
    const angle = deg * Math.PI / 180
    const matrix = new Matrix(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0, 0)
    this.matrix.multiply(matrix)
    return this
  }

  translate(x: number, y: number) {
    this.matrix.multiply(new Matrix(1, 0, 0, 1, x, y))
    return this
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
    this.matrix.multiply(new Matrix(1, Math.tan(angleY), Math.tan(angleX), 1, 0, 0))
    return this
  }

  skewX(n: number) {
    return this.skew(n, 0)
  }

  skewY(n: number) {
    return this.skew(0, n)
  }

  scaleX(n: number) {
    this.matrix.multiply(new Matrix(n))
    return this
  }

  scaleY(n: number) {
    this.matrix.multiply(new Matrix(1, 0, 0, n))
    return this
  }

  scale(n: number) {
    this.matrix.multiply(new Matrix(n, 0, 0, n))
    return this
  }

  toCSSString() {
    const matrix = this.matrix
    return `matrix(${matrix.scaleX}, ${matrix.skewY}, ${matrix.skewX}, ${matrix.scaleY}, ${matrix.translateX}, ${matrix.translateY})`
  }
}
