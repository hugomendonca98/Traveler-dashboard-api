export default interface ICreatePlaceDTO {
  name: string;
  image?: string;
  description: string;
  city_id: string;
  category_id: string;
  address_id: string;
  number_depositions: number;
  total_depositions_stars: number;
}
