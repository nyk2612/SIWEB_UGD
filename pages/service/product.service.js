import { productsData } from "@/pages/service/data/products"
export function addProduct(data) {
    const product = productsData.push(data)
    if(product) {
        return true
    }
}

export function deleteProduct(id) {
    const product = productsData.findIndex((product) => product.id === id);
    if (product !== -1) {
        productsData.splice(product, 1);
    }
    return true
}