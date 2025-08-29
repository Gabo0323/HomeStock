package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChevronLeft
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch
import java.time.Duration
import java.time.LocalDateTime

@Composable
fun HomeScreen(
    modifier: Modifier = Modifier,
    onOpenTask: (Int) -> Unit = {},
    onSeeAllTasks: () -> Unit = {}
) {
    val subjects = remember { demoSubjects() }
    val tasks = remember { demoTasks() }

    val sState = rememberLazyListState()
    val tState = rememberLazyListState()
    val scope = rememberCoroutineScope()

    Column(modifier.fillMaxSize().padding(16.dp)) {
        Text("Materias", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(8.dp))
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = { scope.launch { scrollByItem(sState, -1) } }) {
                Icon(Icons.Filled.ChevronLeft, null)
            }
            LazyRow(
                state = sState,
                modifier = Modifier.weight(1f).height(140.dp),
                contentPadding = PaddingValues(horizontal = 8.dp)
            ) {
                itemsIndexed(subjects) { _, s ->
                    SubjectCard(s)
                    Spacer(Modifier.width(12.dp))
                }
            }
            IconButton(onClick = { scope.launch { scrollByItem(sState, +1) } }) {
                Icon(Icons.Filled.ChevronRight, null)
            }
        }

        Spacer(Modifier.height(24.dp))
        Text("Tareas", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(8.dp))
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = { scope.launch { scrollByItem(tState, -1) } }) {
                Icon(Icons.Filled.ChevronLeft, null)
            }
            LazyRow(
                state = tState,
                modifier = Modifier.weight(1f).height(120.dp),
                contentPadding = PaddingValues(horizontal = 8.dp)
            ) {
                itemsIndexed(tasks) { _, t ->
                    TaskCard(t, onOpenTask)
                    Spacer(Modifier.width(12.dp))
                }
            }
            IconButton(onClick = { scope.launch { scrollByItem(tState, +1) } }) {
                Icon(Icons.Filled.ChevronRight, null)
            }
        }

        Spacer(Modifier.height(24.dp))
        AssistantChat()
    }
}

private suspend fun scrollByItem(state: LazyListState, delta: Int) {
    val idx = state.firstVisibleItemIndex + delta
    val target = idx.coerceAtLeast(0)
    state.animateScrollToItem(target)
}

private data class SubjectItem(val name: String, val duration: String, val start: String, val end: String)
private data class TaskItem(val id: Int, val title: String, val due: LocalDateTime)

@Composable
private fun SubjectCard(s: SubjectItem) {
    ElevatedCard(modifier = Modifier.width(220.dp).fillMaxHeight()) {
        Column(Modifier.padding(12.dp)) {
            Text(s.name, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(4.dp))
            Text("Duración: ${s.duration}")
            Text("Inicio: ${s.start}")
            Text("Fin: ${s.end}")
        }
    }
}

@Composable
private fun TaskCard(t: TaskItem, onOpen: (Int) -> Unit) {
    val remain = remember(t.due) {
        val d = Duration.between(LocalDateTime.now(), t.due)
        val days = d.toDays()
        val hours = d.minusDays(days).toHours()
        "${days}d ${hours}h"
    }
    ElevatedCard(
        onClick = { onOpen(t.id) },
        modifier = Modifier.width(220.dp).fillMaxHeight()
    ) {
        Column(Modifier.padding(12.dp)) {
            Text(t.title, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(4.dp))
            Text("Vence en: $remain")
        }
    }
}

@Composable
private fun AssistantChat() {
    var input by remember { mutableStateOf("") }
    var messages by remember { mutableStateOf(listOf("Hola, ¿en qué te ayudo hoy?")) }

    ElevatedCard(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(12.dp)) {
            Text("Asistente", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(8.dp))
            messages.forEach { Text("• $it") }
            Spacer(Modifier.height(8.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                OutlinedTextField(
                    value = input, onValueChange = { input = it },
                    modifier = Modifier.weight(1f), placeholder = { Text("Escribe un mensaje…") }
                )
                Spacer(Modifier.width(8.dp))
                Button(onClick = {
                    if (input.isNotBlank()) {
                        messages = messages + input + "→ (respuesta simulada)"
                        input = ""
                    }
                }) { Text("Enviar") }
            }
        }
    }
}

private fun demoSubjects() = listOf(
    SubjectItem("Estructuras", "2H 00M", "Lun, 29 10:00", "Dic, 29 12:00"),
    SubjectItem("Cálculo", "1H 30M", "Mar, 10 09:00", "Dic, 10 10:30"),
    SubjectItem("Programación", "2H 00M", "Lun, 29 10:00", "Dic, 29 12:00"),
)

private fun demoTasks() = listOf(
    TaskItem(1, "Tarea de investigación", LocalDateTime.now().plusDays(5)),
    TaskItem(2, "Ensayo de lectura", LocalDateTime.now().plusDays(2).plusHours(12)),
    TaskItem(3, "Proyecto grupal", LocalDateTime.now().plusDays(10).plusMinutes(30)),
)
