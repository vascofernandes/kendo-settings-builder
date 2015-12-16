import { ModelDescriptorFieldType } from './ModelDescriptorFieldType';

export class ModelColumnDescriptor {
    constructor(
        public Field: string,
        public Title: String,
        public Type: ModelDescriptorFieldType
    ) {
    }
}