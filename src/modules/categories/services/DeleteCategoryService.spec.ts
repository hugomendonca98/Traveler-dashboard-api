import AppError from '@shared/errors/appError';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import DeleteCategoryService from './DeleteCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let deleteCategoryService: DeleteCategoryService;

describe('DeleteCategory', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    deleteCategoryService = new DeleteCategoryService(fakeCategoryRepository);
  });

  // Deve ser capaz de excluir a categoria.
  it('Should be able to delete category.', async () => {
    const category = await fakeCategoryRepository.create({
      name: 'category name',
      icon: 'icon name',
    });

    await deleteCategoryService.execute(category.id);

    const searchDeletedCategory = await fakeCategoryRepository.findById(
      category.id,
    );

    expect(searchDeletedCategory).toEqual(undefined);
  });

  // Não deve ser possível excluir uma categoria com um id inexistente.
  it('Should not be possible to delete a category with a non-existent id.', async () => {
    await expect(
      deleteCategoryService.execute('invalid id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
