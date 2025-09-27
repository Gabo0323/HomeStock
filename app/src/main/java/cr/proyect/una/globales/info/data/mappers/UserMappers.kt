package cr.proyect.una.globales.info.data.mappers

import cr.proyect.una.globales.info.data.local.entity.UserEntity
import cr.proyect.una.globales.info.domain.model.User

fun UserEntity.toDomainModel() = User(
    id = id,
    name = name,
    email = email
)

fun User.toEntity() = UserEntity(
    id = id!!,
    name = name,
    email = email
)
