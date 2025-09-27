package cr.proyect.una.globales.info.domain.repository

import cr.proyect.una.globales.info.domain.model.Product

interface ProductRepository {
    suspend fun addProduct(product: Product)
    suspend fun getProducts(): List<Product>
    suspend fun deleteProduct(productId: String)
}
