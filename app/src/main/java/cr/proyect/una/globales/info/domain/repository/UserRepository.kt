package cr.proyect.una.globales.info.domain.repository

import cr.proyect.una.globales.info.domain.model.User

interface UserRepository {
    suspend fun login(email: String, password: String): User?
    suspend fun register(user: User, password: String): User?
}
