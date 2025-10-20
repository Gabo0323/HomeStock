package cr.proyect.una.globales.info

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import cr.proyect.una.globales.info.presentation.navigation.AppNavGraph
import cr.proyect.una.globales.info.presentation.navigation.NavRoute
import cr.proyect.una.globales.info.presentation.navigation.bottomItems
import cr.proyect.una.globales.info.presentation.ui.layout.MainLayout
import cr.proyect.una.globales.info.presentation.viewmodel.AuthViewModel
import cr.proyect.una.globales.info.presentation.ui.theme.PAITheme
import dagger.hilt.android.AndroidEntryPoint
import androidx.compose.runtime.getValue
import androidx.compose.runtime.collectAsState
import cr.proyect.una.globales.info.presentation.ui.theme.PAITheme
import kotlinx.coroutines.launch

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

                val context = LocalContext.current
                val scope = rememberCoroutineScope()
                val loggedIn by SessionManager.isLoggedIn(context).collectAsState(initial = false)
                val startRoute = if (loggedIn) NavRoute.Inventory.route else NavRoute.Login.route

                // Top-level que muestran la BottomBar (nuevos nombres)
                val topLevelRoutes = setOf(
                    NavRoute.Inventory.route,
                    NavRoute.ShoppingList.route,
                    NavRoute.History.route,
                    NavRoute.Compare.route,
                    NavRoute.Settings.route
                )
                val showBottomBar = currentRoute in topLevelRoutes

                val user by authViewModel.user.collectAsState()
                val startRoute = if (user != null) NavRoute.Inventory.route else NavRoute.Inventory.route
                val titleText = if (currentRoute == NavRoute.Login.route) "" else {
                    bottomItems.firstOrNull { it.route == currentRoute }?.label ?: "HomeStock"
                }

                MainLayout(
                    navController = navController,
                    showBottomBar = showBottomBar,
                    title = bottomItems.firstOrNull { it.route == currentRoute }?.label ?: "HomeStock"
                ) { _ /* inner padding not needed by AppNavGraph currently */ ->
                    AppNavGraph(
                        navController = navController,
                        start = startRoute,
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
                        }
                    )
                }
            }
        }
    }
}
