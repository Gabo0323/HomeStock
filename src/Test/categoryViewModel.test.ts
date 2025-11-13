import { CategoryRemoteDataSource } from "@/data/datasources/categoryRemoteDataSource";
import { CategoryRepositoryImpl } from "@/data/repositories/categoryRepositoryImpl";
import { CreateCategoryUseCase } from "@/domain/useCases/createCategoryUseCase";
import { GetAllCategoriesUseCase } from "@/domain/useCases/getAllCategoriesUseCase";
import { UpdateCategoryUseCase } from "@/domain/useCases/updateCategoryUseCase";
import { DeleteCategoryUseCase } from "@/domain/useCases/deleteCategoryUseCase";
import { CategoryViewModel } from "@/presentation/viewModels/categoryViewModel"
import { CreateCategoryDto, UpdateCategoryDto } from "@/data/dto/categoryDto";

// 🔧 Configuración de dependencias (inyección real)
const remoteDataSource = new CategoryRemoteDataSource();
const repository = new CategoryRepositoryImpl(remoteDataSource);

const getAllCategoriesUseCase = new GetAllCategoriesUseCase(repository);
const createCategoryUseCase = new CreateCategoryUseCase(repository);
const updateCategoryUseCase = new UpdateCategoryUseCase(repository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(repository);

const viewModel = new CategoryViewModel(
  getAllCategoriesUseCase,
  createCategoryUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase
);

// Variables compartidas
let createdCategoryId: number;

describe("🧪 CategoryViewModel Integration Tests", () => {
  it("debería crear una categoría correctamente", async () => {
    const dto: CreateCategoryDto = {
      name: "Categoría Test Jest",
      description: "Creada desde test automatizado",
    };

    await viewModel.createCategory(dto);

    expect(viewModel.category).toBeTruthy();
    expect(viewModel.category?.name).toBe("Categoría Test Jest");
    createdCategoryId = viewModel.category!.id;

    console.log("Categoría creada:", viewModel.category);
  });

  it("debería obtener todas las categorías existentes", async () => {
    await viewModel.getAllCategories();

    expect(Array.isArray(viewModel.categories)).toBe(true);
    expect(viewModel.categories.length).toBeGreaterThan(0);

    console.log("Categorías disponibles:", viewModel.categories.length);
  });

  it("debería actualizar una categoría existente", async () => {
    const updateDto: UpdateCategoryDto = {
      description: "Descripción modificada desde test",
    };

    
    await viewModel.updateCategory(createdCategoryId, updateDto);

    expect(viewModel.category?.description).toBe("Descripción modificada desde test");

    console.log("Categoría actualizada:", viewModel.category);
  });

  it("debería eliminar la categoría correctamente", async () => {
    await viewModel.deleteCategory(createdCategoryId);

    const exists = viewModel.categories.find(
      (c) => c.id === createdCategoryId
    );
    expect(exists).toBeUndefined();

    console.log(`Categoría con ID ${createdCategoryId} eliminada correctamente`);
  });
});
