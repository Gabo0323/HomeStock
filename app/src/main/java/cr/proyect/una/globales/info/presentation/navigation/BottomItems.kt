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
    BottomItem(NavRoute.Home.route,        "Inventario",       Icons.Filled.Home),
    BottomItem(NavRoute.Tasks.route,       "Lista de compras", Icons.Filled.List),
    BottomItem(NavRoute.Materias.route,    "Historial",        Icons.Filled.BarChart),
    BottomItem(NavRoute.Calendario.route,  "Comparar",         Icons.Filled.CompareArrows),
    BottomItem(NavRoute.Settings.route,    "Configuración",    Icons.Filled.Settings),
)
