import MyWorker from './worker?worker'

const worker = new MyWorker()
worker.onmessage = ev => {
  const pre = document.createElement('pre')
  pre.innerText = JSON.stringify(ev.data, null, 2)
  document.body.appendChild(pre)
}

document.querySelector('[data-run]')?.addEventListener(
  'click',
  () => worker.postMessage({}),
)

document.querySelector('[data-clear]')?.addEventListener(
  'click',
  () => document.querySelectorAll('pre').forEach(e => e.remove()),
)
