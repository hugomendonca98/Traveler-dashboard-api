import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import ListCategoryService from './ListCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let listCategoryService: ListCategoryService;

describe('ListCategories', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    listCategoryService = new ListCategoryService(fakeCategoryRepository);
  });

  it('Should be able to list all categories.', async () => {
    const category = await fakeCategoryRepository.create({
      name: 'category name',
      icon: 'category icon',
    });

    const categoryTwo = await fakeCategoryRepository.create({
      name: 'categoryTwo name',
      icon: 'categoryTwo icon',
    });

    const categories = await listCategoryService.execute();

    expect(categories).toStrictEqual([category, categoryTwo]);
  });
});
