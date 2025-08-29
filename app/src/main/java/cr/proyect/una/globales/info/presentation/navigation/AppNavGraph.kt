package cr.proyect.una.globales.info.presentation.navigation

import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import cr.proyect.una.globales.info.presentation.ui.screens.* // Home/TaskList/Materias/Calendario/Login/Register/Config/Detail
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

        // --- Auth ---
        composable(NavRoute.Login.route) {
            LoginScreen(
                onLoginSuccess = {
                    onLoggedIn()
                    navController.navigate(NavRoute.Inventory.route) {
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

        // --- Top-level (BottomBar) ---
        composable(NavRoute.Inventory.route) {
            HomeScreen( // si luego renombraste a InventoryScreen, cambia aquí el nombre de la función
                onSeeAllTasks = { navController.navigate(NavRoute.ShoppingList.route) },
                onOpenTask = { id -> navController.navigate(NavRoute.ProductDetail.build(id)) },
                modifier = modifier
            )
        }

        composable(NavRoute.ShoppingList.route) {
            TaskListScreen( // si luego renombraste a ShoppingListScreen, cambia aquí el nombre de la función
                vm = vm,
                onOpenTask = { id -> navController.navigate(NavRoute.ProductDetail.build(id)) },
                modifier = modifier
            )
        }

        composable(NavRoute.History.route) {
            MateriasScreen( // si luego renombraste a HistoryScreen, cambia aquí el nombre
                modifier = modifier
            )
        }

        composable(NavRoute.Compare.route) {
            CalendarioScreen( // si luego renombraste a CompareScreen, cambia aquí el nombre
                modifier = modifier
            )
        }

        composable(NavRoute.Settings.route) {
            // Usa el que tengas: ConfiguracionScreen o SettingsScreen
            ConfiguracionScreen(onLogout = onLogout, modifier = modifier)
            // Si ya renombraste: SettingsScreen(onLogout = onLogout, modifier = modifier)
        }


    }
}
