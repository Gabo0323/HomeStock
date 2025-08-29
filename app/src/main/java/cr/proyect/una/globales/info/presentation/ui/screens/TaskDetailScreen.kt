package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import cr.proyect.una.globales.info.presentation.viewmodel.TaskViewModel

@Composable
fun TaskDetailScreen(
    vm: TaskViewModel,
    taskId: Int,
    modifier: Modifier = Modifier
) {
    val task by vm.task(taskId).collectAsState(initial = null)
    Column(modifier.fillMaxSize().padding(16.dp)) {
        Text("Detalle de tarea", style = MaterialTheme.typography.titleLarge)
        Spacer(Modifier.height(12.dp))
        if (task == null) Text("No encontrada")
        else Text("• ${task!!.title}")
    }
}
