package cr.proyect.una.globales.info.data.repository

import android.os.Build
import androidx.annotation.RequiresApi
import cr.proyect.una.globales.info.domain.model.Task
import cr.proyect.una.globales.info.domain.repository.TaskRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import java.time.LocalDateTime

class InMemoryTaskRepository : TaskRepository {
    @RequiresApi(Build.VERSION_CODES.O)
    private val state = MutableStateFlow(
        listOf(
            Task(1, "Tarea de investigación", LocalDateTime.now().plusDays(5)),
            Task(2, "Ensayo de lectura", LocalDateTime.now().plusDays(2).plusHours(12)),
            Task(3, "Proyecto grupal", LocalDateTime.now().plusDays(10).plusMinutes(30))
        )
    )

    @RequiresApi(Build.VERSION_CODES.O)
    override fun tasks(): Flow<List<Task>> = state

    @RequiresApi(Build.VERSION_CODES.O)
    override suspend fun taskById(id: Int): Task? = state.value.firstOrNull { it.id == id }
}
