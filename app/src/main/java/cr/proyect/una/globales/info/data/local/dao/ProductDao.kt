package cr.proyect.una.globales.info.data.local.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import cr.proyect.una.globales.info.data.local.entity.ProductEntity

@Dao
interface ProductDao {
    @Insert
    suspend fun insertProduct(product: ProductEntity)

    @Query("SELECT * FROM products")
    suspend fun getProducts(): List<ProductEntity>

    @Query("DELETE FROM products WHERE id = :productId")
    suspend fun deleteProduct(productId: String)
}
