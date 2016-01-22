/// <reference path="../typings/tsd.d.ts" />

import { ITyped } from './Interfaces';
import { DataSourceBuilder } from './DataSourceBuilder';
import { ModelDescriptorFieldType } from './ModelDescriptorFieldType';
import { ModelColumnDescriptor } from './ModelColumnDescriptor';
import { GridBuilder } from './GridBuilder';
import { GridColumnFactory } from './GridColumnFactory';
import { ModelDescriptorBuilder } from './ModelDescriptorBuilder';
import { CrudOperationBuilder } from './CrudOperationBuilder';
import { GridScrollSettingsBuilder } from './GridScrollSettingsBuilder';

class ModelTypeExtractor {

    constructor(private model: ITyped) {

    }

    getType(property: string) {
        return this.model.Types[property];
    }
}

interface ICustomerType {
    Id: string;
    Name: string;
}

class CustomerType implements ITyped {
    Types = {
        [CustomerType.Id]: ModelDescriptorFieldType.Number,
        [CustomerType.Name]: ModelDescriptorFieldType.String,
    };

    static Id = 'id';
    static Name = 'name';
}

/*
var customerModelTypesExtractor = new ModelTypeExtractor(new CustomerType);

var idType = customerModelTypesExtractor.getType(CustomerType.Id)

var columns = [{
    field: CustomerType.Id,
    title: 'Customer Id'
}];
*/

export var gridOptions = new GridBuilder<ICustomerType>(CustomerType)
    .Columns(columns => {
        columns.Bound(model => model.Id).Title('Customer Id');
        columns.Bound(model => model.Name).Title('Customer Name');
    })
    .DataSource(ds => { ds
        .Ajax()
        .Read(op => op.Action('myurl'));
    })
    .Height(400)
    .Scrollable((sc: GridScrollSettingsBuilder) => { sc
        .Enabled(true)
        .Height(200)
        .Virtual(true);
    });
