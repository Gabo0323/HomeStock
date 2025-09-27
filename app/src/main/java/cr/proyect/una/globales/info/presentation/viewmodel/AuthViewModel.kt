package cr.proyect.una.globales.info.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import cr.proyect.una.globales.info.domain.model.User
import cr.proyect.una.globales.info.domain.use_case.LoginUseCase
import cr.proyect.una.globales.info.domain.use_case.RegisterUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val loginUseCase: LoginUseCase,
    private val registerUseCase: RegisterUseCase
) : ViewModel() {

    private val _user = MutableStateFlow<User?>(null)
    val user: StateFlow<User?> = _user

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    fun login(email: String, password: String) {
        viewModelScope.launch {
            try {
                _user.value = loginUseCase(email, password)
            } catch (e: Exception) {
                _error.value = e.message
            }
        }
    }

    fun register(user: User, password: String) {
        viewModelScope.launch {
            try {
                _user.value = registerUseCase(user, password)
            } catch (e: Exception) {
                _error.value = e.message
            }
        }
    }
}
