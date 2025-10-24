
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LoginScreenProps } from '../types/navigation';

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (email && password) {
            // Navegar al inventario después del login
            navigation.navigate('Inventory');
        }
    };

    const handleSwitchToRegister = () => {
        // Aquí puedes añadir lógica para cambiar a registro
        console.log('Cambiar a registro');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoContainer}>
            </View>
            <Text style={styles.title}>Únete a HomeStock</Text>
            <Text style={styles.subtitle}>Crea tu cuenta y comienza tu administración personal</Text>

            <View style={styles.switchContainer}>
                <TouchableOpacity
                    style={[styles.switchButton, styles.activeSwitch]}
                >
                    <Text style={styles.activeSwitchText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSwitchToRegister}
                    style={styles.switchButton}
                >
                    <Text style={styles.inactiveSwitchText}>Registrarse</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Correo electrónico</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="mail" size={20} color="#9CA3AF" style={styles.icon} />
                        <TextInput
                            keyboardType="email-address"
                            placeholder="tucorreo@gmail.com"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={20} color="#9CA3AF" style={styles.icon} />
                        <TextInput
                            secureTextEntry={!showPassword}
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                            <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>O continúa con</Text>
                <View style={styles.divider} />
            </View>

            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <MaterialIcons name="account-circle" size={24} color="#4285F4" />
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                <MaterialIcons name="facebook" size={24} color="#1877F2" />
                    <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        color: '#111827',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        color: '#9CA3AF',
        textAlign: 'center',
        marginBottom: 32,
    },
    switchContainer: {
        flexDirection: 'row',
        marginBottom: 32,
    },
    switchButton: {
        flex: 1,
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderColor: '#E5E7EB',
    },
    activeSwitch: {
        borderColor: '#AC2C2F',
    },
    activeSwitchText: {
        color: '#111827',
        textAlign: 'center',
    },
    inactiveSwitchText: {
        color: '#9CA3AF',
        textAlign: 'center',
    },
    form: {
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        color: '#111827',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 8,
        height: 56,
    },
    icon: {
        marginLeft: 16,
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
    },
    forgotPassword: {
        color: '#AC2C2F',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#111827',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        color: '#9CA3AF',
        fontSize: 14,
        marginHorizontal: 16,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        marginHorizontal: 8,
    },
    socialButtonText: {
        color: '#111827',
    },
});
