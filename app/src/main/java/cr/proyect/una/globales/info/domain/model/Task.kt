package cr.proyect.una.globales.info.domain.model

import java.time.LocalDateTime

data class Task(
    val id: Int,
    val title: String,
    val due: LocalDateTime
)