import AppError from '@shared/errors/appError';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import CreateCategoryService from './CreateCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let createCategoryService: CreateCategoryService;

describe('CreateCategory', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    createCategoryService = new CreateCategoryService(fakeCategoryRepository);
  });

  it('Should be able to create new category', async () => {
    const category = await createCategoryService.execute({
      name: 'category name',
      icon: 'icon name',
    });

    expect(category).toHaveProperty('id');
  });

  it('Should not be able to create a new category with same name another', async () => {
    await fakeCategoryRepository.create({
      name: 'category name',
      icon: 'icon name',
    });

    await expect(
      createCategoryService.execute({
        name: 'category name',
        icon: 'icon name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
