package cr.proyect.una.globales.info.presentation.navigation

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import cr.proyect.una.globales.info.presentation.ui.screens.*

@Composable
fun AppNavGraph(
    navController: NavHostController,
    start: String,
    onLogout: () -> Unit,
    onLoggedIn: () -> Unit,
    modifier: Modifier = Modifier
) {
    NavHost(navController = navController, startDestination = start) {
        composable(NavRoute.Login.route) {
            LoginScreen(navController)
        }
        composable(NavRoute.Register.route) {
            RegisterScreen(navController)
        }
        composable(NavRoute.Inventory.route) {
            InventoryScreen(
                onAddItemClick = { navController.navigate("add_product") },
                onItemClick = { /* TODO: navegar a detalle cuando tengamos ID */ }
            )
        }
        composable(NavRoute.ShoppingList.route) {
            ShoppingListScreen(onAddItemClick = { navController.navigate("add_product") })
        }
        composable(NavRoute.History.route) {
            HistoryScreen()
        }
        composable(NavRoute.Compare.route) {
            CompareScreen()
        }
        composable(NavRoute.Settings.route) {
            SettingsScreen(onLogout = onLogout)
        }
        composable(NavRoute.ProductDetail.route) {
            ProductDetailScreen()
        }
        composable("add_product") {
            AddProductScreen(onProductAdded = { navController.popBackStack() })
        }
    }
}
