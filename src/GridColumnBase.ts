export class GridColumnBase {
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