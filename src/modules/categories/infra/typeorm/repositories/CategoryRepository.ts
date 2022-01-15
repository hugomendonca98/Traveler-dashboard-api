import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import { getRepository, Repository } from 'typeorm';
import Category from '../entities/Category';

export default class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({ name, icon }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name,
      icon,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async findAll(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { id },
    });

    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.ormRepository.findOne({
      where: { name },
    });

    return category;
  }

  public async delete(category: Category): Promise<void> {
    await this.ormRepository.delete(category);
  }

  public async save(category: Category): Promise<Category> {
    const categorySaved = await this.ormRepository.save(category);

    return categorySaved;
  }
}
