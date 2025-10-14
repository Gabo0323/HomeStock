package cr.proyect.una.globales.info.presentation.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.CompareArrows
import androidx.compose.material.icons.automirrored.filled.List
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.Home
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
        icon = Icons.AutoMirrored.Filled.List
    ),
    BottomItem(
        route = NavRoute.History.route,
        label = "Historial",
        icon = Icons.Filled.BarChart
    ),
    BottomItem(
        route = NavRoute.Compare.route,
        label = "Comparar",
        icon = Icons.AutoMirrored.Filled.CompareArrows
    ),
    BottomItem(
        route = NavRoute.Settings.route,
        label = "Configuración",
        icon = Icons.Filled.Settings
    )
)
