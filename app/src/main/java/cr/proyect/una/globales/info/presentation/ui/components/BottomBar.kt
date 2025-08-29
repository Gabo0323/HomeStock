package cr.proyect.una.globales.info.presentation.ui.components


import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarToday
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.School
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import cr.proyect.una.globales.info.presentation.navigation.NavRoute

@Composable
fun BottomBar(navController: NavHostController) {
    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp.dp

    // Ajustar padding y tamaños según el ancho de pantalla
    val horizontalPadding = when {
        screenWidth < 360.dp -> 4.dp
        screenWidth < 400.dp -> 8.dp
        else -> 12.dp
    }

    val itemPadding = when {
        screenWidth < 360.dp -> 8.dp
        screenWidth < 400.dp -> 10.dp
        else -> 12.dp
    }

    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .shadow(8.dp, RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp))
            .clip(RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp)),
        color = Color.White
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    color = Color.White,
                    shape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp)
                )
                .padding(vertical = 12.dp, horizontal = horizontalPadding),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            BottomBarItem(
                icon = Icons.Filled.Home,
                label = "Inicio",
                screenWidth = screenWidth,
                itemPadding = itemPadding,
                onClick = {
                    navController.navigate(NavRoute.Home.route) {
                        popUpTo(NavRoute.Home.route) { inclusive = false }
                        launchSingleTop = true
                    }
                }
            )

            BottomBarItem(
                icon = Icons.Filled.CheckCircle,
                label = "Tareas",
                screenWidth = screenWidth,
                itemPadding = itemPadding,
                onClick = {
                    navController.navigate(NavRoute.Tasks.route) {
                        popUpTo(NavRoute.Home.route) { inclusive = false }
                        launchSingleTop = true
                    }
                }
            )

            BottomBarItem(
                icon = Icons.Filled.School,
                label = "Materias",
                screenWidth = screenWidth,
                itemPadding = itemPadding,
                onClick = {
                    navController.navigate(NavRoute.Materias.route) {
                        popUpTo(NavRoute.Home.route) { inclusive = false }
                        launchSingleTop = true
                    }
                }
            )

            BottomBarItem(
                icon = Icons.Filled.CalendarToday,
                label = "Calendario",
                screenWidth = screenWidth,
                itemPadding = itemPadding,
                onClick = {
                    navController.navigate(NavRoute.Calendario.route) {
                        popUpTo(NavRoute.Home.route) { inclusive = false }
                        launchSingleTop = true
                    }
                }
            )

            BottomBarItem(
                icon = Icons.Filled.Settings,
                label = "Config",
                screenWidth = screenWidth,
                itemPadding = itemPadding,
                onClick = {
                    navController.navigate(NavRoute.Configuracion.route) {
                        popUpTo(NavRoute.Home.route) { inclusive = false }
                        launchSingleTop = true
                    }
                }
            )
        }
    }
}

@Composable
fun BottomBarItem(
    icon: ImageVector,
    label: String,
    screenWidth: androidx.compose.ui.unit.Dp,
    itemPadding: androidx.compose.ui.unit.Dp,
    onClick: () -> Unit
) {
    // Ajustar tamaños según el ancho de pantalla
    val iconSize = when {
        screenWidth < 360.dp -> 20.dp
        screenWidth < 400.dp -> 24.dp
        else -> 28.dp
    }

    val fontSize = when {
        screenWidth < 360.dp -> 8.sp
        screenWidth < 400.dp -> 9.sp
        else -> 10.sp
    }

    val surfaceSize = when {
        screenWidth < 360.dp -> 28.dp
        screenWidth < 400.dp -> 30.dp
        else -> 32.dp
    }

    Column(
        modifier = Modifier
            .clip(RoundedCornerShape(12.dp))
            .clickable { onClick() }
            .padding(horizontal = itemPadding, vertical = 6.dp)
            .widthIn(max = 80.dp), // Limitar ancho máximo
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        Surface(
            modifier = Modifier.size(surfaceSize),
            shape = RoundedCornerShape(surfaceSize / 2),
            color = Color(0xFF27ae60).copy(alpha = 0.1f)
        ) {
            Icon(
                imageVector = icon,
                contentDescription = label,
                tint = Color(0xFF27ae60),
                modifier = Modifier
                    .padding(4.dp)
                    .size(iconSize)
            )
        }
        Text(
            text = label,
            fontSize = fontSize,
            fontWeight = FontWeight.Medium,
            color = Color(0xFF374151),
            maxLines = 1,
            overflow = TextOverflow.Ellipsis
        )
    }
}

@Preview(showBackground = true)
@Composable
private fun BottomBarPreview() {
    // Preview sin navController para testing
}
