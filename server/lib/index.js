"use strict";
require('./server')
    .main()
    .catch((e) => {
    process.exit(1);
});
