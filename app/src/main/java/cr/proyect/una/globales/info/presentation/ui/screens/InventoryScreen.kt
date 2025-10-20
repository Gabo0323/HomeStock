package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// Define un modelo de datos para el inventario
data class InventoryItem(
    val name: String,
    val category: String,
    val quantity: String,
    val expiryDate: String,
    val imageResId: Int? = null
)

@Composable
fun InventoryScreen(
    onSeeAllTasks: () -> Unit,
    onOpenTask: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    var searchQuery by remember { mutableStateOf("") }
    
    // Datos simulados (deberían venir de un ViewModel)
    val inventoryItems = listOf(
        InventoryItem("Spaghetti", "Alimentos", "2 paquetes", "25 ago"),
        InventoryItem("Leche", "Lácteos", "1 botella", "10 mayo"),
        InventoryItem("Jabón en barra", "Limpieza", "3", "5 jun"),
        InventoryItem("Manzanas", "Alimentos", "6", "20 abr")
    )

    Scaffold(
        modifier = modifier.fillMaxSize(),
        topBar = {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                // Título HomeStock
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text("HomeStock", fontWeight = FontWeight.SemiBold, fontSize = 20.sp)
                }
                
                // Botón +
                IconButton(onClick = onAddItemClick) {
                    Icon(Icons.Default.Add, contentDescription = "Agregar producto", tint = Color.Black)
                }
            }
        },
        // bottomBar = { ... }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .fillMaxSize()
                .padding(horizontal = 20.dp)
        ) {
            Text(
                "Inventario",
                style = MaterialTheme.typography.headlineLarge.copy(fontWeight = FontWeight.Bold),
                modifier = Modifier.padding(vertical = 12.dp)
            )

            // Barra de búsqueda
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                label = { Text("Search") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                singleLine = true,
                shape = RoundedCornerShape(12.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    unfocusedBorderColor = Color.Transparent,
                    focusedBorderColor = Color.Black,
                    unfocusedContainerColor = Color(0xFFF0F0F0),
                    focusedContainerColor = Color.White
                ),
                modifier = Modifier.fillMaxWidth().height(56.dp)
            )

            Spacer(Modifier.height(16.dp))

            // Lista de inventario
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                items(inventoryItems.filter { 
                    it.name.contains(searchQuery, ignoreCase = true) || it.category.contains(searchQuery, ignoreCase = true) 
                }) { item ->
                    InventoryItemCard(item = item, onClick = { onItemClick(item) })
                }
            }
        }
    }
}

@Composable
fun InventoryItemCard(item: InventoryItem, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(90.dp)
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Placeholder de Imagen
            Box(
                modifier = Modifier
                    .size(60.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(Color(0xFFE0F7FA)),
                contentAlignment = Alignment.Center
            ) {
                Text("Img", fontSize = 12.sp) // Placeholder simple
            }

            Spacer(Modifier.width(12.dp))

            // Detalles del Producto
            Column(Modifier.weight(1f)) {
                Text(item.name, fontWeight = FontWeight.SemiBold, fontSize = 16.sp, color = Color.Black)
                Text(item.category, fontSize = 14.sp, color = Color.Gray)
                Text("Cantidad: ${item.quantity}", fontSize = 14.sp, color = Color.DarkGray)
            }

            // Fecha de vencimiento
            Column(horizontalAlignment = Alignment.End) {
                Text("Vence:", fontSize = 12.sp, color = Color.Gray)
                Text(item.expiryDate, fontWeight = FontWeight.Medium, fontSize = 14.sp, color = Color(0xFFDC2626))
            }
        }
    }
}
