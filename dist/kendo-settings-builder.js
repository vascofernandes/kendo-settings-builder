/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/tsd.d.ts" />
	var ModelDescriptorFieldType_1 = __webpack_require__(1);
	var GridBuilder_1 = __webpack_require__(2);
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
	            _a[CustomerType.Id] = ModelDescriptorFieldType_1.ModelDescriptorFieldType.Number,
	            _a[CustomerType.Name] = ModelDescriptorFieldType_1.ModelDescriptorFieldType.String,
	            _a
	        );
	        var _a;
	    }
	    CustomerType.Id = 'id';
	    CustomerType.Name = 'name';
	    return CustomerType;
	})();
	/*
	var customerModelTypesExtractor = new ModelTypeExtractor(new CustomerType);
	
	var idType = customerModelTypesExtractor.getType(CustomerType.Id)
	
	var columns = [{
	    field: CustomerType.Id,
	    title: 'Customer Id'
	}];
	*/
	exports.gridOptions = new GridBuilder_1.GridBuilder(CustomerType)
	    .Columns(function (columns) {
	    columns.Bound(function (model) { return model.Id; }).Title('Customer Id');
	    columns.Bound(function (model) { return model.Name; }).Title('Customer Name');
	})
	    .DataSource(function (ds) {
	    ds
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function (ModelDescriptorFieldType) {
	    ModelDescriptorFieldType[ModelDescriptorFieldType["String"] = 0] = "String";
	    ModelDescriptorFieldType[ModelDescriptorFieldType["Number"] = 1] = "Number";
	})(exports.ModelDescriptorFieldType || (exports.ModelDescriptorFieldType = {}));
	var ModelDescriptorFieldType = exports.ModelDescriptorFieldType;
	exports.ModelFieldType = (_a = {},
	    _a[ModelDescriptorFieldType.String] = 'string',
	    _a[ModelDescriptorFieldType.Number] = 'number',
	    _a
	);
	var _a;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Grid_1 = __webpack_require__(3);
	var GridColumnFactory_1 = __webpack_require__(5);
	var DataSourceBuilder_1 = __webpack_require__(10);
	var DataSource_1 = __webpack_require__(14);
	var GridScrollSettingsBuilder_1 = __webpack_require__(19);
	var GridBuilder = (function () {
	    function GridBuilder(type) {
	        this.type = type;
	        this.component = new Grid_1.Grid();
	    }
	    GridBuilder.prototype.Columns = function (configurator) {
	        var factory = new GridColumnFactory_1.GridColumnFactory(this.type, this.component);
	        configurator(factory);
	        return this;
	    };
	    GridBuilder.prototype.Height = function (height) {
	        this.component.height = height;
	        return this;
	    };
	    GridBuilder.prototype.DataSource = function (configurator) {
	        var ds = new DataSource_1.DataSource;
	        configurator(new DataSourceBuilder_1.DataSourceBuilder(ds).Schema(this.type));
	        this.component.dataSource = new kendo.data.DataSource(ds);
	        return this;
	    };
	    GridBuilder.prototype.Scrollable = function (configurator) {
	        this.component.scrollable.enabled = true;
	        if (configurator && typeof configurator === 'function') {
	            configurator(new GridScrollSettingsBuilder_1.GridScrollSettingsBuilder(this.component.scrollable));
	        }
	        return this;
	    };
	    return GridBuilder;
	})();
	exports.GridBuilder = GridBuilder;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/tsd.d.ts" />
	var GridScrollableSettings_1 = __webpack_require__(4);
	var Grid = (function () {
	    function Grid() {
	        this.dataSource = new kendo.data.DataSource({});
	        this.height = 200;
	        this.selectable = 'row';
	        this.sortable = true;
	        this.scrollable = new GridScrollableSettings_1.GridScrollableSettings;
	        this.columns = [];
	    }
	    return Grid;
	})();
	exports.Grid = Grid;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var GridScrollableSettings = (function () {
	    function GridScrollableSettings() {
	    }
	    return GridScrollableSettings;
	})();
	exports.GridScrollableSettings = GridScrollableSettings;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var GridBoundColumn_1 = __webpack_require__(6);
	var GridBoundColumnBuilder_1 = __webpack_require__(8);
	var GridColumnFactory = (function () {
	    function GridColumnFactory(type, container) {
	        this.type = type;
	        this.container = container;
	        this.columnsContainer = container;
	    }
	    GridColumnFactory.prototype.Bound = function (expression) {
	        var column = new GridBoundColumn_1.GridBoundColumn(this.type, this.container, expression);
	        this.columnsContainer.columns.push(column);
	        return new GridBoundColumnBuilder_1.GridBoundColumnBuilder(column);
	    };
	    return GridColumnFactory;
	})();
	exports.GridColumnFactory = GridColumnFactory;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var GridColumnBase_1 = __webpack_require__(7);
	var GridBoundColumn = (function (_super) {
	    __extends(GridBoundColumn, _super);
	    function GridBoundColumn(type, grid, expression) {
	        _super.call(this);
	        this.type = type;
	        this.field = expression(type);
	    }
	    return GridBoundColumn;
	})(GridColumnBase_1.GridColumnBase);
	exports.GridBoundColumn = GridBoundColumn;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var GridColumnBase = (function () {
	    function GridColumnBase() {
	    }
	    return GridColumnBase;
	})();
	exports.GridColumnBase = GridColumnBase;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var GridColumnBuilderBase_1 = __webpack_require__(9);
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
	})(GridColumnBuilderBase_1.GridColumnBuilderBase);
	exports.GridBoundColumnBuilder = GridBoundColumnBuilder;


/***/ },
/* 9 */
/***/ function(module, exports) {

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
	exports.GridColumnBuilderBase = GridColumnBuilderBase;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/tsd.d.ts" />
	var AjaxDataSourceBuilder_1 = __webpack_require__(11);
	var ModelDescriptorBuilder_1 = __webpack_require__(13);
	var DataSourceBuilder = (function () {
	    function DataSourceBuilder(dataSource) {
	        this.dataSource = dataSource;
	    }
	    DataSourceBuilder.prototype.Ajax = function () {
	        return new AjaxDataSourceBuilder_1.AjaxDataSourceBuilder(this.dataSource);
	    };
	    DataSourceBuilder.prototype.Filter = function (fn) {
	        return this;
	    };
	    DataSourceBuilder.prototype.Schema = function (configurator) {
	        var builder = new ModelDescriptorBuilder_1.ModelDescriptorBuilder(this.dataSource.schema.model);
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
	exports.DataSourceBuilder = DataSourceBuilder;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/tsd.d.ts" />
	var CrudOperationBuilder_1 = __webpack_require__(12);
	var AjaxDataSourceBuilder = (function () {
	    function AjaxDataSourceBuilder(dataSource) {
	        this.dataSource = dataSource;
	    }
	    AjaxDataSourceBuilder.prototype.Read = function (configurator) {
	        configurator(new CrudOperationBuilder_1.CrudOperationBuilder(this.dataSource.transport.read));
	    };
	    return AjaxDataSourceBuilder;
	})();
	exports.AjaxDataSourceBuilder = AjaxDataSourceBuilder;


/***/ },
/* 12 */
/***/ function(module, exports) {

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
	exports.CrudOperationBuilder = CrudOperationBuilder;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var ModelDescriptorFieldType_1 = __webpack_require__(1);
	var ModelDescriptorBuilder = (function () {
	    function ModelDescriptorBuilder(modelDescriptor) {
	        this.modelDescriptor = modelDescriptor;
	        this.fieldType = ModelDescriptorFieldType_1.ModelFieldType;
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
	exports.ModelDescriptorBuilder = ModelDescriptorBuilder;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/tsd.d.ts" />
	var Transport_1 = __webpack_require__(15);
	var DataSourceSchema_1 = __webpack_require__(17);
	var DataSource = (function () {
	    function DataSource() {
	        this.type = 'aspnetmvc-ajax';
	        this.transport = new Transport_1.Transport;
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
	        this.schema = new DataSourceSchema_1.DataSourceSchema;
	    }
	    return DataSource;
	})();
	exports.DataSource = DataSource;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/tsd.d.ts" />
	var CrudOperation_1 = __webpack_require__(16);
	var Transport = (function () {
	    function Transport() {
	        this.read = new CrudOperation_1.CrudOperation;
	    }
	    return Transport;
	})();
	exports.Transport = Transport;


/***/ },
/* 16 */
/***/ function(module, exports) {

	var CrudOperation = (function () {
	    function CrudOperation() {
	    }
	    return CrudOperation;
	})();
	exports.CrudOperation = CrudOperation;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var ModelDescriptor_1 = __webpack_require__(18);
	var DataSourceSchema = (function () {
	    function DataSourceSchema() {
	        this.data = 'Data';
	        this.total = 'Total';
	        this.errors = 'Errors';
	        this.model = new ModelDescriptor_1.ModelDescriptor();
	    }
	    return DataSourceSchema;
	})();
	exports.DataSourceSchema = DataSourceSchema;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/// <reference path="../typings/tsd.d.ts" />
	var ModelDescriptor = (function () {
	    function ModelDescriptor() {
	        this.fields = {};
	    }
	    return ModelDescriptor;
	})();
	exports.ModelDescriptor = ModelDescriptor;


/***/ },
/* 19 */
/***/ function(module, exports) {

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
	exports.GridScrollSettingsBuilder = GridScrollSettingsBuilder;


/***/ }
/******/ ]);
//# sourceMappingURL=kendo-settings-builder.js.map