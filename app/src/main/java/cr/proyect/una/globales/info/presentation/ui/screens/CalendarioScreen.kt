package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Assignment
import androidx.compose.material.icons.filled.CalendarToday
import androidx.compose.material.icons.filled.Quiz
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.School
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import cr.proyect.una.globales.info.presentation.ui.theme.AppColors

data class Evento(
    val titulo: String,
    val fecha: String,
    val hora: String,
    val tipo: String // "clase", "tarea", "examen"
)

@Composable
fun CalendarioScreen(modifier: Modifier = Modifier) {
    val eventos = listOf(
        Evento("Matemáticas", "26 Ago", "08:00", "clase"),
        Evento("Entrega Ensayo Historia", "28 Ago", "23:59", "tarea"),
        Evento("Historia", "29 Ago", "10:00", "clase"),
        Evento("Examen Ciencias", "30 Ago", "14:00", "examen"),
        Evento("Literatura", "2 Sep", "13:00", "clase")
    )

    LazyColumn(
        modifier = modifier
            .background(Color(0xFFF8F9FA))
            .padding(horizontal = 20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(vertical = 24.dp)
    ) {
        item {
            // Mes actual
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = Color.White
                ),
                shape = RoundedCornerShape(16.dp),
                elevation = CardDefaults.cardElevation(defaultElevation = 6.dp)
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "📅 Agosto 2024",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = AppColors.primaryGreen
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "${eventos.size} eventos programados",
                        fontSize = 14.sp,
                        color = Color(0xFF6B7280)
                    )
                }
            }
        }

        item {
            // Estadísticas de eventos
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                val clases = eventos.count { it.tipo == "clase" }
                val tareas = eventos.count { it.tipo == "tarea" }
                val examenes = eventos.count { it.tipo == "examen" }

                EventTypeCard(
                    modifier = Modifier.weight(1f),
                    count = clases,
                    label = "Clases",
                    color = AppColors.primaryGreen,
                    icon = Icons.Filled.School
                )
                EventTypeCard(
                    modifier = Modifier.weight(1f),
                    count = tareas,
                    label = "Tareas",
                    color = Color(0xFFFF9800),
                    icon = Icons.Filled.Assignment
                )
                EventTypeCard(
                    modifier = Modifier.weight(1f),
                    count = examenes,
                    label = "Exámenes",
                    color = Color(0xFFF44336),
                    icon = Icons.Filled.Quiz
                )
            }
        }

        items(eventos) { evento ->
            EventoCard(evento = evento)
        }

        item {
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
fun EventTypeCard(
    modifier: Modifier = Modifier,
    count: Int,
    label: String,
    color: Color,
    icon: ImageVector
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
            modifier = Modifier.padding(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Surface(
                modifier = Modifier.size(32.dp),
                shape = RoundedCornerShape(16.dp),
                color = color.copy(alpha = 0.1f)
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = color,
                    modifier = Modifier.padding(6.dp)
                )
            }
            Text(
                text = count.toString(),
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                color = color
            )
            Text(
                text = label,
                fontSize = 11.sp,
                color = Color(0xFF6B7280)
            )
        }
    }
}

@Composable
fun EventoCard(evento: Evento) {
    val (backgroundColor, accentColor, icon) = when (evento.tipo) {
        "clase" -> Triple(
            Color(0xFFE8F5E8),
            AppColors.primaryGreen,
            Icons.Filled.School
        )
        "tarea" -> Triple(
            Color(0xFFFFF3E0),
            Color(0xFFFF9800),
            Icons.Filled.Assignment
        )
        "examen" -> Triple(
            Color(0xFFFFEBEE),
            Color(0xFFF44336),
            Icons.Filled.Quiz
        )
        else -> Triple(
            Color.White,
            AppColors.textBlack,
            Icons.Filled.Schedule
        )
    }

    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Row(
            modifier = Modifier.padding(20.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Indicador de tipo con icono
            Surface(
                modifier = Modifier.size(48.dp),
                shape = RoundedCornerShape(24.dp),
                color = backgroundColor
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = accentColor,
                    modifier = Modifier.padding(12.dp)
                )
            }

            // Contenido del evento
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = evento.titulo,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = AppColors.textBlack
                )
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = accentColor.copy(alpha = 0.1f)
                ) {
                    Text(
                        text = evento.tipo.uppercase(),
                        fontSize = 10.sp,
                        color = accentColor,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }

            // Fecha y hora
            Column(
                horizontalAlignment = Alignment.End,
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = evento.fecha,
                    fontSize = 14.sp,
                    color = AppColors.textBlack,
                    fontWeight = FontWeight.SemiBold
                )
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(
                        imageVector = Icons.Filled.Schedule,
                        contentDescription = null,
                        tint = Color(0xFF6B7280),
                        modifier = Modifier.size(14.dp)
                    )
                    Text(
                        text = evento.hora,
                        fontSize = 12.sp,
                        color = Color(0xFF6B7280)
                    )
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun CalendarioScreenPreview() {
    CalendarioScreen()
}

@Preview(showBackground = true, name = "Calendario - Vista completa", device = "spec:width=411dp,height=891dp")
@Composable
private fun CalendarioScreenFullPreview() {
    MaterialTheme {
        CalendarioScreen()
    }
}

@Preview(showBackground = true, name = "Evento Cards", widthDp = 380)
@Composable
private fun EventoCardsPreview() {
    MaterialTheme {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            EventoCard(Evento("Matemáticas Aplicadas", "26 Ago", "08:00", "clase"))
            EventoCard(Evento("Entrega Ensayo Historia", "28 Ago", "23:59", "tarea"))
            EventoCard(Evento("Examen Final Ciencias", "30 Ago", "14:00", "examen"))
        }
    }
}

@Preview(showBackground = true, name = "Estadísticas Eventos")
@Composable
private fun EventTypeCardsPreview() {
    MaterialTheme {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            EventTypeCard(
                modifier = Modifier.weight(1f),
                count = 3,
                label = "Clases",
                color = AppColors.primaryGreen,
                icon = Icons.Filled.School
            )
            EventTypeCard(
                modifier = Modifier.weight(1f),
                count = 1,
                label = "Tareas",
                color = Color(0xFFFF9800),
                icon = Icons.Filled.Assignment
            )
            EventTypeCard(
                modifier = Modifier.weight(1f),
                count = 1,
                label = "Exámenes",
                color = Color(0xFFF44336),
                icon = Icons.Filled.Quiz
            )
        }
    }
}

@Preview(showBackground = true, name = "Mes Header")
@Composable
private fun MonthHeaderPreview() {
    MaterialTheme {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color.White
            ),
            shape = RoundedCornerShape(16.dp),
            elevation = CardDefaults.cardElevation(defaultElevation = 6.dp)
        ) {
            Column(
                modifier = Modifier.padding(20.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "📅 Agosto 2024",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = AppColors.primaryGreen
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "5 eventos programados",
                    fontSize = 14.sp,
                    color = Color(0xFF6B7280)
                )
            }
        }
    }
}
