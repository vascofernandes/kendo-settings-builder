/// <reference path="../typings/tsd.d.ts" />

import { GridColumnBase } from './GridColumnBase';
import { GridScrollableSettings } from './GridScrollableSettings';

export class Grid<TModel> {
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
