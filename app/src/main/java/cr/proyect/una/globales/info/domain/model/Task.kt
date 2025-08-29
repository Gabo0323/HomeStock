package cr.proyect.una.globales.info.domain.model

data class Task(
    val id: Int,
    val title: String,
    val description: String,
    val completed: Boolean = false
)
