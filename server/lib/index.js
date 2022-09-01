"use strict";
require('./server')
    .main()
    .catch((e) => {
    console.error(`Error during boot ${e.message}\n${e.stack}`);
    process.exit(1);
});
