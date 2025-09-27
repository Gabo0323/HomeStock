package cr.proyect.una.globales.info.data.mappers

import cr.proyect.una.globales.info.data.local.entity.ProductEntity
import cr.proyect.una.globales.info.domain.model.Product

fun ProductEntity.toDomain(): Product {
    return Product(
        id = id,
        name = name,
        category = category,
        quantity = quantity,
        acquisitionDate = acquisitionDate,
        price = price,
        brand = brand,
        purchaseLocation = purchaseLocation,
        imageUrl = imageUrl
    )
}

fun Product.toEntity(): ProductEntity {
    return ProductEntity(
        id = id,
        name = name,
        category = category,
        quantity = quantity,
        acquisitionDate = acquisitionDate,
        price = price,
        brand = brand,
        purchaseLocation = purchaseLocation,
        imageUrl = imageUrl
    )
}
