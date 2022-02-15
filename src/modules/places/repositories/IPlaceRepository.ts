import ICreatePlaceDTO from '../dtos/ICreatePlaceDTO';
import IFindEqualPlaceDTO from '../dtos/IFindEqualPlaceDTO';
import Place from '../infra/typeorm/entities/Place';

export default interface IPlaceRepository {
  create(data: ICreatePlaceDTO): Promise<Place>;
  findById(id: string): Promise<Place | undefined>;
  findEqualPlace(data: IFindEqualPlaceDTO): Promise<Place | undefined>;
  findAll(): Promise<Place[]>;
  delete(place: Place): Promise<void>;
  findPlaceByCityId(id: string): Promise<Place[]>;
  save(place: Place): Promise<Place>;
}
