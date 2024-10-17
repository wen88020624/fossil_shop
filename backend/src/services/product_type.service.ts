import { ProductType } from '../entities/product_type';
import ProductTypeModel from '../models/product_type.model';

export async function add(productType: ProductType) {
    return ProductTypeModel.add(productType);
}

export async function removeProductType(id: number) {
    return ProductTypeModel.remove(id);
}

export async function update(productType: ProductType) {
    return ProductTypeModel.update(productType);
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