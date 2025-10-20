package cr.proyect.una.globales.info.core.network

import com.squareup.moshi.Moshi
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import java.util.concurrent.TimeUnit

object NetworkModule {
    // Se toma del BuildConfig si está disponible; si no, usa un fallback seguro
    val baseUrl: String by lazy {
        try {
            val clazz = Class.forName("cr.proyect.una.globales.info.BuildConfig")
            val field = clazz.getField("BASE_URL")
            (field.get(null) as? String)?.takeIf { it.isNotBlank() } ?: "https://backend-homestock.onrender.com/"
        } catch (_: Throwable) {
            "https://backend-homestock.onrender.com/"
        }
    }

    fun client(vararg extraInterceptors: Interceptor): OkHttpClient {
        val logging = HttpLoggingInterceptor().apply { level = HttpLoggingInterceptor.Level.BODY }
        return OkHttpClient.Builder()
            .connectTimeout(20, TimeUnit.SECONDS)
            .readTimeout(20, TimeUnit.SECONDS)
            .writeTimeout(20, TimeUnit.SECONDS)
            .apply { extraInterceptors.forEach { addInterceptor(it) } }
            .addInterceptor(logging)
            .build()
    }

    fun retrofit(client: OkHttpClient): Retrofit {
        val moshi = Moshi.Builder().build()
        return Retrofit.Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .client(client)
            .build()
    }
}