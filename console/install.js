'use strict';

// set NODE_ENV=development
// node console/install

const Application = require('../Application');
const Console = require('evado/console/Console');
const params = Console.parseProcessArguments();
const instance = new Console({Application, params});

(async () => {
    await instance.installApp(async () => {
        await instance.clearAll();
        await instance.deployAssets(params);
        await instance.createUsers();
        await instance.createSecurity();
        await instance.createTasks();
        await instance.createNotices();
        await instance.createEventHandlers();
        await instance.createListeners();
        await instance.importData({oneByOne: false});
        await instance.importStudioData();
        await instance.createIndexes();
    });
    process.exit();
})();