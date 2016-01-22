import { Grid } from './Grid';
import { Action } from './Interfaces';
import { GridColumnFactory } from './GridColumnFactory';
import { DataSourceBuilder } from './DataSourceBuilder';
import { DataSource } from './DataSource';
import { GridScrollSettingsBuilder } from './GridScrollSettingsBuilder';

export class GridBuilder<TModel> {
    private component;

    constructor(private type: any) {
        this.component = new Grid<TModel>();
    }

    Columns(configurator: Action<GridColumnFactory<TModel>>) {

        var factory = new GridColumnFactory<TModel>(this.type, this.component);

        configurator(factory);

        return this;
    }

    Height(height: number) {
        this.component.height = height;
        return this;
    }

    DataSource(configurator: Action<DataSourceBuilder>) {

        var ds = new DataSource;

        configurator(new DataSourceBuilder(ds).Schema(this.type));

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