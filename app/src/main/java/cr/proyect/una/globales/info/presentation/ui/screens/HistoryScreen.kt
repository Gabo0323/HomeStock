package cr.proyect.una.globales.info.presentation.ui.screens


data class HistoryEntry(
    val product: String,
    val category: String,
    val consumptionDate: String,
    val quantity: Int
)

@Composable
fun HistoryScreen(
    modifier: Modifier = Modifier
) {
    val historyData = listOf(
        HistoryEntry("Yogur", "Lácteos", "", 1),
        HistoryEntry("Manzanas", "Alimentos", "11 abr. 2024", 4),
        HistoryEntry("Leche", "Lácteos", "8 abr. 2024", 2),
        // Más datos
    )

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 20.dp)
    ) {
        Text(
            "Historial de consumo",
            style = MaterialTheme.typography.headlineLarge.copy(fontWeight = FontWeight.Bold),
            modifier = Modifier.padding(top = 16.dp, bottom = 12.dp)
        )

        // Selector de rango de fechas
        Card(
            modifier = Modifier.fillMaxWidth().height(60.dp),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFF0F0F0)),
            elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("9 abr. 2024", fontWeight = FontWeight.SemiBold)
                Icon(Icons.Default.ArrowRightAlt, contentDescription = "A", modifier = Modifier.padding(horizontal = 8.dp))
                Text("15 abr. 2024", fontWeight = FontWeight.SemiBold)
            }
        }
        
        Spacer(Modifier.height(16.dp))

        // Encabezados de la lista
        Row(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 4.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("Producto", fontWeight = FontWeight.Medium, color = Color.Gray, fontSize = 14.sp)
            Text("Cantidad consumida", fontWeight = FontWeight.Medium, color = Color.Gray, fontSize = 14.sp)
        }
        
        HorizontalDivider(Modifier.padding(vertical = 8.dp))

        // Lista de Historial
        LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
            items(historyData) { entry ->
                HistoryItemRow(entry = entry)
            }
        }
    }
}

@Composable
fun HistoryItemRow(entry: HistoryEntry) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Column(Modifier.weight(1f)) {
            Text(entry.product, fontWeight = FontWeight.SemiBold, fontSize = 16.sp)
            Text(entry.category, fontSize = 13.sp, color = Color.Gray)
            if (entry.consumptionDate.isNotBlank()) {
                 Text(entry.consumptionDate, fontSize = 13.sp, color = Color.Gray)
            }
        }

        // Barra de Cantidad y número (simulada)
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .width(60.dp)
                    .height(8.dp)
                    .clip(RoundedCornerShape(4.dp))
                    .background(Color(0xFF4CAF50)) // Color de barra
            )
            Spacer(Modifier.width(8.dp))
            Text(entry.quantity.toString(), fontWeight = FontWeight.Bold, fontSize = 16.sp)
        }
    }
    HorizontalDivider(Modifier.padding(top = 8.dp), color = Color(0xFFE0E0E0))
}
