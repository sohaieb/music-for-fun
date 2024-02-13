const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const jsonTemplate = require('./lib/json_template');

// Paths
const dataPath = path.join(process.cwd(), 'data');
const jsonDataPath = path.join(dataPath, 'data.json');


// Setup data
(async () => {
    let alreadyInit = true;
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath, {recursive: true});
        alreadyInit = false;
    }

    if (!fs.existsSync(jsonDataPath)) {
        await fs.promises.writeFile(jsonDataPath, JSON.stringify(jsonTemplate));
        alreadyInit = false;
    }

    if (alreadyInit) {
        console.log(chalk.hex('#da8e03')('Project data are already initialized.'))
        console.log(chalk.hex('#abda03')('Please check: ./data/data.json'))
        return
    }
    console.log(chalk.greenBright('Project data are initialized'));
    console.log(`${chalk.greenBright('./data/data.json')} ${chalk.green(' created.')}`)
})();
