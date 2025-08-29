package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import cr.proyect.una.globales.info.presentation.viewmodel.TaskViewModel

@Suppress("UNUSED_PARAMETER")
@Composable
fun TaskListScreen(
    vm: TaskViewModel,
    onOpenTask: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    Box(modifier = modifier.fillMaxSize())
}
