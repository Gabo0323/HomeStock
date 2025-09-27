package cr.proyect.una.globales.info.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "products")
data class ProductEntity(
    @PrimaryKey val id: String,
    val name: String,
    val category: String,
    val quantity: Int,
    val acquisitionDate: String,
    val price: Double,
    val brand: String,
    val purchaseLocation: String,
    val imageUrl: String
)
