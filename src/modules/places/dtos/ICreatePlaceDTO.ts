export default interface ICreatePlaceDTO {
  name: string;
  image?: string;
  description: string;
  total_depositions_stars: number;
  number_depositions: number;
  city_id: string;
  category_id: string;
  address_id: string;
}
