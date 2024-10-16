import { ProductType } from '../entities/product_type';
import ProductTypeModel from '../models/product_type.model';

export async function add(productTypeData: ProductType) {
    const productType = new ProductType();
    const { id, ...productTypeWithoutId } = productTypeData;
    Object.assign(productType, productTypeWithoutId);
    return ProductTypeModel.add(productType);
}

export async function removeProductType(id: number) {
    return ProductTypeModel.remove(id);
}

export async function update(id: number, productType: Partial<ProductType>) {
    return ProductTypeModel.update(id, productType);
}

export async function findAll() {
    return ProductTypeModel.findAll();
}

export default {
    add,
    removeProductType,
    update,
    findAll
}