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

export function getProductById(id){
    const product = productsData.find((product) => product.id === id);
    return product
}

export function updateProduct(id, data) {
    const productIndex = productsData.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
        productsData[productIndex] = { ...productsData[productIndex], ...data };
        return true;
    }
    return false;
}
