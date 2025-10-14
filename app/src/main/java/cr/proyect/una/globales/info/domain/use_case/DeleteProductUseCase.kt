package cr.proyect.una.globales.info.domain.use_case

import cr.proyect.una.globales.info.domain.repository.ProductRepository
import javax.inject.Inject

class DeleteProductUseCase @Inject constructor(
    private val productRepository: ProductRepository
) {
    suspend operator fun invoke(productId: String) {
        productRepository.deleteProduct(productId)
    }
}
