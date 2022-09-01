/* eslint @typescript-eslint/no-var-requires: "off" */
require('./server')
  .main()
  .catch((e: Error) => {
    // console.error(`Error during boot ${e.message}\n${e.stack}`)
    process.exit(1)
  })
