import { v4 as uuid } from 'uuid';

import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICategoryRepository from '../ICategoryRepository';

export default class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid() }, data);

    this.categories.push(category);

    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(
      findCategory => findCategory.name === name,
    );

    return category;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = this.categories.find(
      findCategory => findCategory.id === id,
    );

    return category;
  }

  public async findAll(): Promise<Category[]> {
    return this.categories;
  }

  public async save(category: Category): Promise<Category> {
    const findIndex = this.categories.findIndex(
      findCategory => findCategory.id === category.id,
    );

    this.categories[findIndex] = category;

    return category;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.categories.findIndex(
      findCategory => findCategory.id === id,
    );

    this.categories.splice(findIndex, 1);
  }
}
