package cr.proyect.una.globales.info

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import cr.proyect.una.globales.info.presentation.navigation.AppNavGraph
import cr.proyect.una.globales.info.presentation.navigation.NavRoute
import cr.proyect.una.globales.info.presentation.navigation.bottomItems
import cr.proyect.una.globales.info.presentation.ui.layout.MainLayout
import cr.proyect.una.globales.info.presentation.viewmodel.AuthViewModel
import cr.proyect.una.globales.info.ui.theme.PAITheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    private val authViewModel: AuthViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PAITheme {
                val navController = rememberNavController()
                val backStackEntry = navController.currentBackStackEntryAsState().value
                val currentRoute = backStackEntry?.destination?.route

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
                        start = if (authViewModel.user.value != null) NavRoute.Inventory.route else NavRoute.Login.route,
                        onLoggedIn = {
                            navController.navigate(NavRoute.Inventory.route) {
                                popUpTo(0)
                                launchSingleTop = true
                            }
                        },
                        onLogout = {
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
