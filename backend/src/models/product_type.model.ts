import { ProductType } from "../entities/product_type";

export async function add(productType: ProductType) {
    return ProductType.save(productType);
}

export async function remove(id: number) {
    return ProductType.delete(id);
}

export async function update(productTypeData: ProductType) {
    const productType = await ProductType.findOneBy({ id: productTypeData.id });
    if (!productType) {
        throw new Error('ProductType not found');
    }
    Object.assign(productType, productTypeData);
    return productType.save();
}

export async function findAll() {
    return ProductType.find();
}

export default {
    add,
    remove,
    update,
    findAll
}