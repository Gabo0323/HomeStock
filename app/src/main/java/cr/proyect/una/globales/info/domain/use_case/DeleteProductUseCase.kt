package cr.proyect.una.globales.info.domain.use_case

import cr.proyect.una.globales.info.domain.repository.ProductRepository

class DeleteProductUseCase(private val productRepository: ProductRepository) {
    suspend operator fun invoke(productId: String) {
        productRepository.deleteProduct(productId)
    }
}
