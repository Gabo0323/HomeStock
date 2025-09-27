package cr.proyect.una.globales.info.domain.use_case

import cr.proyect.una.globales.info.domain.model.Product
import cr.proyect.una.globales.info.domain.repository.ProductRepository

class AddProductUseCase(private val productRepository: ProductRepository) {
    suspend operator fun invoke(product: Product) {
        productRepository.addProduct(product)
    }
}
