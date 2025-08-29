package cr.proyect.una.globales.info

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.*
import androidx.lifecycle.lifecycleScope
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import cr.proyect.una.globales.info.presentation.navigation.NavRoute
import cr.proyect.una.globales.info.presentation.navigation.AppNavGraph
import cr.proyect.una.globales.info.presentation.ui.layout.MainLayout
import cr.proyect.una.globales.info.ui.theme.PAITheme
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch


class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            PAITheme {
                val navController = rememberNavController()

                val backStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = backStackEntry?.destination?.route ?: ""
                val showBottomBar = currentRoute in listOf(
                    NavRoute.Home.route,
                    NavRoute.Tasks.route,
                    NavRoute.Materias.route,
                    NavRoute.Calendario.route,
                    NavRoute.Settings.route,
                    NavRoute.Configuracion.route
                )
                val title = when (currentRoute) {
                    NavRoute.Home.route -> "Inicio"
                    NavRoute.Tasks.route -> "Tareas"
                    NavRoute.Materias.route -> "Materias"
                    NavRoute.Calendario.route -> "Calendario"
                    NavRoute.Settings.route -> "Ajustes"
                    NavRoute.Configuracion.route -> "Configuración"
                    NavRoute.Login.route -> "Iniciar sesión"
                    NavRoute.Register.route -> "Registro"
                    else -> "Detalle"
                }

                var start by remember { mutableStateOf(NavRoute.Login.route) }
                LaunchedEffect(Unit) {
                    val logged = SessionManager.isLoggedIn(applicationContext).first()
                    start = if (logged) NavRoute.Home.route else NavRoute.Login.route
                }

                fun onSetLoggedIn(value: Boolean) {
                    lifecycleScope.launch {
                        SessionManager.setLoggedIn(applicationContext, value)
                    }
                }

                MainLayout(
                    navController = navController,
                    showBottomBar = showBottomBar,
                    title = title
                ) { modifier ->
                    AppNavGraph(
                        navController = navController,
                        start = start,
                        onLogout = {
                            onSetLoggedIn(false)
                            navController.navigate(NavRoute.Login.route) {
                                popUpTo(0) { inclusive = true }
                                launchSingleTop = true
                            }
                        },
                        onLoggedIn = { onSetLoggedIn(true) },
                        modifier = modifier
                    )
                }
            }
        }
    }
}
