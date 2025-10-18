package cr.proyect.una.globales.info.presentation.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.ui.text.input.VisualTransformation

@Composable
fun RegisterScreen(
    onRegisterSuccess: () -> Unit,
    onGoToLogin: () -> Unit,
    onSubmit: (
        email: String,
        password: String,
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) -> Unit = { _, _, onS, _ -> onS() },

    isLoading: Boolean = false
) {
    var email by remember { mutableStateOf("") }
    var pass by remember { mutableStateOf("") }
    var confirmPass by remember { mutableStateOf("") }
    // NUEVO: estado para mostrar/ocultar contraseñas
    var showPassword by remember { mutableStateOf(false) }
    var showConfirmPassword by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf<String?>(null) }

    Scaffold(
        bottomBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Botón principal
                Button(
                    onClick = {
                        val basicValid = email.isNotBlank() &&
                                pass.isNotBlank() &&
                                pass == confirmPass
                        if (basicValid) {
                            onSubmit(
                                email,
                                pass,
                                { onRegisterSuccess() },
                                { msg -> error = msg.ifBlank { "No se pudo registrar" } }
                            )
                        } else {
                            error = "Revisa los campos e intenta nuevamente"
                        }
                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = androidx.compose.ui.graphics.Color.Black,
                        contentColor = androidx.compose.ui.graphics.Color.White
                    ),
                    shape = MaterialTheme.shapes.medium,
                    enabled = !isLoading,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(50.dp)
                ) {
                    if (isLoading) {
                        CircularProgressIndicator(
                            color = MaterialTheme.colorScheme.onPrimary,
                            strokeWidth = 2.dp,
                            modifier = Modifier.size(22.dp)
                        )
                    } else {
                        Text(
                            "Crear Cuenta",
                            fontSize = MaterialTheme.typography.titleMedium.fontSize
                        )
                    }
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Botón de ir al login
                TextButton(onClick = onGoToLogin, enabled = !isLoading) {
                    Text("¿Ya tienes cuenta? Inicia Sesión")
                }
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .padding(24.dp)
                .verticalScroll(rememberScrollState())
                .fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(Modifier.height(16.dp))

            Text("Únete a HomeStock", style = MaterialTheme.typography.titleLarge)
            Text(
                "Crea tu cuenta y comienza tu administración personal",
                style = MaterialTheme.typography.bodyMedium,
                textAlign = TextAlign.Center,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
            )

            Spacer(Modifier.height(24.dp))

            // Correo
            OutlinedTextField(
                value = email,
                onValueChange = { email = it },
                label = { Text("Correo electrónico") },
                placeholder = { Text("tucorreo@gmail.com") },
                leadingIcon = { Icon(imageVector = Icons.Filled.Email, contentDescription = "Correo") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                enabled = !isLoading,
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(Modifier.height(12.dp))

            // Password
            OutlinedTextField(
                value = pass,
                onValueChange = { pass = it },
                label = { Text("Contraseña") },
                leadingIcon = { Icon(imageVector = Icons.Filled.Lock, contentDescription = "Contraseña") },
                trailingIcon = {
                    val visibilityIcon = if (showPassword) Icons.Filled.VisibilityOff else Icons.Filled.Visibility
                    val desc = if (showPassword) "Ocultar contraseña" else "Mostrar contraseña"
                    IconButton(onClick = { showPassword = !showPassword }, enabled = !isLoading) {
                        Icon(imageVector = visibilityIcon, contentDescription = desc)
                    }
                },
                visualTransformation = if (showPassword) VisualTransformation.None else PasswordVisualTransformation(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                enabled = !isLoading,
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(Modifier.height(12.dp))

            // Confirm Password
            OutlinedTextField(
                value = confirmPass,
                onValueChange = { confirmPass = it },
                label = { Text("Confirmar contraseña") },
                leadingIcon = { Icon(imageVector = Icons.Filled.Lock, contentDescription = "Confirmar contraseña") },
                trailingIcon = {
                    val visibilityIcon = if (showConfirmPassword) Icons.Filled.VisibilityOff else Icons.Filled.Visibility
                    val desc = if (showConfirmPassword) "Ocultar contraseña" else "Mostrar contraseña"
                    IconButton(onClick = { showConfirmPassword = !showConfirmPassword }, enabled = !isLoading) {
                        Icon(imageVector = visibilityIcon, contentDescription = desc)
                    }
                },
                visualTransformation = if (showConfirmPassword) VisualTransformation.None else PasswordVisualTransformation(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                enabled = !isLoading,
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(Modifier.height(8.dp))

            if (error != null) {
                Text(text = error!!, color = MaterialTheme.colorScheme.error)
            }
        }
    }
}