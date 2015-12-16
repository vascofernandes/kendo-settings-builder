
import { ITyped } from './Interfaces';
import { ModelDescriptor } from './ModelDescriptor';
import { ModelDescriptorFieldType, ModelFieldType } from './ModelDescriptorFieldType';
import { ModelColumnDescriptor } from './ModelColumnDescriptor';

export class ModelDescriptorBuilder {
    private fieldType = ModelFieldType;

    constructor(private modelDescriptor: ModelDescriptor) {
    }

    AddField(fieldName: string, type: ModelDescriptorFieldType) {
        this.SetField(fieldName, type);
        return this;
    }

    FromObject(model: Object) {
        Object.keys(model).forEach((field: any) => this.SetField(field, model[field]));
    }

    FromArray(model: ModelColumnDescriptor[]) {
        model.forEach((descriptor: ModelColumnDescriptor) => this.SetField(descriptor.Field, descriptor.Type));
    }

    FromTyped(entity: ITyped) {
        let instance: ITyped = new (<any>entity)(); // Need an instance to access the type information

        Object.keys(entity).forEach((key: string) => {
            let field = entity[key];
            let type = instance.Types[field];
            this.SetField(field, type);
        });
    }

    private SetField(field: string, type: ModelDescriptorFieldType) {
        this.modelDescriptor.fields[field] = { type: this.fieldType[type] };
    }
}