import { GridBoundColumn } from './GridBoundColumn';

export class GridColumnBuilderBase<TModel> {
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
