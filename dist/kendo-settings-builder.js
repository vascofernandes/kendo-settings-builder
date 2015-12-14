/// <reference path="../typings/tsd.d.ts" />
/// <reference path="interfaces.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ksb;
(function (ksb) {
    var ModelDescriptorFieldType;
    (function (ModelDescriptorFieldType) {
        ModelDescriptorFieldType[ModelDescriptorFieldType["String"] = 0] = "String";
        ModelDescriptorFieldType[ModelDescriptorFieldType["Number"] = 1] = "Number";
    })(ModelDescriptorFieldType || (ModelDescriptorFieldType = {}));
    var ModelFieldType = (_a = {},
        _a[ModelDescriptorFieldType.String] = 'string',
        _a[ModelDescriptorFieldType.Number] = 'number',
        _a
    );
    var ModelDescriptor = (function () {
        function ModelDescriptor() {
        }
        return ModelDescriptor;
    })();
    var ModelDescriptorBuilder = (function () {
        function ModelDescriptorBuilder(modelDescriptor) {
            this.modelDescriptor = modelDescriptor;
            this.fieldType = ModelFieldType;
        }
        ModelDescriptorBuilder.prototype.AddField = function (fieldName, type) {
            this.SetField(fieldName, type);
            return this;
        };
        ModelDescriptorBuilder.prototype.FromObject = function (model) {
            var _this = this;
            Object.keys(model).forEach(function (field) { return _this.SetField(field, model[field]); });
        };
        ModelDescriptorBuilder.prototype.FromArray = function (model) {
            var _this = this;
            model.forEach(function (descriptor) { return _this.SetField(descriptor.Field, descriptor.Type); });
        };
        ModelDescriptorBuilder.prototype.FromTyped = function (entity) {
            var _this = this;
            var instance = new entity(); // Need an instance to access the type information
            Object.keys(entity).forEach(function (key) {
                var field = entity[key];
                var type = instance.Types[field];
                _this.SetField(field, type);
            });
        };
        ModelDescriptorBuilder.prototype.SetField = function (field, type) {
            this.modelDescriptor.fields[field] = { type: this.fieldType[type] };
        };
        return ModelDescriptorBuilder;
    })();
    var DataSourceSchema = (function () {
        function DataSourceSchema() {
            this.data = 'Data';
            this.total = 'Total';
            this.errors = 'Errors';
            this.model = new ModelDescriptor();
        }
        return DataSourceSchema;
    })();
    var CrudOperation = (function () {
        function CrudOperation() {
        }
        return CrudOperation;
    })();
    var Transport = (function () {
        function Transport() {
            this.read = new CrudOperation;
        }
        return Transport;
    })();
    var DataSource = (function () {
        function DataSource() {
            this.type = 'aspnetmvc-ajax';
            this.transport = new Transport;
            this.pageSize = 100;
            this.page = 1;
            this.serverPaging = true;
            this.serverSorting = true;
            this.serverFiltering = true;
            this.serverGrouping = true;
            this.serverAggregates = true;
            this.autoSync = false;
            this.batch = false;
            this.sort = [];
            this.filter = [];
            this.group = [];
            this.aggregate = [];
            this.change = function () { };
            this.error = function () { };
            this.sync = function () { };
            this.schema = new DataSourceSchema;
        }
        return DataSource;
    })();
    var GridScrollableSettings = (function () {
        function GridScrollableSettings() {
        }
        return GridScrollableSettings;
    })();
    var GridScrollSettingsBuilder = (function () {
        function GridScrollSettingsBuilder(settings) {
            this.settings = settings;
        }
        GridScrollSettingsBuilder.prototype.Enabled = function (value) {
            this.settings.enabled = value;
            return this;
        };
        GridScrollSettingsBuilder.prototype.Height = function (height) {
            if (typeof height === 'number') {
                height = height.toString() + 'px';
            }
            this.settings.height = height.toString(); // make TS happy
            return this;
        };
        GridScrollSettingsBuilder.prototype.Virtual = function (value) {
            this.settings.virtual = value;
            return this;
        };
        return GridScrollSettingsBuilder;
    })();
    var KGrid = (function () {
        function KGrid() {
            this.dataSource = new kendo.data.DataSource({});
            this.height = 200;
            this.selectable = 'row';
            this.sortable = true;
            this.scrollable = new GridScrollableSettings;
            this.dataBound = function () { };
            this.columns = [];
        }
        return KGrid;
    })();
    var GridColumnBase = (function () {
        function GridColumnBase() {
        }
        return GridColumnBase;
    })();
    var GridBoundColumn = (function (_super) {
        __extends(GridBoundColumn, _super);
        function GridBoundColumn(type, grid, expression) {
            _super.call(this);
            this.type = type;
            this.field = expression(type);
        }
        return GridBoundColumn;
    })(GridColumnBase);
    var GridColumnBuilderBase = (function () {
        function GridColumnBuilderBase(column) {
            this.column = column;
        }
        GridColumnBuilderBase.prototype.Title = function (text) {
            this.column.title = text;
            return this;
        };
        GridColumnBuilderBase.prototype.Width = function (width) {
            if (typeof width === 'number') {
                width = width.toString() + 'px';
            }
            this.column.width = width.toString();
            return this;
        };
        GridColumnBuilderBase.prototype.Visible = function (value) {
            this.column.visible = value;
            return this;
        };
        GridColumnBuilderBase.prototype.Locked = function (value) {
            this.column.locked = value ? value : true;
            return this;
        };
        GridColumnBuilderBase.prototype.Hidden = function (value) {
            this.column.hidden = value;
            return this;
        };
        return GridColumnBuilderBase;
    })();
    var GridBoundColumnBuilder = (function (_super) {
        __extends(GridBoundColumnBuilder, _super);
        function GridBoundColumnBuilder(column) {
            _super.call(this, column);
        }
        GridBoundColumnBuilder.prototype.Format = function (value) {
            this.column.format = value;
            return this;
        };
        GridBoundColumnBuilder.prototype.Sortable = function (value) {
            this.column.sortable = value;
            return this;
        };
        GridBoundColumnBuilder.prototype.Groupable = function (value) {
            this.column.groupable = value;
            return this;
        };
        GridBoundColumnBuilder.prototype.Filterable = function (value) {
            this.column.filterable = value;
            return this;
        };
        //Filterable(configurator: Action<any>) { // GridBoundColumnFilterableBuilder
        //    configurator(new GridBoundColumnFilterableBuilder(this.column.filterableSettings));
        //    return this;
        //}  
        GridBoundColumnBuilder.prototype.Encoded = function (value) {
            this.column.encoded = value;
            return this;
        };
        GridBoundColumnBuilder.prototype.Template = function (templateAction) {
            this.column.template = templateAction;
            return this;
        };
        return GridBoundColumnBuilder;
    })(GridColumnBuilderBase);
    var GridColumnFactory = (function () {
        function GridColumnFactory(type, container) {
            this.type = type;
            this.container = container;
            this.columnsContainer = container;
        }
        GridColumnFactory.prototype.Bound = function (expression) {
            var column = new GridBoundColumn(this.type, this.container, expression);
            this.columnsContainer.columns.Add(column);
            return new GridBoundColumnBuilder(column);
        };
        return GridColumnFactory;
    })();
    var GridBuilder = (function () {
        function GridBuilder() {
            this.component = new KGrid();
        }
        GridBuilder.prototype.Columns = function (type, configurator) {
            var factory = new GridColumnFactory(type, this.component);
            configurator(factory);
            return this;
        };
        GridBuilder.prototype.Height = function (height) {
            this.component.height = height;
            return this;
        };
        GridBuilder.prototype.DataSource = function (configurator) {
            var ds = new DataSource;
            configurator(new DataSourceBuilder(ds));
            this.component.dataSource = new kendo.data.DataSource(ds);
            return this;
        };
        GridBuilder.prototype.Scrollable = function (configurator) {
            this.component.scrollable.enabled = true;
            if (configurator && typeof configurator === 'function') {
                configurator(new GridScrollSettingsBuilder(this.component.scrollable));
            }
            return this;
        };
        return GridBuilder;
    })();
    var CrudOperationBuilder = (function () {
        function CrudOperationBuilder(operation) {
            this.operation = operation;
        }
        CrudOperationBuilder.prototype.Action = function (url) {
            this.operation.url = url;
            return this;
        };
        CrudOperationBuilder.prototype.Data = function (data) {
            this.operation.data = data;
            return this;
        };
        return CrudOperationBuilder;
    })();
    var AjaxDataSourceBuilder = (function () {
        function AjaxDataSourceBuilder(dataSource) {
            this.dataSource = dataSource;
        }
        AjaxDataSourceBuilder.prototype.Read = function (configurator) {
            configurator(new CrudOperationBuilder(this.dataSource.transport.read));
        };
        return AjaxDataSourceBuilder;
    })();
    var DataSourceBuilder = (function () {
        function DataSourceBuilder(dataSource) {
            this.dataSource = dataSource;
        }
        DataSourceBuilder.prototype.Ajax = function () {
            return new AjaxDataSourceBuilder(this.dataSource);
        };
        DataSourceBuilder.prototype.Filter = function (fn) {
            return this;
        };
        DataSourceBuilder.prototype.Schema = function (configurator) {
            var builder = new ModelDescriptorBuilder(this.dataSource.schema.model);
            if (typeof configurator === 'function') {
                configurator(builder);
            }
            else if (typeof configurator === 'object') {
                builder.FromObject(configurator);
            }
            else if (typeof configurator === 'array') {
                builder.FromArray(configurator);
            }
            else {
                builder.FromTyped(configurator);
            }
            return this;
        };
        return DataSourceBuilder;
    })();
    var ModelColumnDescriptor = (function () {
        function ModelColumnDescriptor(Field, Title, Type) {
            this.Field = Field;
            this.Title = Title;
            this.Type = Type;
        }
        return ModelColumnDescriptor;
    })();
    var ModelTypeExtractor = (function () {
        function ModelTypeExtractor(model) {
            this.model = model;
        }
        ModelTypeExtractor.prototype.getType = function (property) {
            return this.model.Types[property];
        };
        return ModelTypeExtractor;
    })();
    var CustomerType = (function () {
        function CustomerType() {
            this.Types = (_a = {},
                _a[CustomerType.Id] = ModelDescriptorFieldType.Number,
                _a[CustomerType.Name] = ModelDescriptorFieldType.String,
                _a
            );
            var _a;
        }
        CustomerType.Id = 'id';
        CustomerType.Name = 'name';
        return CustomerType;
    })();
    var customerModelTypesExtractor = new ModelTypeExtractor(new CustomerType);
    var idType = customerModelTypesExtractor.getType(CustomerType.Id);
    var columns = [{
            field: CustomerType.Id,
            title: 'Customer Id'
        }];
    var modelColumn = [
        new ModelColumnDescriptor('id', 'Cusomer Id', ModelDescriptorFieldType.Number),
        new ModelColumnDescriptor('name', 'Cusomer Name', ModelDescriptorFieldType.String),
    ];
    var opts = new GridBuilder()
        .Columns(CustomerType, function (columns) {
        columns.Bound(function (model) { return model.Id; }).Title('Customer Id');
        columns.Bound(function (model) { return model.Name; }).Title('Customer Name');
    })
        .DataSource(function (ds) {
        ds
            .Schema(function (model) {
            model
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
            .Read(function (op) { return op.Action('myurl'); });
    })
        .Height(400)
        .Scrollable(function (sc) {
        sc
            .Enabled(true)
            .Height(200)
            .Virtual(true);
    });
    var _a;
})(ksb || (ksb = {}));
//# sourceMappingURL=kendo-settings-builder.js.map