package cr.proyect.una.globales.info

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.getValue
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.rememberCoroutineScope
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import cr.proyect.una.globales.info.presentation.navigation.AppNavGraph
import cr.proyect.una.globales.info.presentation.navigation.NavRoute
import cr.proyect.una.globales.info.presentation.navigation.bottomItems
import cr.proyect.una.globales.info.presentation.ui.layout.MainLayout
import cr.proyect.una.globales.info.ui.theme.PAITheme
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PAITheme {
                val navController = rememberNavController()
                val backStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = backStackEntry?.destination?.route
                val scope = rememberCoroutineScope()

                val topLevelRoutes = setOf(
                    NavRoute.Home.route,
                    NavRoute.Tasks.route,
                    NavRoute.Materias.route,
                    NavRoute.Calendario.route,
                    NavRoute.Settings.route
                )
                val showBottomBar = currentRoute in topLevelRoutes
                val loggedIn by SessionManager.isLoggedIn(this).collectAsState(initial = false)

                MainLayout(
                    navController = navController,
                    showBottomBar = showBottomBar,
                    title = bottomItems.firstOrNull { it.route == currentRoute }?.label ?: "HomeStock"
                ) { innerMod ->
                    AppNavGraph(
                        navController = navController,
                        start = if (loggedIn) NavRoute.Home.route else NavRoute.Login.route,
                        onLoggedIn = {
                            scope.launch {
                                SessionManager.setLoggedIn(this@MainActivity, true)
                                navController.navigate(NavRoute.Home.route) {
                                    popUpTo(0)
                                    launchSingleTop = true
                                }
                            }
                        },
                        onLogout = {
                            scope.launch {
                                SessionManager.setLoggedIn(this@MainActivity, false)
                                navController.navigate(NavRoute.Login.route) {
                                    popUpTo(0)
                                    launchSingleTop = true
                                }
                            }
                        },
                        modifier = innerMod
                    )
                }
            }
        }
    }
}
