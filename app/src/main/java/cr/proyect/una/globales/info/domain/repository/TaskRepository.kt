package cr.proyect.una.globales.info.domain.repository

import cr.proyect.una.globales.info.domain.model.Task
import kotlinx.coroutines.flow.Flow

interface TaskRepository {
    fun tasks(): Flow<List<Task>>
    suspend fun taskById(id: Int): Task?
}
