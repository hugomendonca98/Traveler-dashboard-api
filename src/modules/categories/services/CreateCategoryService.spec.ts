import AppError from '@shared/errors/appError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import CreateCategoryService from './CreateCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let fakeStorageProvider: FakeStorageProvider;
let createCategoryService: CreateCategoryService;

describe('CreateCategory', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createCategoryService = new CreateCategoryService(
      fakeCategoryRepository,
      fakeStorageProvider,
    );
  });

  // Deve ser capaz de criar uma nova categoria.
  it('Should be able to create new category.', async () => {
    const category = await createCategoryService.execute({
      name: 'category name',
      icon: 'iconFileName.jpg',
    });

    expect(category).toHaveProperty('id');
  });

  // Não deve ser possível criar uma nova categoria com o mesmo nome de outra.
  it('Should not be able to create a new category with same name another.', async () => {
    await fakeCategoryRepository.create({
      name: 'category name',
      icon: 'iconFileName.jpg',
    });

    await expect(
      createCategoryService.execute({
        name: 'category name',
        icon: 'iconFileName.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser capaz de criar uma categoria sem icone.
  it('Should not be able to create a category without an icon.', async () => {
    await expect(
      createCategoryService.execute({
        name: 'category name',
        icon: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
