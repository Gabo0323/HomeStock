package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.SwapHoriz // Icono a usar para VS
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

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
    val product1 = ProductComparison("Spaghetti", "Alimentos")
    val product2 = ProductComparison("Pasta espagueti", "Alimentos")

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

        // Sección de detalles de comparación
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
