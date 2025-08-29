package cr.proyect.una.globales.info.presentation.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.CompareArrows
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Settings
import androidx.compose.ui.graphics.vector.ImageVector

data class BottomItem(
    val route: String,
    val label: String,
    val icon: ImageVector
)

val bottomItems: List<BottomItem> = listOf(
    BottomItem(
        route = NavRoute.Inventory.route,
        label = "Inventario",
        icon = Icons.Filled.Home
    ),
    BottomItem(
        route = NavRoute.ShoppingList.route,
        label = "Lista de compras",
        icon = Icons.Filled.List
    ),
    BottomItem(
        route = NavRoute.History.route,
        label = "Historial",
        icon = Icons.Filled.BarChart
    ),
    BottomItem(
        route = NavRoute.Compare.route,
        label = "Comparar",
        icon = Icons.Filled.CompareArrows
    ),
    BottomItem(
        route = NavRoute.Settings.route,
        label = "Configuración",
        icon = Icons.Filled.Settings
    )
)
