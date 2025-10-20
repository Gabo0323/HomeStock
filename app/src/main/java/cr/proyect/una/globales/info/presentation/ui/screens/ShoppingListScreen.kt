package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

data class ShoppingListItem(
    val name: String,
    val category: String,
    val isChecked: Boolean = false
)

@Composable
fun ShoppingListScreen(
    onAddItemClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    var searchQuery by remember { mutableStateOf("") }
    var items by remember { 
        mutableStateOf(listOf(
            ShoppingListItem("Baguette", "Alimentos", true),
            ShoppingListItem("Huevos", "Alimentos"),
            ShoppingListItem("Mantequilla", "Lácteos"),
            ShoppingListItem("Papel higiénico", "Lácteos"),
            ShoppingListItem("Yogur", "")
        )) 
    }

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
                // Logo/Título HomeStock
                Row(verticalAlignment = Alignment.CenterVertically) {
                    // Reutilizarías tu logo aquí
                }
                
                // Botón +
                IconButton(onClick = onAddItemClick) {
                    Icon(Icons.Filled.Add, contentDescription = "Agregar a la lista", tint = Color.Black)
                }
            }
        },
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .fillMaxSize()
                .padding(horizontal = 20.dp)
        ) {
            Text(
                "Lista de compras",
                style = MaterialTheme.typography.headlineLarge.copy(fontWeight = FontWeight.Bold),
                modifier = Modifier.padding(vertical = 12.dp)
            )

            // Barra de búsqueda
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                label = { Text("Search") },
                leadingIcon = { Icon(Icons.Filled.Search, contentDescription = null) },
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

            // Lista de elementos
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(items.filter { it.name.contains(searchQuery, ignoreCase = true) }) { item ->
                    ShoppingListItemCard(
                        item = item,
                        onCheckedChange = { isChecked ->
                            // Lógica para actualizar el estado del item
                            items = items.map {
                                if (it.name == item.name) it.copy(isChecked = isChecked) else it
                            }
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun ShoppingListItemCard(item: ShoppingListItem, onCheckedChange: (Boolean) -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(80.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = item.isChecked,
                onCheckedChange = onCheckedChange,
                colors = CheckboxDefaults.colors(checkedColor = Color.Black)
            )

            Spacer(Modifier.width(12.dp))

            Column(Modifier.weight(1f)) {
                Text(
                    item.name,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 16.sp,
                    color = if (item.isChecked) Color.Gray else Color.Black
                )
                if (item.category.isNotBlank()) {
                    Text(
                        item.category,
                        fontSize = 14.sp,
                        color = if (item.isChecked) Color.LightGray else Color.Gray
                    )
                }
            }
        }
    }
}
