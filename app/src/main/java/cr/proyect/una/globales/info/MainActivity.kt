package cr.proyect.una.globales.info

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
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
import cr.proyect.una.globales.info.presentation.ui.theme.PAITheme
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
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

                MainLayout(
                    navController = navController,
                    showBottomBar = showBottomBar,
                    title = bottomItems.firstOrNull { it.route == currentRoute }?.label ?: "HomeStock"
                ) { innerModifier ->
                    AppNavGraph(
                        navController = navController,
                        // Si usas login, puedes cambiar a NavRoute.Login.route más adelante.
                        start = startRoute,
                        onLoggedIn = {
                            scope.launch { SessionManager.setLoggedIn(context, true) }
                        },
                        onLogout = {
                            scope.launch { SessionManager.setLoggedIn(context, false) }
                        },
                        modifier = innerModifier
                    )
                }
            }
        }
    }
}
