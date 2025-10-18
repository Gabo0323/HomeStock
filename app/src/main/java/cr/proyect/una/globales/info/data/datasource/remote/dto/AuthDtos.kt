package cr.proyect.una.globales.info.data.datasource.remote.dto


data class RegisterRequestDto(val email: String, val password: String)
data class LoginRequestDto(val email: String, val password: String)
data class AuthResponseDto(val token: String)