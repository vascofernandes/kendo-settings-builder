
// Mock kendo.data.DataSource

kendo = {
    data: {
        DataSource: function (config) {
            return config;
        }
    }
};

Index = require('./src/index.js');


console.log(Index.gridOptions);

console.log(Index.gridOptions.component.columns);
