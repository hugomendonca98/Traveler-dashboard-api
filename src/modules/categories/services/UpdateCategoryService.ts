import AppError from '@shared/errors/appError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import IUpdateCategoryDTO from '../dtos/IUpdateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

export default class UpdateCategoryService {
  constructor(
    private categoryRepository: ICategoryRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    name,
    icon,
  }: IUpdateCategoryDTO): Promise<Category> {
    if (!icon) {
      throw new AppError('The category icon is requerid.');
    }

    const findCategory = await this.categoryRepository.findById(id);

    if (!findCategory) {
      throw new AppError('The category does not exist.');
    }

    await this.storageProvider.deleteFile(findCategory.icon);

    const fileName = await this.storageProvider.saveFile(icon);

    Object.assign(findCategory, { name, icon: fileName });

    const category = await this.categoryRepository.save(findCategory);

    return category;
  }
}
