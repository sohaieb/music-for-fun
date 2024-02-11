const express = require('express');
const path = require('path');
const {APP_TERMINAL_COLOR_SCHEMA, APP_PORT} = require('./config/configuration');
const {loggerMiddleware} = require('./middlewares/logger.middleware');
const {notFoundMiddleware} = require('./middlewares/not-found.middleware');
const app = express();
const globalRouter = express.Router();

// Define global middle wares
app.use(loggerMiddleware);
app.use('/resources', express.static(path.join(process.cwd(), 'uploads')));
app.use(express.json());


// Custom routes




// Wrapping routes
app.use('/api', globalRouter);
app.use('*', notFoundMiddleware);




// Start the server
app.listen(APP_PORT, () => {
    console.log(APP_TERMINAL_COLOR_SCHEMA.INFORMATIVE(`Server started at: http://localhost:${APP_PORT}`));
});