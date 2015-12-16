export class CrudOperationBuilder {
    constructor(private operation: any) {
    }

    Action(url: any) {
        this.operation.url = url;
        return this;
    }

    Data(data: any) {
        this.operation.data = data;
        return this;
    }
}