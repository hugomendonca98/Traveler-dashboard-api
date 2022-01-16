import AppError from '@shared/errors/appError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import UpdateCategoryService from './UpdateCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateCategoryService: UpdateCategoryService;

describe('UpdateCategory', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateCategoryService = new UpdateCategoryService(
      fakeCategoryRepository,
      fakeStorageProvider,
    );
  });

  // Deve ser capaz de atualizar a categoria.
  it('Should be able to update category.', async () => {
    const category = await fakeCategoryRepository.create({
      name: 'category name',
      icon: 'category icon',
    });

    const categoryUpdated = await updateCategoryService.execute({
      id: category.id,
      name: 'category updated',
      icon: 'icon updated',
    });

    expect(categoryUpdated.id).toBe(category.id);
    expect(categoryUpdated.name).toBe('category updated');
    expect(categoryUpdated.icon).toBe('icon updated');
  });

  // Não deve ser possível atualizar uma categoria com um id inexistente.
  it('Should not be possible to update a category with a non-existent id.', async () => {
    await expect(
      updateCategoryService.execute({
        id: 'invalid id',
        name: 'category name',
        icon: 'icon name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser possível atualizar uma categoria com uma icon inexistente.
  it('Should not be possible to update a category with a non-existent icon.', async () => {
    const category = await fakeCategoryRepository.create({
      name: 'category name',
      icon: 'categoryicon.jpg',
    });
    await expect(
      updateCategoryService.execute({
        id: category.id,
        name: 'Category name',
        icon: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
