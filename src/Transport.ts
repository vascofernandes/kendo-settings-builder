/// <reference path="../typings/tsd.d.ts" />

import { CrudOperation } from 'CrudOperation';

export class Transport implements kendo.data.DataSourceTransport {
	read = new CrudOperation;
}
