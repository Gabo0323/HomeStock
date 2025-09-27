package cr.proyect.una.globales.info.di

import android.content.Context
import androidx.room.Room
import com.google.firebase.auth.FirebaseAuth
import cr.proyect.una.globales.info.data.local.AppDatabase
import cr.proyect.una.globales.info.data.local.dao.ProductDao
import cr.proyect.una.globales.info.data.local.dao.UserDao
import cr.proyect.una.globales.info.data.repository.AuthRepositoryImpl
import cr.proyect.una.globales.info.data.repository.ProductRepositoryImpl
import cr.proyect.una.globales.info.domain.repository.ProductRepository
import cr.proyect.una.globales.info.domain.repository.UserRepository
import cr.proyect.una.globales.info.domain.use_case.AddProductUseCase
import cr.proyect.una.globales.info.domain.use_case.DeleteProductUseCase
import cr.proyect.una.globales.info.domain.use_case.GetProductsUseCase
import cr.proyect.una.globales.info.domain.use_case.LoginUseCase
import cr.proyect.una.globales.info.domain.use_case.RegisterUseCase
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideAppDatabase(@ApplicationContext context: Context): AppDatabase {
        return Room.databaseBuilder(
            context,
            AppDatabase::class.java,
            "app_database"
        ).fallbackToDestructiveMigration().build()
    }

    @Provides
    @Singleton
    fun provideFirebaseAuth(): FirebaseAuth {
        return FirebaseAuth.getInstance()
    }

    @Provides
    @Singleton
    fun provideProductDao(appDatabase: AppDatabase): ProductDao {
        return appDatabase.productDao()
    }

    @Provides
    @Singleton
    fun provideUserDao(appDatabase: AppDatabase): UserDao {
        return appDatabase.userDao()
    }

    @Provides
    @Singleton
    fun provideProductRepository(productDao: ProductDao): ProductRepository {
        return ProductRepositoryImpl(productDao)
    }

    @Provides
    @Singleton
    fun provideUserRepository(firebaseAuth: FirebaseAuth, userDao: UserDao): UserRepository {
        return AuthRepositoryImpl(firebaseAuth, userDao)
    }

    @Provides
    @Singleton
    fun provideAddProductUseCase(productRepository: ProductRepository): AddProductUseCase {
        return AddProductUseCase(productRepository)
    }

    @Provides
    @Singleton
    fun provideGetProductsUseCase(productRepository: ProductRepository): GetProductsUseCase {
        return GetProductsUseCase(productRepository)
    }

    @Provides
    @Singleton
    fun provideDeleteProductUseCase(productRepository: ProductRepository): DeleteProductUseCase {
        return DeleteProductUseCase(productRepository)
    }

    @Provides
    @Singleton
    fun provideLoginUseCase(userRepository: UserRepository): LoginUseCase {
        return LoginUseCase(userRepository)
    }

    @Provides
    @Singleton
    fun provideRegisterUseCase(userRepository: UserRepository): RegisterUseCase {
        return RegisterUseCase(userRepository)
    }
}
