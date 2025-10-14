package cr.proyect.una.globales.info.domain.model

data class Product(
    val id: String,
    val name: String,
    val category: String,
    val quantity: Int,
    val acquisitionDate: String,
    val price: Double,
    val brand: String,
    val purchaseLocation: String,
    val imageUrl: String
)
