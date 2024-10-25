export type MatrixArray = [
  [number, number, number],
  [number, number, number],
  [number, number, number]
]

export type MatrixSimpleArray = [
  number, number, number,
  number, number, number,
  number, number, number,
]

export class Matrix {
  constructor(public scaleX: number,
              public skewY: number,
              public skewX: number,
              public scaleY: number,
              public translateX: number,
              public translateY: number,) {
  }

  rotate(deg: number): Matrix {
    const angle = deg * Math.PI / 180
    const matrix = new Matrix(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0, 0)
    return this.multiply(matrix)
  }

  plus(matrix: Matrix): Matrix {
    const addend = matrix.toArray()
    const [a, b, c, d, e, f] = this.toArray().map((item, index) => {
      return item + addend[index]
    })

    return new Matrix(a, b, c, d, e, f)
  }

  minus(matrix: Matrix): Matrix {
    const minuend = matrix.toArray()
    const [a, b, c, d, e, f] = this.toArray().map((item, index) => {
      return item - minuend[index]
    })

    return new Matrix(a, b, c, d, e, f)
  }

  // divide(matrix: Matrix): Matrix {
  //
  // }


  multiply(matrix: Matrix): Matrix {
    const m1 = this.toMatrixArray()
    const m2 = matrix.toMatrixArray()
    const result = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          result[i][j] += m1[i][k] * m2[k][j]
        }
      }
    }
    const [scaleX, skewX, translateX, skewY, scaleY, translateY] = result.flat()
    return new Matrix(scaleX, skewY, skewX, scaleY, translateX, translateY)
  }

  toArray(): MatrixSimpleArray {
    return [
      this.scaleX, this.skewX, this.translateX,
      this.skewY, this.scaleY, this.translateY,
      0, 0, 1
    ]
  }

  toMatrixArray(): MatrixArray {
    return [
      [this.scaleX, this.skewX, this.translateX],
      [this.skewY, this.scaleY, this.translateY],
      [0, 0, 1]
    ]
  }

  toCSSString() {
    return `matrix(${this.scaleX}, ${this.skewY}, ${this.skewX}, ${this.scaleY}, ${this.translateX}, ${this.translateY})`
  }
}
