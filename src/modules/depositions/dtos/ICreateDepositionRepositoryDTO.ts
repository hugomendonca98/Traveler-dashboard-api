export default interface ICreateDepositionRepositoryDTO {
  name: string;
  avatar: string | undefined;
  description: string;
  stars: number;
  moderation_status: 'approved' | 'disapproved' | 'waiting';
  city_id: string;
  place_id: string;
}
