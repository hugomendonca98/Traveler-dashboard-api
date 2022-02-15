export default interface IUpdatePlaceDTO {
  id: string;
  name: string;
  image?: string;
  description: string;
  city_id: string;
  category_id: string;
  address_id: string;
}
