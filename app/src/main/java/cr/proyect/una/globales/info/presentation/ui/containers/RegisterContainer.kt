package cr.proyect.una.globales.info.presentation.ui.containers

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.lifecycle.viewmodel.compose.viewModel
import cr.proyect.una.globales.info.presentation.ui.screens.RegisterScreen
import cr.proyect.una.globales.info.presentation.viewmodel.AuthViewModel


@Composable
fun RegisterContainer(
    onRegisterSuccess: () -> Unit,
    onGoToLogin: () -> Unit
) {
    val vm: AuthViewModel = viewModel()
    val isLoading = vm.loading.collectAsState().value

    RegisterScreen(
        onRegisterSuccess = onRegisterSuccess,
        onGoToLogin = onGoToLogin,
        onSubmit = { email: String, password: String, success: () -> Unit, error: (String) -> Unit ->
            vm.register(
                email = email,
                password = password,
                onSuccess = success,
                onError = error
            )
        },
        isLoading = isLoading
    )
}