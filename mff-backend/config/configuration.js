const dotenv = require('dotenv');
const path = require('path');
const chalk = require('chalk');

// Load .env file
dotenv.config({
    path: path.join(process.cwd(), '.env')
});


module.exports = {
    APP_PORT: process.env.APP_PORT || 3030,
    APP_TERMINAL_COLOR_SCHEMA: {
        ERROR: chalk.hex('#fa0101'),
        INFORMATIVE: chalk.hex('#01affa'),
        SUCCESS: chalk.hex('#37fa01'),
        WARNING: chalk.hex('#fad101'),
        TIME: chalk.hex('#7901fa'),
        PATH: chalk.hex('#81d0fa')
    }
}