import { GridColumnBuilderBase } from './GridColumnBuilderBase';
import { Action } from './Interfaces';
import { GridBoundColumn } from './GridBoundColumn';

export class GridBoundColumnBuilder<TModel> extends GridColumnBuilderBase<TModel> {
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
