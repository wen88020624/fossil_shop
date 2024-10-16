import { ProductType } from "../entities/product_type";

export async function add(productType: ProductType) {
    return ProductType.save(productType);
}

export async function remove(id: number) {
    return ProductType.delete(id);
}

export async function update(id: number, productType: Partial<ProductType>) {
    return ProductType.update(id, productType);
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