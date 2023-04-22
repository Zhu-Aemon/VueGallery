const { contextBridge, ipcRenderer, shell } = require('electron')
//
// contextBridge.exposeInMainWorld('electron', {
//   invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
// });

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
