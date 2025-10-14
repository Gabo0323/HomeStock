package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ExitToApp
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import cr.proyect.una.globales.info.presentation.ui.theme.AppColors
import androidx.compose.ui.platform.LocalConfiguration

@Composable
fun ConfiguracionScreen(
    modifier: Modifier = Modifier,
    onLogout: () -> Unit = {}
) {
    var notificacionesEnabled by remember { mutableStateOf(true) }
    var modoOscuro by remember { mutableStateOf(false) }

    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp.dp

    // Ajustar padding según el tamaño de pantalla
    val horizontalPadding = when {
        screenWidth < 360.dp -> 16.dp
        screenWidth < 400.dp -> 18.dp
        else -> 20.dp
    }

    LazyColumn(
        modifier = modifier  // Este modifier ya incluye el padding del TopAppBar
            .fillMaxSize()
            .background(Color(0xFFF8F9FA))
            .padding(horizontal = horizontalPadding),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(vertical = 24.dp)
    ) {
        item {
            ConfiguracionCard(
                titulo = "Perfil de Usuario",
                icono = Icons.Filled.Person,
                contenido = {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            Surface(
                                modifier = Modifier.size(50.dp),
                                shape = RoundedCornerShape(25.dp),
                                color = AppColors.primaryGreen.copy(alpha = 0.1f)
                            ) {
                                Icon(
                                    imageVector = Icons.Filled.Person,
                                    contentDescription = null,
                                    tint = AppColors.primaryGreen,
                                    modifier = Modifier.padding(12.dp)
                                )
                            }
                            Column {
                                Text(
                                    text = "Estudiante Universidad",
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Medium,
                                    color = AppColors.textBlack
                                )
                                Text(
                                    text = "estudiante@universidad.edu",
                                    fontSize = 14.sp,
                                    color = Color(0xFF6B7280)
                                )
                            }
                        }
                    }
                }
            )
        }

        item {
            ConfiguracionCard(
                titulo = "Notificaciones",
                icono = Icons.Filled.Notifications,
                contenido = {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "Recibir notificaciones",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Medium,
                                color = AppColors.textBlack
                            )
                            Text(
                                text = "Alertas de tareas y eventos",
                                fontSize = 13.sp,
                                color = Color(0xFF6B7280)
                            )
                        }
                        Switch(
                            checked = notificacionesEnabled,
                            onCheckedChange = { notificacionesEnabled = it },
                            colors = SwitchDefaults.colors(
                                checkedThumbColor = Color.White,
                                checkedTrackColor = AppColors.primaryGreen,
                                uncheckedThumbColor = Color.White,
                                uncheckedTrackColor = Color(0xFFE5E7EB)
                            )
                        )
                    }
                }
            )
        }

        item {
            ConfiguracionCard(
                titulo = "Apariencia",
                icono = Icons.Filled.Palette,
                contenido = {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "Modo oscuro",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Medium,
                                color = AppColors.textBlack
                            )
                            Text(
                                text = "Cambiar tema de la aplicación",
                                fontSize = 13.sp,
                                color = Color(0xFF6B7280)
                            )
                        }
                        Switch(
                            checked = modoOscuro,
                            onCheckedChange = { modoOscuro = it },
                            colors = SwitchDefaults.colors(
                                checkedThumbColor = Color.White,
                                checkedTrackColor = AppColors.primaryGreen,
                                uncheckedThumbColor = Color.White,
                                uncheckedTrackColor = Color(0xFFE5E7EB)
                            )
                        )
                    }
                }
            )
        }

        item {
            ConfiguracionCard(
                titulo = "Información de la App",
                icono = Icons.Filled.Info,
                contenido = {
                    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                text = "Versión",
                                fontSize = 14.sp,
                                color = Color(0xFF6B7280)
                            )
                            Text(
                                text = "1.0.0",
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Medium,
                                color = AppColors.textBlack
                            )
                        }
                        HorizontalDivider(color = Color(0xFFE5E7EB), thickness = 1.dp)
                        Text(
                            text = "Aplicación desarrollada para la gestión académica universitaria. Facilita el seguimiento de materias, tareas y calendario académico.",
                            fontSize = 13.sp,
                            color = Color(0xFF6B7280),
                            lineHeight = 18.sp
                        )
                    }
                }
            )
        }

        item {
            Spacer(modifier = Modifier.height(8.dp))

            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = Color(0xFFFEF2F2) // Fondo rojo muy suave
                ),
                shape = RoundedCornerShape(16.dp),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
            ) {
                Button(
                    onClick = { onLogout() },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFFDC2626) // Rojo más profesional
                    ),
                    shape = RoundedCornerShape(12.dp),
                    elevation = ButtonDefaults.buttonElevation(defaultElevation = 4.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ExitToApp,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(20.dp)
                        )
                        Text(
                            text = "Cerrar Sesión",
                            color = Color.White,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Medium
                        )
                    }
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
fun ConfiguracionCard(
    titulo: String,
    icono: ImageVector,
    contenido: @Composable () -> Unit
) {
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
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Surface(
                    modifier = Modifier.size(36.dp),
                    shape = RoundedCornerShape(18.dp),
                    color = AppColors.primaryGreen.copy(alpha = 0.1f)
                ) {
                    Icon(
                        imageVector = icono,
                        contentDescription = null,
                        tint = AppColors.primaryGreen,
                        modifier = Modifier.padding(8.dp)
                    )
                }
                Text(
                    text = titulo,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = AppColors.textBlack
                )
            }
            contenido()
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun ConfiguracionScreenPreview() {
    ConfiguracionScreen()
}

@Preview(showBackground = true, name = "Configuración - Vista completa", device = "spec:width=411dp,height=891dp")
@Composable
private fun ConfiguracionScreenFullPreview() {
    MaterialTheme {
        ConfiguracionScreen()
    }
}

@Preview(showBackground = true, name = "Cards de Configuración", widthDp = 380)
@Composable
private fun ConfiguracionCardsPreview() {
    MaterialTheme {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            ConfiguracionCard(
                titulo = "Perfil de Usuario",
                icono = Icons.Filled.Person,
                contenido = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Surface(
                            modifier = Modifier.size(50.dp),
                            shape = RoundedCornerShape(25.dp),
                            color = AppColors.primaryGreen.copy(alpha = 0.1f)
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Person,
                                contentDescription = null,
                                tint = AppColors.primaryGreen,
                                modifier = Modifier.padding(12.dp)
                            )
                        }
                        Column {
                            Text(
                                text = "Estudiante Universidad",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Medium,
                                color = AppColors.textBlack
                            )
                            Text(
                                text = "estudiante@universidad.edu",
                                fontSize = 14.sp,
                                color = Color(0xFF6B7280)
                            )
                        }
                    }
                }
            )

            ConfiguracionCard(
                titulo = "Notificaciones",
                icono = Icons.Filled.Notifications,
                contenido = {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "Recibir notificaciones",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Medium,
                                color = AppColors.textBlack
                            )
                            Text(
                                text = "Alertas de tareas y eventos",
                                fontSize = 13.sp,
                                color = Color(0xFF6B7280)
                            )
                        }
                        Switch(
                            checked = true,
                            onCheckedChange = { },
                            colors = SwitchDefaults.colors(
                                checkedThumbColor = Color.White,
                                checkedTrackColor = AppColors.primaryGreen
                            )
                        )
                    }
                }
            )
        }
    }
}

@Preview(showBackground = true, name = "Botón Cerrar Sesión")
@Composable
private fun LogoutButtonPreview() {
    MaterialTheme {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color(0xFFFEF2F2)
            ),
            shape = RoundedCornerShape(16.dp),
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
        ) {
            Button(
                onClick = { },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFFDC2626)
                ),
                shape = RoundedCornerShape(12.dp),
                elevation = ButtonDefaults.buttonElevation(defaultElevation = 4.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ExitToApp,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                    Text(
                        text = "Cerrar Sesión",
                        color = Color.White,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }
    }
}

