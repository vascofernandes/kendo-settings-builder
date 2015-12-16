/// <reference path="../typings/tsd.d.ts" />

import { Action } from './Interfaces';
import { CrudOperationBuilder } from './CrudOperationBuilder';

export class AjaxDataSourceBuilder {
    constructor(private dataSource: kendo.data.DataSourceOptions) {
    }

    Read(configurator: Action<CrudOperationBuilder>) {
        configurator(new CrudOperationBuilder(this.dataSource.transport.read));
    }
}