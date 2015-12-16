/// <reference path="../typings/tsd.d.ts" />

import { Transport } from 'Transport';
import { DataSourceSchema } from 'DataSourceSchema';

export class DataSource implements kendo.data.DataSourceOptions {
    type = 'aspnetmvc-ajax';
    transport = new Transport;
    pageSize = 100;
    page = 1;
    serverPaging = true;
    serverSorting = true;
    serverFiltering = true;
    serverGrouping = true;
    serverAggregates = true;
    autoSync = false;
    batch = false;
    data;
    offlineStorage;
    sort = [];
    filter = [];
    group = [];
    aggregate = [];
    requestStart;
    requestEnd;
    change;
    error;
    sync;
    schema = new DataSourceSchema;
}
