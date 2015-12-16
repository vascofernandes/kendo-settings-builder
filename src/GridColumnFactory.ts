import { Grid } from './Grid';
import { Func } from './Interfaces';
import { GridBoundColumn } from './GridBoundColumn';
import { GridBoundColumnBuilder } from './GridBoundColumnBuilder';


export class GridColumnFactory<TModel> {
    private columnsContainer;

    constructor(private type: any, private container: Grid<TModel>) {
        this.columnsContainer = container;
    }

    Bound(expression: Func<TModel, string>) {

        let column = new GridBoundColumn<TModel>(this.type, this.container, expression);

        this.columnsContainer.columns.push(column);

        return new GridBoundColumnBuilder<TModel>(column);
    }
}