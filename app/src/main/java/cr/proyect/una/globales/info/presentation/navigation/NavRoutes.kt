package cr.proyect.una.globales.info.presentation.navigation

sealed class NavRoute(val route: String) {
    // Sesión
    object Login : NavRoute("login")
    object Register : NavRoute("register")

    // Top-level (BottomBar)
    object Inventory : NavRoute("inventory")        // antes Home
    object ShoppingList : NavRoute("shopping_list") // antes Tasks
    object History : NavRoute("history")            // antes Materias
    object Compare : NavRoute("compare")            // antes Calendario
    object Settings : NavRoute("settings")          // antes Configuración

    // Pantallas secundarias
    object ProductDetail : NavRoute("product/{productId}") {
        fun build(id: Int) = "product/$id"
    }
    object AddProduct : NavRoute("add_product")
}
