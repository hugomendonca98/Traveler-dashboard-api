import AppError from '@shared/errors/appError';
import ICategoryRepository from '../repositories/ICategoryRepository';

export default class DeleteCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute(id: string): Promise<void> {
    const findCategoryToDelete = await this.categoryRepository.findById(id);

    if (!findCategoryToDelete) {
      throw new AppError('the category does not exist.');
    }

    await this.categoryRepository.delete(id);
  }
}
