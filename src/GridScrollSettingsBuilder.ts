import { GridScrollableSettings } from './GridScrollableSettings';

export class GridScrollSettingsBuilder {
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
