package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

// ... importaciones necesarias
import androidx.compose.material.icons.filled.SwapHoriz // Icono a usar para VS

data class ProductComparison(
    val name: String,
    val category: String,
    val imageResId: Int? = null
)

@Composable
fun CompareScreen(
    modifier: Modifier = Modifier
) {
    // Datos simulados (deberían ser seleccionables en una app real)
    val product1 = ProductComparison("Spaghetti", "Alimentos", R.drawable.spaghetti)
    val product2 = ProductComparison("Pasta espagueti", "Alimentos", R.drawable.spaghetti)

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 20.dp)
    ) {
        Text(
            "Comparar",
            style = MaterialTheme.typography.headlineLarge.copy(fontWeight = FontWeight.Bold),
            modifier = Modifier.padding(top = 16.dp, bottom = 24.dp)
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically
        ) {
            ProductCard(product = product1, modifier = Modifier.weight(1f))
            
            // Separador VS
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Icon(
                    Icons.Default.SwapHoriz, 
                    contentDescription = "VS", 
                    modifier = Modifier.size(32.dp),
                    tint = Color.Gray
                )
                Text("VS", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = Color.Gray)
            }

            ProductCard(product = product2, modifier = Modifier.weight(1f))
        }
        
        Spacer(Modifier.height(32.dp))

        // Aquí iría la tabla de comparación de valores nutricionales, precios, etc.
        // Se omitirá por simplicidad, pero se indicaría con un Box.
        Card(
             modifier = Modifier.fillMaxWidth().height(200.dp),
             colors = CardDefaults.cardColors(containerColor = Color.White),
             shape = RoundedCornerShape(16.dp),
             elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Detalle de la Comparación (Valores, Precios, etc.)")
            }
        }
    }
}

@Composable
fun RowScope.ProductCard(product: ProductComparison, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier
            .padding(horizontal = 8.dp)
            .height(200.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            // Placeholder de Imagen
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color(0xFFE0F7FA)),
                contentAlignment = Alignment.Center
            ) {
                 // Image(painter = painterResource(id = product.imageResId!!), contentDescription = null)
                 Text("Img", fontSize = 16.sp) // Placeholder simple
            }

            Spacer(Modifier.height(12.dp))

            Text(
                product.name,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp,
                textAlign = TextAlign.Center
            )
            Text(
                product.category,
                fontSize = 14.sp,
                color = Color.Gray
            )
        }
    }
}
