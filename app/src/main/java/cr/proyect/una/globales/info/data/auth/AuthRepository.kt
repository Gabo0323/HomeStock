package cr.proyect.una.globales.info.data.auth



sealed interface AuthResult {
    data object Ok : AuthResult
    data class Error(val message: String) : AuthResult
}

interface AuthRepository {
    suspend fun register(email: String, password: String): AuthResult
    suspend fun login(email: String, password: String): AuthResult
}