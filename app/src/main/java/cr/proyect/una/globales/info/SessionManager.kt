package cr.proyect.una.globales.info

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.dataStore by preferencesDataStore("session_prefs")

object SessionManager {
    private val KEY_LOGGED_IN = booleanPreferencesKey("logged_in")

    fun isLoggedIn(context: Context): Flow<Boolean> =
        context.dataStore.data.map { it[KEY_LOGGED_IN] ?: false }

    suspend fun setLoggedIn(context: Context, value: Boolean) {
        context.dataStore.edit { it[KEY_LOGGED_IN] = value }
    }
}
