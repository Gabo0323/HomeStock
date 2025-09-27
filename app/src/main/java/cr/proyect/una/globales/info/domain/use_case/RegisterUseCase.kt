package cr.proyect.una.globales.info.domain.use_case

import cr.proyect.una.globales.info.domain.model.User
import cr.proyect.una.globales.info.domain.repository.UserRepository
import javax.inject.Inject

class RegisterUseCase @Inject constructor(
    private val userRepository: UserRepository
) {
    suspend operator fun invoke(user: User, password: String): User? {
        return userRepository.register(user, password)
    }
}
