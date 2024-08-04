export const generateEmail = (firstName: string, lastName: string) => {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hospital.com`;
};
