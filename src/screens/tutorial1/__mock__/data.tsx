import faker from 'faker';
export const dataUser = () => {
  const imageURL = `https://randomuser.me/portraits/${faker.helpers.randomize([
    'women',
    'man',
  ])}/${faker.datatype.number(60)}.jpg`;
  return [...Array(10).keys()].map(() => ({
    key: faker.datatype.uuid(),
    image: imageURL,
    name: faker.name,
    jobTitle: faker.name.jobTitle,
    email: faker.internet.email,
  }));
};
