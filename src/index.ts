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

var modelColumn = [
    new ModelColumnDescriptor('id', 'Cusomer Id', ModelDescriptorFieldType.Number),
    new ModelColumnDescriptor('name', 'Cusomer Name', ModelDescriptorFieldType.String),
];

export var gridOptions = new GridBuilder<ICustomerType>()
    .Columns(CustomerType, (columns: GridColumnFactory<ICustomerType>) => {
        columns.Bound((model: ICustomerType) => model.Id).Title('Customer Id');
        columns.Bound((model: ICustomerType) => model.Name).Title('Customer Name');
    })
    .DataSource((ds: DataSourceBuilder) => { ds
        .Schema((model: ModelDescriptorBuilder) => { model
            .AddField('id', ModelDescriptorFieldType.Number)
            .AddField('name', ModelDescriptorFieldType.String);
        })
        .Schema({
            id: ModelDescriptorFieldType.Number,
            name: ModelDescriptorFieldType.String
        })
        .Schema(modelColumn)
        .Schema(CustomerType)
        .Ajax()
        .Read((op: CrudOperationBuilder) => op.Action('myurl'));
    })
    .Height(400)
    .Scrollable((sc: GridScrollSettingsBuilder) => { sc
        .Enabled(true)
        .Height(200)
        .Virtual(true);
    });
