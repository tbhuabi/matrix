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

export interface Point {
  x: number
  y: number
}

export class Matrix {
  constructor(public scaleX = 1,
              public skewY = 0,
              public skewX = 0,
              public scaleY = 1,
              public translateX = 0,
              public translateY = 0) {
  }

  plus(matrix: Matrix): Matrix {
    const addend = matrix.toArray()
    const [a, b, c, d, e, f] = this.toArray().map((item, index) => {
      return item + addend[index]
    })

    return this.update(a, b, c, d, e, f)
  }

  minus(matrix: Matrix): Matrix {
    const minuend = matrix.toArray()
    const [a, b, c, d, e, f] = this.toArray().map((item, index) => {
      return item - minuend[index]
    })

    return this.update(a, b, c, d, e, f)
  }

  divide(matrix: Matrix): Matrix {
    const divisor = matrix.toMatrixArray()
    const dividend = this.toMatrixArray()

    // Calculate the inverse of the divisor matrix
    const det = divisor[0][0] * (divisor[1][1] * divisor[2][2] - divisor[1][2] * divisor[2][1]) -
      divisor[0][1] * (divisor[1][0] * divisor[2][2] - divisor[1][2] * divisor[2][0]) +
      divisor[0][2] * (divisor[1][0] * divisor[2][1] - divisor[1][1] * divisor[2][0])

    if (det === 0) {
      throw new Error('Matrix division by a matrix with determinant 0 is undefined.')
    }

    const invDet = 1 / det

    const inverse = [
      [
        invDet * (divisor[1][1] * divisor[2][2] - divisor[1][2] * divisor[2][1]),
        invDet * (divisor[0][2] * divisor[2][1] - divisor[0][1] * divisor[2][2]),
        invDet * (divisor[0][1] * divisor[1][2] - divisor[0][2] * divisor[1][1])
      ],
      [
        invDet * (divisor[1][2] * divisor[2][0] - divisor[1][0] * divisor[2][2]),
        invDet * (divisor[0][0] * divisor[2][2] - divisor[0][2] * divisor[2][0]),
        invDet * (divisor[0][2] * divisor[1][0] - divisor[0][0] * divisor[1][2])
      ],
      [
        invDet * (divisor[1][0] * divisor[2][1] - divisor[1][1] * divisor[2][0]),
        invDet * (divisor[0][1] * divisor[2][0] - divisor[0][0] * divisor[2][1]),
        invDet * (divisor[0][0] * divisor[1][1] - divisor[0][1] * divisor[1][0])
      ]
    ]

    // Perform matrix multiplication: dividend * inverse
    const result = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          result[i][j] += dividend[i][k] * inverse[k][j]
        }
      }
    }

    const [scaleX, skewX, translateX, skewY, scaleY, translateY] = result.flat()
    return this.update(scaleX, skewY, skewX, scaleY, translateX, translateY)
  }

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
    return this.update(scaleX, skewY, skewX, scaleY, translateX, translateY)
  }

  getCoordinate(x: number, y: number): Point {
    return {
      x: this.scaleX * x + this.skewX * y + this.translateX,
      y: this.skewY * x + this.scaleY * y + this.translateY
    }
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

  private update(scaleX: number,
                 skewY: number,
                 skewX: number,
                 scaleY: number,
                 translateX: number,
                 translateY: number) {
    this.scaleX = scaleX
    this.skewY = skewY
    this.skewX = skewX
    this.scaleX = scaleX
    this.scaleY = scaleY
    this.translateX = translateX
    this.translateY = translateY
    return this
  }
}
