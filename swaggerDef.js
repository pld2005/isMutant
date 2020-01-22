const path = require('path');

module.exports = {
    openapi: '3.0.0',
    info: {
        // API informations (required)
        title: 'isMutant', // Title (required)
        version: '1.0.0', // Version (required)
        description: 'Test mercadolibre', // Description (optional)
    },
    servers: [
        { url: 'http://64.225.39.218:3000' }
    ],
    apis: [path.join(__dirname, './src/**/**/*.ts')]
};
