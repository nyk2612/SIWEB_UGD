import { productsData } from "@/pages/service/data/products"
export function addProduct(data) {
    const product = productsData.push(data)
    if(product) {
        return true
    }
}