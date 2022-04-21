export default interface ICreateDepositionDTO {
  name: string;
  avatar: string | undefined;
  description: string;
  stars: number;
  city_id: string;
  place_id: string;
}
