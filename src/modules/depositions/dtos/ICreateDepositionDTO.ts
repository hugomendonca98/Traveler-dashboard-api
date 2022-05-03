export default interface ICreateDepositionDTO {
  name: string;
  avatar: string | undefined;
  description: string;
  stars: number;
  moderation_status: 'approved' | 'disapproved' | 'waiting';
  place_id: string;
}
