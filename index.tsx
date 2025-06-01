import { Coordinate, Matrix, Transform } from '@tanbo/matrix'
import { createApp } from '@viewfly/platform-browser'
import { createRef, createSignal, onMounted } from '@viewfly/core'
import { fromEvent } from '@tanbo/stream'

import './index.scss'

function App() {

  const containerRef = createRef<HTMLElement>()
  const targetRef = createRef<HTMLElement>()
  const start = new Transform()
  const transform = createSignal(start)
  const styles = {
    left: 50,
    top: 50,
    width: 100,
    height: 100,
  }

  function getTranslate(x: number, y: number) {
    const point = transform().matrix.getCoordinate(x, y)
    return `${point.x}px, ${point.y}px`
  }

  const deg = createSignal(0)

  const boxRef = createRef<HTMLElement>()

  onMounted(() => {
    const el = targetRef.current!

    fromEvent<MouseEvent>(el, 'mousedown').subscribe(ev => {
      const centerPoint = {
        x: styles.left + styles.width / 2,
        y: styles.top + styles.height / 2,
      }
      const point = transform().matrix.getCoordinate(-styles.width / 2, styles.height / 2)
      const startCoordinate = new Coordinate(centerPoint.x, centerPoint.y)

      const defaultDeg = startCoordinate.getDeg(point.x + centerPoint.x, point.y + centerPoint.y)
      const rect = boxRef.current!.getBoundingClientRect()
      const startDeg = startCoordinate.getDeg(ev.x - rect.x, ev.y - rect.y)

      // deg.set(startCoordinate.getDeg(ev.x - rect.x, ev.y - rect.y))
      const moveEvent = fromEvent<MouseEvent>(document, 'mousemove').subscribe(ev => {
        const endDeg = startCoordinate.getDeg(ev.x - rect.x, ev.y - rect.y)

        const result = endDeg - startDeg + defaultDeg - 135
        deg.set(result)
        transform.set(start.rotate(result))
      })

      const upEvent = fromEvent<MouseEvent>(document, 'mouseup').subscribe(() => {
        moveEvent.unsubscribe()
        upEvent.unsubscribe()
      })
    })
  })

  return () => {
    return (
      <div class="container" ref={boxRef}>
        <div class="box" style={{
          background: 'green'
        }}>
          <div ref={containerRef} class="obj" style={{
            left: styles.left + 'px',
            top: styles.top + 'px',
            width: styles.width + 'px',
            height: styles.height + 'px',
            transform: transform().toCSSString(),
          }}>
          </div>
        </div>
        <div class="handlers" style={{
          left: styles.left + 'px',
          top: styles.top + 'px',
          width: styles.width + 'px',
          height: styles.height + 'px',
        }}>
          <div style={{
            transform: `translate(${getTranslate(-styles.width / 2, -styles.height / 2)})`
          }}>1
          </div>
          <div style={{
            transform: `translate(${getTranslate(styles.width / 2, -styles.height / 2)})`
          }}>2
          </div>
          <div style={{
            transform: `translate(${getTranslate(styles.width / 2, styles.height / 2)})`
          }}>3
          </div>
          <div style={{
            transform: `translate(${getTranslate(-styles.width / 2, styles.height / 2)})`
          }}>4
          </div>
          <button style={{
            transform: `translate(${getTranslate(-(styles.width + 100) / 2, (styles.height + 100) / 2)})`
          }} ref={targetRef}>旋转
          </button>
        </div>
        <div>{deg()}</div>

      </div>
    )
  }
}


createApp(<App/>).mount(document.body)

