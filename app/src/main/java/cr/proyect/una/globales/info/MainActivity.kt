package cr.proyect.una.globales.info

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import cr.proyect.una.globales.info.presentation.navigation.AppNavGraph
import cr.proyect.una.globales.info.presentation.navigation.NavRoute
import cr.proyect.una.globales.info.presentation.navigation.bottomItems
import cr.proyect.una.globales.info.presentation.ui.layout.MainLayout
import cr.proyect.una.globales.info.ui.theme.PAITheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PAITheme {
                val navController = rememberNavController()
                val backStackEntry = navController.currentBackStackEntryAsState().value
                val currentRoute = backStackEntry?.destination?.route

                // Top-level que muestran la BottomBar (nuevos nombres)
                val topLevelRoutes = setOf(
                    NavRoute.Inventory.route,
                    NavRoute.ShoppingList.route,
                    NavRoute.History.route,
                    NavRoute.Compare.route,
                    NavRoute.Settings.route
                )
                val showBottomBar = currentRoute in topLevelRoutes

                MainLayout(
                    navController = navController,
                    showBottomBar = showBottomBar,
                    title = bottomItems.firstOrNull { it.route == currentRoute }?.label ?: "HomeStock"
                ) { innerModifier ->
                    AppNavGraph(
                        navController = navController,
                        // Si usas login, puedes cambiar a NavRoute.Login.route más adelante.
                        start = NavRoute.Inventory.route,
                        onLoggedIn = {
                            // Navega al inicio del app después de login
                            navController.navigate(NavRoute.Inventory.route) {
                                popUpTo(0)
                                launchSingleTop = true
                            }
                        },
                        onLogout = {
                            // Vuelve a login si implementas sesión
                            navController.navigate(NavRoute.Login.route) {
                                popUpTo(0)
                                launchSingleTop = true
                            }
                        },
                        modifier = innerModifier
                    )
                }
            }
        }
    }
}
