package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import cr.proyect.una.globales.info.presentation.navigation.NavRoute
import cr.proyect.una.globales.info.presentation.viewmodel.ProductViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun InventoryScreen(
    navController: NavController,
    productViewModel: ProductViewModel = hiltViewModel()
) {
    val products by productViewModel.products.collectAsState()
    var searchQuery by remember { mutableStateOf("") }
    var expanded by remember { mutableStateOf(false) }
    val sortOptions = listOf("Name", "Price", "Quantity")
    var selectedSortOption by remember { mutableStateOf(sortOptions[0]) }

    Scaffold(
        floatingActionButton = {
            FloatingActionButton(onClick = { navController.navigate(NavRoute.AddProduct.route) }) {
                Icon(Icons.Default.Add, contentDescription = "Add Product")
            }
        }
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(it)
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                TextField(
                    value = searchQuery,
                    onValueChange = { searchQuery = it },
                    label = { Text("Search") },
                    modifier = Modifier.weight(1f),
                    trailingIcon = {
                        if (searchQuery.isNotEmpty()) {
                            IconButton(onClick = { searchQuery = "" }) {
                                Icon(Icons.Default.Clear, contentDescription = "Clear Search")
                            }
                        }
                    }
                )
                Box {
                    ExposedDropdownMenuBox(expanded = expanded, onExpandedChange = { expanded = !expanded }) {
                        TextField(
                            readOnly = true,
                            value = selectedSortOption,
                            onValueChange = {},
                            label = { Text("Sort by") },
                            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
                            modifier = Modifier.menuAnchor()
                        )
                        ExposedDropdownMenu(
                            expanded = expanded,
                            onDismissRequest = { expanded = false }
                        ) {
                            sortOptions.forEach { selectionOption ->
                                DropdownMenuItem(
                                    text = { Text(selectionOption) },
                                    onClick = {
                                        selectedSortOption = selectionOption
                                        expanded = false
                                    }
                                )
                            }
                        }
                    }
                }
            }

            if (products.isEmpty()) {
                Text(text = "No products found")
            } else {
                LazyColumn {
                    val sortedProducts = when (selectedSortOption) {
                        "Name" -> products.sortedBy { it.name }
                        "Price" -> products.sortedBy { it.price }
                        "Quantity" -> products.sortedBy { it.quantity }
                        else -> products
                    }
                    items(sortedProducts.filter { it.name.contains(searchQuery, ignoreCase = true) }) { product ->
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "${product.name} - ${product.price} - ${product.quantity}",
                                modifier = Modifier.weight(1f)
                            )
                            IconButton(onClick = { productViewModel.deleteProduct(product.id!!) }) {
                                Icon(Icons.Default.Delete, contentDescription = "Delete Product")
                            }
                        }
                    }
                }
            }
        }
    }
}
