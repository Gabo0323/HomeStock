package cr.proyect.una.globales.info.presentation.ui.screens


import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Assignment
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import cr.proyect.una.globales.info.presentation.viewmodel.TaskViewModel
import cr.proyect.una.globales.info.presentation.ui.theme.AppColors

@Composable
fun TaskListScreen(
    vm: TaskViewModel,
    onOpenTask: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val tasks by vm.tasks.collectAsState(initial = emptyList())

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFFF8F9FA))
            .padding(horizontal = 20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(vertical = 24.dp)
    ) {
        item {
            // Estadísticas de tareas
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                TaskStatCard(
                    modifier = Modifier.weight(1f),
                    value = "${tasks.size}",
                    label = "Total",
                    color = Color(0xFF3B82F6)
                )
                TaskStatCard(
                    modifier = Modifier.weight(1f),
                    value = "${tasks.count { /* completada */ false }}", // Ajustar según tu modelo
                    label = "Pendientes",
                    color = Color(0xFFFF9800)
                )
            }
        }

        if (tasks.isEmpty()) {
            item {
                EmptyTasksCard()
            }
        } else {
            items(tasks) { task ->
                TaskCard(
                    task = task,
                    onOpenTask = onOpenTask
                )
            }
        }

        item {
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
fun TaskStatCard(
    modifier: Modifier = Modifier,
    value: String,
    label: String,
    color: Color
) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        shape = RoundedCornerShape(12.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = value,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = color
            )
            Text(
                text = label,
                fontSize = 12.sp,
                color = Color(0xFF6B7280)
            )
        }
    }
}

@Composable
fun TaskCard(
    task: Any, // Cambia por tu tipo de Task real
    onOpenTask: (Int) -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable {
                // Ajustar según tu modelo de Task
                val taskId = when {
                    task is Any && task::class.java.getDeclaredField("id") != null -> {
                        task::class.java.getDeclaredField("id").apply { isAccessible = true }.get(task) as? Int ?: 0
                    }
                    else -> 0
                }
                onOpenTask(taskId)
            },
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 6.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Icono de tarea
            Surface(
                modifier = Modifier.size(48.dp),
                shape = RoundedCornerShape(24.dp),
                color = AppColors.primaryGreen.copy(alpha = 0.1f)
            ) {
                Icon(
                    imageVector = Icons.Filled.CheckCircle,
                    contentDescription = null,
                    tint = AppColors.primaryGreen,
                    modifier = Modifier.padding(12.dp)
                )
            }

            // Contenido de la tarea
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = getTaskTitle(task),
                    fontSize = 16.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = AppColors.textBlack,
                    maxLines = 2
                )
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = Color(0xFF3B82F6).copy(alpha = 0.1f)
                ) {
                    Text(
                        text = "TAREA",
                        fontSize = 10.sp,
                        color = Color(0xFF3B82F6),
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }

            // Indicador de estado
            Icon(
                imageVector = Icons.Filled.Schedule,
                contentDescription = null,
                tint = Color(0xFF6B7280),
                modifier = Modifier.size(20.dp)
            )
        }
    }
}

@Composable
fun EmptyTasksCard() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(40.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Icon(
                imageVector = Icons.Filled.Assignment,
                contentDescription = null,
                tint = Color(0xFF9CA3AF),
                modifier = Modifier.size(64.dp)
            )
            Text(
                text = "No hay tareas",
                fontSize = 18.sp,
                fontWeight = FontWeight.Medium,
                color = Color(0xFF6B7280)
            )
            Text(
                text = "Cuando tengas tareas asignadas aparecerán aquí",
                fontSize = 14.sp,
                color = Color(0xFF9CA3AF)
            )
        }
    }
}

// Función helper para obtener el título de la tarea
private fun getTaskTitle(task: Any): String {
    return try {
        val titleField = task::class.java.getDeclaredField("title")
        titleField.isAccessible = true
        titleField.get(task) as? String ?: "Tarea sin título"
    } catch (e: Exception) {
        "Tarea"
    }
}

@Preview(showBackground = true)
@Composable
private fun TaskListScreenPreview() {
    // Preview básico
}

@Preview(showBackground = true, name = "TaskList - Con tareas")
@Composable
private fun TaskListScreenWithTasksPreview() {
    // Mock data para el preview
    val mockTasks = listOf(
        MockTask(1, "Completar proyecto de matemáticas"),
        MockTask(2, "Estudiar para examen de historia"),
        MockTask(3, "Entrega ensayo literatura")
    )

    // Simulamos el TaskListScreen con datos
    TaskListScreenPreview(mockTasks)
}

@Preview(showBackground = true, name = "TaskList - Sin tareas")
@Composable
private fun TaskListScreenEmptyPreview() {
    TaskListScreenPreview(emptyList())
}

@Composable
private fun TaskListScreenPreview(tasks: List<MockTask> = emptyList()) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8F9FA))
    ) {
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            contentPadding = PaddingValues(vertical = 24.dp)
        ) {
            item {
                // Estadísticas de tareas
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    TaskStatCard(
                        modifier = Modifier.weight(1f),
                        value = "${tasks.size}",
                        label = "Total",
                        color = Color(0xFF3B82F6)
                    )
                    TaskStatCard(
                        modifier = Modifier.weight(1f),
                        value = "${tasks.count { !it.completed }}",
                        label = "Pendientes",
                        color = Color(0xFFFF9800)
                    )
                }
            }

            if (tasks.isEmpty()) {
                item {
                    EmptyTasksCard()
                }
            } else {
                items(tasks) { task ->
                    MockTaskCard(
                        task = task,
                        onOpenTask = { /* Preview - no action */ }
                    )
                }
            }

            item {
                Spacer(modifier = Modifier.height(32.dp))
            }
        }
    }
}

// Mock data para previews
data class MockTask(
    val id: Int,
    val title: String,
    val completed: Boolean = false
)

@Composable
fun MockTaskCard(
    task: MockTask,
    onOpenTask: (Int) -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onOpenTask(task.id) },
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 6.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Icono de tarea
            Surface(
                modifier = Modifier.size(48.dp),
                shape = RoundedCornerShape(24.dp),
                color = if (task.completed)
                    Color(0xFF10B981).copy(alpha = 0.1f)
                else AppColors.primaryGreen.copy(alpha = 0.1f)
            ) {
                Icon(
                    imageVector = Icons.Filled.CheckCircle,
                    contentDescription = null,
                    tint = if (task.completed) Color(0xFF10B981) else AppColors.primaryGreen,
                    modifier = Modifier.padding(12.dp)
                )
            }

            // Contenido de la tarea
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = task.title,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = AppColors.textBlack,
                    maxLines = 2
                )
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = Color(0xFF3B82F6).copy(alpha = 0.1f)
                ) {
                    Text(
                        text = if (task.completed) "COMPLETADA" else "PENDIENTE",
                        fontSize = 10.sp,
                        color = if (task.completed) Color(0xFF10B981) else Color(0xFF3B82F6),
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }

            // Indicador de estado
            Icon(
                imageVector = Icons.Filled.Schedule,
                contentDescription = null,
                tint = Color(0xFF6B7280),
                modifier = Modifier.size(20.dp)
            )
        }
    }
}