package cr.proyect.una.globales.info.domain.model

data class ShoppingItem(
    val id: String,
    val productId: String,
    val quantity: Int,
    val isPurchased: Boolean
)
