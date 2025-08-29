package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.School
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Stars
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import cr.proyect.una.globales.info.presentation.ui.theme.AppColors

data class Materia(
    val nombre: String,
    val profesor: String,
    val horario: String,
    val aula: String,
    val creditos: Int
)

@Composable
fun MateriasScreen(modifier: Modifier = Modifier) {
    val materias = listOf(
        Materia("Matemáticas", "Dr. García", "Lun-Mie 8:00-10:00", "Aula 101", 4),
        Materia("Historia", "Prof. Rodríguez", "Mar-Jue 10:00-12:00", "Aula 205", 3),
        Materia("Ciencias", "Dra. López", "Vie 14:00-17:00", "Lab 1", 5),
        Materia("Literatura", "Prof. Martínez", "Lun-Vie 13:00-14:00", "Aula 302", 2)
    )

    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp.dp

    // Ajustar padding según el tamaño de pantalla
    val horizontalPadding = when {
        screenWidth < 360.dp -> 16.dp
        screenWidth < 400.dp -> 18.dp
        else -> 20.dp
    }

    LazyColumn(
        modifier = modifier
            .background(Color(0xFFF8F9FA))
            .padding(horizontal = horizontalPadding),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(vertical = 24.dp)
    ) {
        item {
            // Estadísticas rápidas - responsive
            val arrangement = if (screenWidth < 360.dp) 8.dp else 12.dp
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(arrangement)
            ) {
                StatCard(
                    modifier = Modifier.weight(1f),
                    value = "${materias.size}",
                    label = "Materias",
                    color = Color(0xFF3B82F6)
                )
                StatCard(
                    modifier = Modifier.weight(1f),
                    value = "${materias.sumOf { it.creditos }}",
                    label = "Créditos",
                    color = Color(0xFF10B981)
                )
            }
        }

        items(materias) { materia ->
            MateriaCard(materia = materia)
        }

        item {
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
fun StatCard(
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
fun MateriaCard(materia: Materia) {
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
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Header de la materia
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = materia.nombre,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = AppColors.primaryGreen
                    )
                }
                Surface(
                    shape = RoundedCornerShape(20.dp),
                    color = AppColors.primaryGreen.copy(alpha = 0.1f)
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Stars,
                            contentDescription = null,
                            tint = AppColors.primaryGreen,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = "${materia.creditos} créditos",
                            fontSize = 12.sp,
                            color = AppColors.primaryGreen,
                            fontWeight = FontWeight.Medium
                        )
                    }
                }
            }

            // Detalles de la materia
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                DetailRow(
                    icon = Icons.Filled.Person,
                    label = "Profesor",
                    value = materia.profesor
                )
                DetailRow(
                    icon = Icons.Filled.Schedule,
                    label = "Horario",
                    value = materia.horario
                )
                DetailRow(
                    icon = Icons.Filled.LocationOn,
                    label = "Aula",
                    value = materia.aula
                )
            }
        }
    }
}

@Composable
fun DetailRow(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    value: String
) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Surface(
            modifier = Modifier.size(32.dp),
            shape = RoundedCornerShape(16.dp),
            color = Color(0xFFF3F4F6)
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = Color(0xFF6B7280),
                modifier = Modifier.padding(6.dp)
            )
        }
        Column {
            Text(
                text = label,
                fontSize = 12.sp,
                color = Color(0xFF6B7280),
                fontWeight = FontWeight.Medium
            )
            Text(
                text = value,
                fontSize = 14.sp,
                color = AppColors.textBlack,
                fontWeight = FontWeight.Medium
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun MateriasScreenPreview() {
    MateriasScreen()
}

@Preview(showBackground = true, name = "Materias - Vista completa", device = "spec:width=411dp,height=891dp")
@Composable
private fun MateriasScreenFullPreview() {
    MaterialTheme {
        MateriasScreen()
    }
}

@Preview(showBackground = true, name = "Materia Card", widthDp = 380)
@Composable
private fun MateriaCardPreview() {
    MaterialTheme {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            MateriaCard(
                materia = Materia("Matemáticas Avanzadas", "Dr. García López", "Lun-Mie-Vie 8:00-10:00", "Aula 101", 4)
            )
            MateriaCard(
                materia = Materia("Historia Contemporánea", "Prof. Ana Rodríguez", "Mar-Jue 10:00-12:00", "Aula 205", 3)
            )
        }
    }
}

@Preview(showBackground = true, name = "Estadísticas Cards")
@Composable
private fun StatCardsPreview() {
    MaterialTheme {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            StatCard(
                modifier = Modifier.weight(1f),
                value = "4",
                label = "Materias",
                color = Color(0xFF3B82F6)
            )
            StatCard(
                modifier = Modifier.weight(1f),
                value = "14",
                label = "Créditos",
                color = Color(0xFF10B981)
            )
        }
    }
}