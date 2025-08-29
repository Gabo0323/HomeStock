package cr.proyect.una.globales.info.presentation.navigation

sealed class NavRoute(val route: String) {
    data object Login : NavRoute("login")
    data object Register : NavRoute("register")
    data object Home : NavRoute("home")
    data object Tasks : NavRoute("tasks")
    data object Materias : NavRoute("materias")
    data object Calendario : NavRoute("calendario")
    data object Settings : NavRoute("settings")
    data object Configuracion : NavRoute("configuracion")
    data object TaskDetail : NavRoute("task/{taskId}") {
        fun build(taskId: Int) = "task/$taskId"
    }
}
