import ListCategoryService from '@modules/categories/services/ListCategoryService';
import { Request, Response } from 'express';
import CategoryRepository from '../../typeorm/repositories/CategoryRepository';

export default class CategoriesController {
  public async Index(_request: Request, response: Response): Promise<Response> {
    const categoriesRepository = new CategoryRepository();
    const categoriesService = new ListCategoryService(categoriesRepository);

    const categories = await categoriesService.execute();

    return response.json(categories);
  }
}
