import AppError from '@shared/errors/appError';
import IUpdateCategoryDTO from '../dtos/IUpdateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

export default class UpdateCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute({
    id,
    name,
    icon,
  }: IUpdateCategoryDTO): Promise<Category> {
    const findCategory = await this.categoryRepository.findById(id);

    if (!findCategory) {
      throw new AppError('The category does not exist.');
    }

    Object.assign(findCategory, { name, icon });

    const category = await this.categoryRepository.save(findCategory);

    return category;
  }
}
