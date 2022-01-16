import { Request, Response } from 'express';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import ListCategoryService from '@modules/categories/services/ListCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import CategoryRepository from '../../typeorm/repositories/CategoryRepository';

export default class CategoriesController {
  public async Index(_request: Request, response: Response): Promise<Response> {
    const categoryRepository = new CategoryRepository();
    const listCategoryService = new ListCategoryService(categoryRepository);

    const categories = await listCategoryService.execute();

    return response.json(categories);
  }

  public async Create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const categoryRepository = new CategoryRepository();
    const storageProvider = new DiskStorageProvider();
    const createCategoryService = new CreateCategoryService(
      categoryRepository,
      storageProvider,
    );

    const category = await createCategoryService.execute({
      name,
      icon: request.file?.filename || '',
    });

    return response.json(category);
  }

  public async Delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const categoryRepository = new CategoryRepository();
    const deleteCategoryService = new DeleteCategoryService(categoryRepository);

    await deleteCategoryService.execute(id);

    return response.json({ message: 'Category deleted successfully.' });
  }

  public async Update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const categoryRepository = new CategoryRepository();
    const storageProvider = new DiskStorageProvider();
    const updateCategoryService = new UpdateCategoryService(
      categoryRepository,
      storageProvider,
    );

    const category = await updateCategoryService.execute({
      id,
      name,
      icon: request.file?.filename,
    });

    return response.json(category);
  }
}
