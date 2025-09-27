package cr.proyect.una.globales.info.domain.model

import java.util.Date

data class Product(
    val id: String,
    val name: String,
    val imageUrl: String?,
    val category: String,
    val quantity: Int,
    val acquisitionDate: Date,
    val price: Double,
    val brand: String,
    val store: String
)
