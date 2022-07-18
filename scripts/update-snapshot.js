const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { exec } = require('child_process')

const src = path.resolve(__dirname, 'src')

function delSnapshot() {
  return new Promise((resolve) => {
    glob('**/__snapshots__/*.snap', (err, files) => {
      if (err) {
        throw err
      }
      files.forEach((file) => {
        fs.unlinkSync(file)
      })
      resolve(true)
    })
  })
}

async function updateSnapshot() {
  await delSnapshot()
  exec('npx yarn test:unit', (error, stdout, stderr) => {
    if (error !== null) {
      console.log(`exec error: ${error}`)
    }
    console.log(stdout)
    console.log(stderr)
  })
}

updateSnapshot()
