package cr.proyect.una.globales.info.presentation.navigation

import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import cr.proyect.una.globales.info.presentation.ui.screens.*
import cr.proyect.una.globales.info.presentation.ui.screens.ProductDetailScreen
import cr.proyect.una.globales.info.presentation.viewmodel.HistoryViewModel

import cr.proyect.una.globales.info.presentation.ui.containers.RegisterContainer

@Composable
fun AppNavGraph(
    navController: NavHostController,
    start: String,
    onLogout: () -> Unit,
    onLoggedIn: () -> Unit,
    modifier: Modifier = Modifier
) {
    val vm: HistoryViewModel = viewModel()

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

                RegisterContainer(
                    onRegisterSuccess = { navController.popBackStack() },
                    onGoToLogin = { navController.popBackStack() }
                )
            }
        }

        // --- Top-level (BottomBar) ---
        composable(NavRoute.Inventory.route) {
            InventoryScreen(
                onSeeAllTasks = { navController.navigate(NavRoute.ShoppingList.route) },
                onOpenTask = { id -> navController.navigate(NavRoute.ProductDetail.build(id)) },
                modifier = modifier
            )
        }

        composable(NavRoute.ShoppingList.route) {
            ShoppingListScreen(
                vm = vm,
                onOpenTask = { id -> navController.navigate(NavRoute.ProductDetail.build(id)) },
                modifier = modifier
            )
        }

        composable(NavRoute.History.route) {
            HistoryScreen(
                modifier = modifier
            )
        }

        composable(NavRoute.Compare.route) {
            CompareScreen(
                modifier = modifier
            )
        }

        composable(NavRoute.Settings.route) {
            // Usa el que tengas: ConfiguracionScreen o SettingsScreen
            ConfiguracionScreen(
                onLogout = {
                    onLogout()
                    navController.navigate(NavRoute.Login.route) {
                        popUpTo(0)
                        launchSingleTop = true
                    }
                },
                modifier = modifier
            )
        }

        // --- Secundarias ---
        composable(
            route = NavRoute.ProductDetail.route,
            arguments = listOf(navArgument("productId") { type = NavType.IntType })
        ) { backStackEntry ->
            val id = backStackEntry.arguments?.getInt("productId") ?: return@composable
            ProductDetailScreen(productId = id, modifier = modifier)
        }
    }
}
