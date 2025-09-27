package cr.proyect.una.globales.info.domain.use_case

import cr.proyect.una.globales.info.domain.model.Product
import cr.proyect.una.globales.info.domain.repository.ProductRepository

class GetProductsUseCase(private val productRepository: ProductRepository) {
    suspend operator fun invoke(): List<Product> {
        return productRepository.getProducts()
    }
}
