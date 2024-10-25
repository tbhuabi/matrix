import { Matrix } from '@tanbo/matrix'

export interface Point {
  x: number
  y: number
}

export class Transform {
  matrix = new Matrix(1, 0, 0, 1, 0, 0)

  constructor(public x1: number,
              public y1: number,
              public x2: number,
              public y2: number) {
  }

  getCoordinate(index: 1 | 2 | 3 | 4): Point {
    const {x1, y1, x2, y2} = this
    if (index === 1) {
      return {
        x: this.matrix.scaleX * x1 + this.matrix.skewX * y1 + this.matrix.translateX,
        y: this.matrix.skewY * x1 + this.matrix.scaleY * y1 + this.matrix.translateY
      }
    }
    if (index === 2) {
      return {
        x: this.matrix.scaleX * x2 + this.matrix.skewX * y1 + this.matrix.translateX,
        y: this.matrix.skewY * x2 + this.matrix.scaleY * y1 + this.matrix.translateY,
      }
    }
    if (index === 3) {
      return {
        x: this.matrix.scaleX * x2 + this.matrix.skewX * y2 + this.matrix.translateX,
        y: this.matrix.skewY * x2 + this.matrix.scaleY * y2 + this.matrix.translateY
      }
    }
    if (index === 4) {
      return {
        x: this.matrix.scaleX * x1 + this.matrix.skewX * y2 + this.matrix.translateX,
        y: this.matrix.skewY * x1 + this.matrix.scaleY * y2 + this.matrix.translateY,
      }
    }
    throw new Error('')
  }

}
