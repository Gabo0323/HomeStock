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
            InventoryScreen(navController = navController)
        }
        composable(NavRoute.ShoppingList.route) {
            ShoppingListScreen()
        }
        composable(NavRoute.History.route) {
            HistoryScreen()
        }
        composable(NavRoute.Compare.route) {
            CompareScreen()
        }
        composable(NavRoute.Settings.route) {
            SettingsScreen()
        }
        composable(NavRoute.ProductDetail.route) {
            ProductDetailScreen()
        }
        composable(NavRoute.AddProduct.route) {
            AddProductScreen(onProductAdded = { navController.popBackStack() })
        }
    }
}
