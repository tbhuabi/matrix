import { Matrix, Transform } from '@tanbo/matrix'
import { createApp } from '@viewfly/platform-browser'


function App() {
  const transform = new Transform(1, 1, 3, 3)

  return () => {
    return (
      <div style={{
        width: '200px',
        height: '200px',
        position: 'relative',
        margin: '0 auto',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0.5,
          width: '100px',
          height: '100px',
          background: 'red',
          // transform: 'matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)',
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            position: 'absolute',
            left: '25px',
            top: '25px',
            border: '1px solid #000',
            boxSizing: 'border-box',
            // transform: 'matrix(1, 0, 0, 1, 0, 0)'
            transform: transform.matrix.rotate(45).multiply(new Matrix(1, 0, 0, 1, 20, 20)).toCSSString()
          }}>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0.5,
          width: '100px',
          height: '100px',
          background: 'green',
          transform: 'matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)',
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            position: 'absolute',
            left: '25px',
            top: '25px',
            border: '1px solid #000',
            boxSizing: 'border-box',
            transform: 'matrix(1, 0, 0, 1, 20, 20)'
          }}>
          </div>
        </div>
      </div>
    )
  }
}


createApp(<App/>).mount(document.body)

