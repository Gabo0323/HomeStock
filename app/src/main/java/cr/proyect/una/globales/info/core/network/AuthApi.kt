package cr.proyect.una.globales.info.datasource.remote.api

import cr.proyect.una.globales.info.data.datasource.remote.dto.AuthResponseDto
import cr.proyect.una.globales.info.data.datasource.remote.dto.LoginRequestDto
import cr.proyect.una.globales.info.data.datasource.remote.dto.RegisterRequestDto

import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApi {
    @POST("api/v1/auth/register")
    suspend fun register(@Body body: RegisterRequestDto)

    @POST("api/v1/auth/login")
    suspend fun login(@Body body: LoginRequestDto): AuthResponseDto
}