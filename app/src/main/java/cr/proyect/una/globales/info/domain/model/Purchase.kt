package cr.proyect.una.globales.info.domain.model

import java.util.Date

data class Purchase(
    val id: String,
    val productId: String,
    val quantity: Int,
    val purchaseDate: Date,
    val store: String
)
