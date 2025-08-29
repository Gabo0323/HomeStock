package cr.proyect.una.globales.info.presentation.navigation

import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import cr.proyect.una.globales.info.presentation.ui.screens.*
import cr.proyect.una.globales.info.presentation.viewmodel.TaskViewModel

@Composable
fun AppNavGraph(
    navController: NavHostController,
    start: String,
    onLogout: () -> Unit,
    onLoggedIn: () -> Unit,
    modifier: Modifier = Modifier
) {
    val vm: TaskViewModel = viewModel()

    NavHost(navController = navController, startDestination = start) {
        composable(NavRoute.Login.route) {
            LoginScreen(
                onLoginSuccess = {
                    onLoggedIn()
                    navController.navigate(NavRoute.Home.route) {
                        popUpTo(NavRoute.Login.route) { inclusive = true }
                        launchSingleTop = true
                    }
                },
                onGoToRegister = { navController.navigate(NavRoute.Register.route) }
            )
        }

        composable(NavRoute.Register.route) {
            Box(modifier) {
                RegisterScreen(
                    onRegisterSuccess = { navController.popBackStack() },
                    onGoToLogin = { navController.popBackStack() }
                )
            }
        }

        composable(NavRoute.Home.route) {
            HomeScreen(
                onSeeAllTasks = { navController.navigate(NavRoute.Tasks.route) },
                onOpenTask = { id -> navController.navigate(NavRoute.TaskDetail.build(id)) },
                modifier = modifier
            )
        }

        composable(NavRoute.Tasks.route) {
            TaskListScreen(
                vm = vm,
                onOpenTask = { id -> navController.navigate(NavRoute.TaskDetail.build(id)) },
                modifier = modifier
            )
        }

        composable(NavRoute.Materias.route) { MateriasScreen(modifier = modifier) }
        composable(NavRoute.Calendario.route) { CalendarioScreen(modifier = modifier) }

        composable(NavRoute.Settings.route) {
            ConfiguracionScreen(onLogout = onLogout, modifier = modifier)
        }
        // Si no quieres duplicar "Configuración", elimina esta ruta:
        composable(NavRoute.Configuracion.route) {
            ConfiguracionScreen(onLogout = onLogout, modifier = modifier)
        }

        composable(NavRoute.TaskDetail.route) { backStackEntry ->
            val id = backStackEntry.arguments?.getString("taskId")?.toIntOrNull() ?: -1
            TaskDetailScreen(vm = vm, taskId = id, modifier = modifier)
        }
    }
}
