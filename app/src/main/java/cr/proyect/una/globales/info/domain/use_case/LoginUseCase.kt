package cr.proyect.una.globales.info.domain.use_case

import cr.proyect.una.globales.info.domain.model.User
import cr.proyect.una.globales.info.domain.repository.UserRepository
import javax.inject.Inject

class LoginUseCase @Inject constructor(
    private val userRepository: UserRepository
) {
    suspend operator fun invoke(email: String, password: String): User? {
        return userRepository.login(email, password)
    }
}
