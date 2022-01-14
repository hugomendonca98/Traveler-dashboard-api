import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

export default class ListCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();

    return categories;
  }
}
