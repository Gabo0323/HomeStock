package cr.proyect.una.globales.info.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import cr.proyect.una.globales.info.domain.model.Product
import cr.proyect.una.globales.info.domain.use_case.AddProductUseCase
import cr.proyect.una.globales.info.domain.use_case.DeleteProductUseCase
import cr.proyect.una.globales.info.domain.use_case.GetProductsUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProductViewModel @Inject constructor(
    private val addProductUseCase: AddProductUseCase,
    private val getProductsUseCase: GetProductsUseCase,
    private val deleteProductUseCase: DeleteProductUseCase
) : ViewModel() {

    private val _products = MutableStateFlow<List<Product>>(emptyList())
    val products: StateFlow<List<Product>> = _products

    init {
        loadProducts()
    }

    private fun loadProducts() {
        viewModelScope.launch {
            _products.value = getProductsUseCase()
        }
    }

    fun addProduct(product: Product) {
        viewModelScope.launch {
            addProductUseCase(product)
            loadProducts()
        }
    }

    fun deleteProduct(productId: String) {
        viewModelScope.launch {
            deleteProductUseCase(productId)
            loadProducts()
        }
    }
}
