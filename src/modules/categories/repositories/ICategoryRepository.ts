import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | undefined>;
  findById(id: string): Promise<Category | undefined>;
  save(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
}
