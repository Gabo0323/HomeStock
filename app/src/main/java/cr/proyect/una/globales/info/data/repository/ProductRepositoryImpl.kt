package cr.proyect.una.globales.info.data.repository

import cr.proyect.una.globales.info.data.local.dao.ProductDao
import cr.proyect.una.globales.info.data.mappers.toDomain
import cr.proyect.una.globales.info.data.mappers.toEntity
import cr.proyect.una.globales.info.domain.model.Product
import cr.proyect.una.globales.info.domain.repository.ProductRepository

class ProductRepositoryImpl(private val productDao: ProductDao) : ProductRepository {
    override suspend fun addProduct(product: Product) {
        productDao.insertProduct(product.toEntity())
    }

    override suspend fun getProducts(): List<Product> {
        return productDao.getProducts().map { it.toDomain() }
    }

    override suspend fun deleteProduct(productId: String) {
        productDao.deleteProduct(productId)
    }
}
