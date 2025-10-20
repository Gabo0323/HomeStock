package cr.proyect.una.globales.info.presentation.ui.containers


import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import cr.proyect.una.globales.info.presentation.ui.screens.LoginScreen
import cr.proyect.una.globales.info.presentation.viewmodel.AuthViewModel

@Composable
fun LoginContainer(
    onLoginSuccess: () -> Unit,
    onGoToRegister: () -> Unit
) {
    val vm: AuthViewModel = viewModel()
    LoginScreen(
        onLoginSuccess = onLoginSuccess,
        onGoToRegister = onGoToRegister,
        onSubmit = { email, pass, success, error ->
            vm.login(email, pass, onSuccess = success, onError = error)
        }
    )
}