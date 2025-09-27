package cr.proyect.una.globales.info.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import cr.proyect.una.globales.info.data.local.dao.ProductDao
import cr.proyect.una.globales.info.data.local.dao.UserDao
import cr.proyect.una.globales.info.data.local.entity.ProductEntity
import cr.proyect.una.globales.info.data.local.entity.UserEntity

@Database(entities = [ProductEntity::class, UserEntity::class], version = 2)
abstract class AppDatabase : RoomDatabase() {
    abstract fun productDao(): ProductDao
    abstract fun userDao(): UserDao
}
