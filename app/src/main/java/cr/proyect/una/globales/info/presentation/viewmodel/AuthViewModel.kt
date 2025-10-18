package cr.proyect.una.globales.info.presentation.viewmodel


import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import cr.proyect.una.globales.info.core.network.AuthTokenProvider
import cr.proyect.una.globales.info.data.auth.AuthRepository
import cr.proyect.una.globales.info.data.auth.AuthRepositoryImpl
import cr.proyect.una.globales.info.data.auth.AuthResult
import cr.proyect.una.globales.info.data.auth.TokenStore
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class AuthViewModel(app: Application) : AndroidViewModel(app) {
    private val tokenStore = TokenStore(app)
    private val tokenProvider = AuthTokenProvider()
    private val repo: AuthRepository = AuthRepositoryImpl(tokenStore, tokenProvider)

    private val _loading = MutableStateFlow(false)
    val loading = _loading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error = _error.asStateFlow()

    init {
        // Inicializa el token en memoria (interceptor) si ya estaba guardado
        viewModelScope.launch {
            val saved = tokenStore.token.first()
            tokenProvider.set(saved)
        }
    }

    fun login(email: String, password: String, onSuccess: () -> Unit, onError: (String) -> Unit) {
        viewModelScope.launch {
            _loading.value = true
            _error.value = null
            when (val r = repo.login(email, password)) {
                is AuthResult.Ok -> onSuccess()
                is AuthResult.Error -> {
                    _error.value = r.message
                    onError(r.message)
                }
            }
            _loading.value = false
        }
    }

    fun register(email: String, password: String, onSuccess: () -> Unit, onError: (String) -> Unit) {
        viewModelScope.launch {
            _loading.value = true
            _error.value = null
            when (val r = repo.register(email, password)) {
                is AuthResult.Ok -> onSuccess()
                is AuthResult.Error -> {
                    _error.value = r.message
                    onError(r.message)
                }
            }
            _loading.value = false
        }
    }
}