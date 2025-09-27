package cr.proyect.una.globales.info.data.repository

import com.google.firebase.auth.FirebaseAuth
import cr.proyect.una.globales.info.data.local.dao.UserDao
import cr.proyect.una.globales.info.data.mappers.toDomainModel
import cr.proyect.una.globales.info.data.mappers.toEntity
import cr.proyect.una.globales.info.domain.model.User
import cr.proyect.una.globales.info.domain.repository.UserRepository
import kotlinx.coroutines.tasks.await
import javax.inject.Inject

class AuthRepositoryImpl @Inject constructor(
    private val firebaseAuth: FirebaseAuth,
    private val userDao: UserDao
) : UserRepository {
    override suspend fun login(email: String, password: String): User? {
        val authResult = firebaseAuth.signInWithEmailAndPassword(email, password).await()
        val firebaseUser = authResult.user
        return firebaseUser?.let { userDao.getUserByEmail(it.email!!)?.toDomainModel() }
    }

    override suspend fun register(user: User, password: String): User? {
        val authResult = firebaseAuth.createUserWithEmailAndPassword(user.email, password).await()
        val firebaseUser = authResult.user
        return firebaseUser?.let {
            val newUser = user.copy(id = it.uid)
            userDao.insert(newUser.toEntity())
            newUser
        }
    }
}
