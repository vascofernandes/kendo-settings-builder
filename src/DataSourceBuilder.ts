
/// <reference path="../typings/tsd.d.ts" />

import { Action, ITyped } from './Interfaces';
import { AjaxDataSourceBuilder } from './AjaxDataSourceBuilder';
import { ModelDescriptorBuilder } from './ModelDescriptorBuilder';
import { ModelColumnDescriptor } from './ModelColumnDescriptor';

export class DataSourceBuilder {

    constructor(private dataSource: kendo.data.DataSourceOptions) {
    }

    Ajax() {
        return new AjaxDataSourceBuilder(this.dataSource);
    }

    Filter(fn: any) {

        return this;
    }

    Schema(configurator: Action<ModelDescriptorBuilder> | Object | ModelColumnDescriptor[] | ITyped) {

        let builder = new ModelDescriptorBuilder(this.dataSource.schema.model);

        if (typeof configurator === 'function') {
            (<Action<ModelDescriptorBuilder>>configurator)(builder);
        } else if (typeof configurator === 'object') {
            builder.FromObject(configurator);
        } else if (typeof configurator === 'array') {
            builder.FromArray(<ModelColumnDescriptor[]>configurator);
        } else {
            builder.FromTyped(<ITyped>configurator);
        }

        return this;
    }
}
