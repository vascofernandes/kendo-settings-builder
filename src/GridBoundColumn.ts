
import { Func } from './Interfaces';
import { GridColumnBase } from './GridColumnBase';
import { Grid } from './Grid';

export class GridBoundColumn<TModel> extends GridColumnBase {
    public configObject;

    constructor(private type: any, grid: Grid<TModel>, expression: Func<TModel, string>) {

        super();

        this.field = expression(type);
    }
}

