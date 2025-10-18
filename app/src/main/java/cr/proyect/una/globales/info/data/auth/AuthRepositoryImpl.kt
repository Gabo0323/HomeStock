package cr.proyect.una.globales.info.data.auth



import cr.proyect.una.globales.info.core.network.AuthTokenProvider
import cr.proyect.una.globales.info.core.network.NetworkModule
import cr.proyect.una.globales.info.data.datasource.remote.api.AuthApi
import cr.proyect.una.globales.info.data.datasource.remote.dto.LoginRequestDto
import cr.proyect.una.globales.info.data.datasource.remote.dto.RegisterRequestDto
import retrofit2.HttpException

class AuthRepositoryImpl(
    private val tokenStore: TokenStore,
    private val tokenProvider: AuthTokenProvider
) : AuthRepository {

    private val api: AuthApi by lazy {
        val client = NetworkModule.client() // sin auth para login/register
        NetworkModule.retrofit(client).create(AuthApi::class.java)
    }

    override suspend fun register(email: String, password: String): AuthResult {
        return try {
            api.register(RegisterRequestDto(email, password))
            AuthResult.Ok
        } catch (e: HttpException) {
            when (e.code()) {
                409 -> AuthResult.Error("El correo ya está registrado")
                400 -> AuthResult.Error("Datos inválidos")
                else -> AuthResult.Error("Error ${e.code()}")
            }
        } catch (_: Exception) {
            AuthResult.Error("Fallo de red")
        }
    }

    override suspend fun login(email: String, password: String): AuthResult {
        return try {
            val res = api.login(LoginRequestDto(email, password))
            tokenStore.save(res.token)
            tokenProvider.set(res.token)
            AuthResult.Ok
        } catch (e: HttpException) {
            when (e.code()) {
                401 -> AuthResult.Error("Credenciales inválidas")
                else -> AuthResult.Error("Error ${e.code()}")
            }
        } catch (_: Exception) {
            AuthResult.Error("Fallo de red")
        }
    }
}