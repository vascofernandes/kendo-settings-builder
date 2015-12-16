/// <reference path="../typings/tsd.d.ts" />

import { ModelDescriptor } from 'ModelDescriptor';
import { Func, Action } from 'Interfaces';
import { DataSource } from 'DataSource';

enum ModelDescriptorFieldType {
    String,
    Number
}

var ModelFieldType = {
    [ModelDescriptorFieldType.String]: 'string',
    [ModelDescriptorFieldType.Number]: 'number'
};



class ModelDescriptorBuilder {
    private fieldType = ModelFieldType;

    constructor(private modelDescriptor: ModelDescriptor) {
    }

    AddField(fieldName: string, type: ModelDescriptorFieldType) {
        this.SetField(fieldName, type);
        return this;
    }

    FromObject(model: Object) {
        Object.keys(model).forEach((field: any) => this.SetField(field, model[field]));
    }

    FromArray(model: ModelColumnDescriptor[]) {
        model.forEach((descriptor: ModelColumnDescriptor) => this.SetField(descriptor.Field, descriptor.Type));
    }

    FromTyped(entity: ITyped) {
        let instance: ITyped = new (<any>entity)(); // Need an instance to access the type information

        Object.keys(entity).forEach((key: string) => {
            let field = entity[key];
            let type = instance.Types[field];
            this.SetField(field, type);
        });
    }

    private SetField(field: string, type: ModelDescriptorFieldType) {
        this.modelDescriptor.fields[field] = { type: this.fieldType[type] };
    }
}







class GridScrollableSettings {
    enabled: boolean;
    height: string;
    virtual: boolean;
}

class GridScrollSettingsBuilder {
    constructor(private settings: GridScrollableSettings) {
    }

    Enabled(value: boolean) {
        this.settings.enabled = value;

        return this;
    }

    Height(height: number | string) {

        if (typeof height === 'number') {
            height = height.toString() + 'px';
        }

        this.settings.height = height.toString(); // make TS happy

        return this;
    }

    Virtual(value: boolean) {
        this.settings.virtual = value;
        return this;
    }

}

class KGrid<TModel> {
    dataSource = new kendo.data.DataSource({});
    height = 200;
    selectable = 'row';
    rowTemplate;
    retailTemplate;
    pageable;
    sortable = true;
    scrollable = new GridScrollableSettings;
    navigatable;
    filterable;
    columnMenu;
    editable;
    grouping;
    resizable;
    reorderable;
    dataBound;
    columns: GridColumnBase[] = [];
    toolbar;
    pdf;
    excel;
}

class GridColumnBase {
    field: string;
    title: string;
    width: string;
    format: string;
    groupable;
    sortable;
    filterable;
    aggregates;
    attributes;
    columns;
    command: string | any[];
    editor;
    template;
    footerTemplate: string;
    groupHeaderTemplate: string;
    groupFooterTemplate: string;
    hidden: boolean;
    includeInMenu: string;
    locked: boolean;
    lockable: boolean;
    encoded: boolean;
    headerHtmlAttributes: {};
    footerHtmlAttributes: {};
    visible: boolean;
    htmlAttributes: {};
}

class GridBoundColumn<TModel> extends GridColumnBase {
    public configObject;

    constructor(private type: any, grid: KGrid<TModel>, expression: Func<TModel, string>) {

        super();

        this.field = expression(type);
    }
}

class GridColumnBuilderBase<TModel> {
    constructor(public column: GridBoundColumn<TModel>) {
    }

    Title(text: string) {
        this.column.title = text;

        return this;
    }

    Width(width: number | string) {

        if (typeof width === 'number') {
            width = width.toString() + 'px';
        }

        this.column.width = width.toString();

        return this;
    }

    Visible(value: boolean) {
        this.column.visible = value;

        return this;
    }

    Locked(value?: boolean) {

        this.column.locked = value ? value : true;

        return this;
    }

    Hidden(value: boolean) {
        this.column.hidden = value;

        return this;
    }
}

class GridBoundColumnBuilder<TModel> extends GridColumnBuilderBase<TModel> {
    constructor(column: GridBoundColumn<TModel>) {
        super(column);
    }

    Format(value: string) {
        this.column.format = value;

        return this;
    }

    Sortable(value: boolean) {
        this.column.sortable = value;

        return this;
    }

    Groupable(value: boolean) {
        this.column.groupable = value;

        return this;
    }

    Filterable(value: boolean) {
        this.column.filterable = value;

        return this;
    }

    //Filterable(configurator: Action<any>) { // GridBoundColumnFilterableBuilder
    //    configurator(new GridBoundColumnFilterableBuilder(this.column.filterableSettings));
    //    return this;
    //}  

    Encoded(value: boolean) {
        this.column.encoded = value;

        return this;
    }

    Template(templateAction: Action<TModel>) {
        this.column.template = templateAction;

        return this;
    }

    //Template(inlineTemplate: Func<TModel, Object>) {
    //    this.column.inlineTemplate = inlineTemplate;
    //    return this;
    //}

}

class GridColumnFactory<TModel> {
    private columnsContainer;

    constructor(private type: any, private container: KGrid<TModel>) {
        this.columnsContainer = container;
    }

    Bound(expression: Func<TModel, string>) {

        let column = new GridBoundColumn<TModel>(this.type, this.container, expression);

        this.columnsContainer.columns.Add(column);

        return new GridBoundColumnBuilder<TModel>(column);
    }
}


class GridBuilder<TModel> {
    private component;

    constructor() {
        this.component = new KGrid<TModel>();
    }

    Columns(type: any, configurator: Action<GridColumnFactory<TModel>>) {

        var factory = new GridColumnFactory<TModel>(type, this.component);

        configurator(factory);

        return this;
    }

    Height(height: number) {
        this.component.height = height;
        return this;
    }

    DataSource(configurator: Action<DataSourceBuilder>) {

        var ds = new DataSource;

        configurator(new DataSourceBuilder(ds));

        this.component.dataSource = new kendo.data.DataSource(ds);

        return this;
    }

    Scrollable(configurator?: Action<GridScrollSettingsBuilder>) {

        this.component.scrollable.enabled = true;

        if (configurator && typeof configurator === 'function') {
            configurator(new GridScrollSettingsBuilder(this.component.scrollable));
        }

        return this;
    }
}

class CrudOperationBuilder {
    constructor(private operation: any) {
    }

    Action(url: any) {
        this.operation.url = url;
        return this;
    }

    Data(data: any) {
        this.operation.data = data;
        return this;
    }
}

class AjaxDataSourceBuilder {
    constructor(private dataSource: kendo.data.DataSourceOptions) {
    }

    Read(configurator: Action<CrudOperationBuilder>) {
        configurator(new CrudOperationBuilder(this.dataSource.transport.read));
    }
}

class DataSourceBuilder {

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


class ModelColumnDescriptor {
    constructor(
        public Field: string,
        public Title: String,
        public Type: ModelDescriptorFieldType
    ) {
    }
}

interface ITyped {
    Types: {};
}

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

var opts = new GridBuilder<ICustomerType>()
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
