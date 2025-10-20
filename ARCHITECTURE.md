# Estructura para conexión a backend (Render + PostgreSQL)

Esta estructura prepara el proyecto Android para consumir un API desplegado en Render (la app NO se conecta directo a PostgreSQL; interactúa vía HTTP/HTTPS con el backend).

```
app/src/main/java/cr/proyect/una/globales/info/
├── core/
│   ├── config/        # Configuración de entornos, constantes, endpoints, BuildConfig wrappers
│   ├── di/            # Inyección de dependencias (Hilt/Koin), módulos de network/repositorios
│   ├── network/       # Cliente HTTP (Retrofit/OkHttp), interceptores, serialización, NetworkMonitor
│   └── utils/         # Utilidades compartidas (Result, error mapping, etc.)
│
├── data/
│   ├── datasource/
│   │   ├── local/     # Interfaces y fuentes de datos locales (cache, Room, prefs)
│   │   └── remote/    # Interfaces y fuentes de datos remotas (API calls)
│   │
│   ├── local/
│   │   ├── dao/       # DAOs de Room
│   │   └── db/        # Base de datos y type converters
│   │
│   ├── mapper/        # Mapeos DTO↔domain y entidades locales↔domain
│   └── remote/
│       ├── api/       # Interfaces Retrofit, definiciones de endpoints
│       └── dto/       # DTOs para requests/responses del backend
│
├── domain/            # Ya existente (entidades y contratos de repositorios)
└── presentation/      # Ya existente (UI, navigation, viewmodels)
```

Notas:
- La carpeta `remote/` modela el consumo del backend en Render. Aquí irán las interfaces de API y los DTOs.
- `datasource/remote` y `datasource/local` exponen contratos concretos de obtención de datos, usados por los repositorios.
- `core/network` contendrá cliente HTTP y configuración común (timeouts, interceptores, logging, etc.).
- `core/di` centraliza los módulos de inyección para crear singletons de Retrofit, DAOs, repos y casos de uso.

Siguientes pasos (opcionales):
- Añadir dependencias (Retrofit/OkHttp, Kotlinx Serialization o Moshi, Room, Hilt/Koin).
- Crear `NetworkModule`, `ApiService` y un primer `Repository` que use `RemoteDataSource`.
- Si Render usa HTTPS con certificado propio, configurar `network_security_config` si necesitas permitir cleartext (no recomendado) o pinning.

