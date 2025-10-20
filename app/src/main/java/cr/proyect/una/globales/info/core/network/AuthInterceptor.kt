package cr.proyect.una.globales.info.core.network

import okhttp3.Interceptor
import okhttp3.Response
import java.util.concurrent.atomic.AtomicReference

class AuthTokenProvider {
    private val ref = AtomicReference<String?>(null)
    fun set(token: String?) = ref.set(token)
    fun get(): String? = ref.get()
}

class AuthInterceptor(private val provider: AuthTokenProvider) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val original = chain.request()
        val token = provider.get()
        val req = if (!token.isNullOrBlank()) {
            original.newBuilder()
                .addHeader("Authorization", "Bearer $token")
                .build()
        } else original
        return chain.proceed(req)
    }
}