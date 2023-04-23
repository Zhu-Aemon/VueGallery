const { app, BrowserWindow, protocol } = require('electron')
const path = require('path')
const os = require('os')
const { exec } = require('child_process')
const { spawn } = require('child_process');

const NODE_ENV = process.env.NODE_ENV

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

let width, height

if (os.platform() === 'darwin') {
  width = 1440
  height = 810
} else {
  width = 1440
  height = 910
}

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  mainWindow.setMenuBarVisibility(false)

  // 加载 index.html
  mainWindow.loadURL(
    NODE_ENV === 'development'
      ? 'http://localhost:5173'
      :`file://${path.join(__dirname, '../dist/index.html')}`
  );

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}

// Get the absolute path of app.js
const isPackaged = process.mainModule.filename.includes('app.asar');
const apiPath = isPackaged
  ? path.join(process.resourcesPath, 'netease-cloud-music-api', 'app.js')
  : path.join(__dirname, '..', 'netease-cloud-music-api', 'app.js');

console.log(apiPath);

// Run the command using the absolute path of app.js
const apiProcess = exec(`node ${apiPath}`);

apiProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

apiProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

apiProcess.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
