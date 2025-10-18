package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import cr.proyect.una.globales.info.R
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.ui.graphics.Color

@Composable
fun LoginScreen(
    onLoginSuccess: () -> Unit,
    onGoToRegister: () -> Unit
) {
    var email by remember { mutableStateOf("") }
    var pass by remember { mutableStateOf("") }
    var error by remember { mutableStateOf<String?>(null) }
    var passVisible by remember { mutableStateOf(false) }

    val canLogin = email.contains("@") && pass.length >= 4

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFFFFFFF))
            .padding(32.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Image(
            painter = painterResource(id = R.drawable.logo),
            contentDescription = "Logo",
            modifier = Modifier.height(200.dp)
        )

        // Mensaje de bienvenida bajo el logo
        Spacer(Modifier.height(16.dp))
        Text(
            text = "Únete a HomeStock",
            style = MaterialTheme.typography.headlineSmall,
            color = Color(0xFF1C1B1F),
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(Modifier.height(6.dp))
        Text(
            text = "Crea tu cuenta y comienza tu administración personal",
            style = MaterialTheme.typography.bodyMedium,
            color = Color(0xFF1C1B1F),
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.height(24.dp))

        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Correo") },
            placeholder = { Text("tucorreo@gmail.com") },
            singleLine = true,
            leadingIcon = { Icon(imageVector = Icons.Filled.Email, contentDescription = "Icono correo") },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Email,
                imeAction = ImeAction.Next
            ),
            colors = TextFieldDefaults.colors(
                focusedIndicatorColor = Color(0xFF6750A4),
                unfocusedIndicatorColor = Color(0xFF808080),
                focusedLabelColor = Color(0xFF6750A4),
                cursorColor = Color(0xFF6750A4)
            ),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.height(12.dp))

        OutlinedTextField(
            value = pass,
            onValueChange = { pass = it },
            label = { Text("Contraseña") },
            singleLine = true,
            leadingIcon = { Icon(imageVector = Icons.Filled.Lock, contentDescription = "Icono candado") },
            visualTransformation = if (passVisible) VisualTransformation.None else PasswordVisualTransformation(),
            trailingIcon = {
                val visibilityIcon = if (passVisible) Icons.Filled.VisibilityOff else Icons.Filled.Visibility
                val description = if (passVisible) "Ocultar contraseña" else "Mostrar contraseña"
                IconButton(onClick = { passVisible = !passVisible }) {
                    Icon(imageVector = visibilityIcon, contentDescription = description)
                }
            },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Password,
                imeAction = ImeAction.Done
            ),
            colors = TextFieldDefaults.colors(
                focusedIndicatorColor = Color(0xFF6750A4),
                unfocusedIndicatorColor = Color(0xFF808080),
                focusedLabelColor = Color(0xFF6750A4),
                cursorColor = Color(0xFF6750A4)
            ),
            modifier = Modifier.fillMaxWidth()
        )

        // Espacio antes de los mensajes de error
        Spacer(Modifier.height(8.dp))

        if (error != null) {
            Spacer(Modifier.height(8.dp))
            Text(text = error!!, color = MaterialTheme.colorScheme.error)
        }

        Spacer(Modifier.height(16.dp))

        Button(
            onClick = {
                if (canLogin) onLoginSuccess() else error = "Verifica tu correo y contraseña"
            },
            enabled = canLogin,
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFF6750A4),
                contentColor = Color(0xFFFFFFFF)
            ),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Iniciar sesión")
        }

        TextButton(onClick = onGoToRegister) { Text("Crear cuenta") }

        Spacer(Modifier.height(24.dp))

        Text(
            text = "Organiza tu compra con inteligencia",
            style = MaterialTheme.typography.bodySmall,
            color = Color(0xFF1C1B1F),
            textAlign = TextAlign.Center
        )
    }
}
