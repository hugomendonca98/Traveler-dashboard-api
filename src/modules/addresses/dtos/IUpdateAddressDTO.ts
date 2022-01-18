export default interface IUpdateAddressDTO {
  id: string;
  zip_code: string;
  street: string;
  neighborhood: string;
  number: number | null;
}
