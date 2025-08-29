package cr.proyect.una.globales.info.presentation.viewmodel

import androidx.lifecycle.ViewModel
import cr.proyect.una.globales.info.data.repository.InMemoryTaskRepository
import cr.proyect.una.globales.info.domain.model.Task
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

class TaskViewModel : ViewModel() {
    private val repo = InMemoryTaskRepository()
    val tasks = repo.tasks()

    fun task(id: Int): Flow<Task?> = flow { emit(repo.taskById(id)) }
}