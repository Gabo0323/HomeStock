package cr.proyect.una.globales.info.presentation.ui.layout

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import cr.proyect.una.globales.info.presentation.ui.components.BottomBar

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainLayout(
    navController: NavHostController,
    showBottomBar: Boolean,
    title: String,
    content: @Composable (Modifier) -> Unit
) {
    Scaffold(
        topBar = { TopAppBar(title = { Text(title) }) },
        bottomBar = { if (showBottomBar) BottomBar(navController) }
    ) { inner ->
        content(Modifier.padding(inner))
    }
}
