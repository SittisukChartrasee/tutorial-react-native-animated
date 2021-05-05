import faker from 'faker';

// faker.seed(10);

export const config = {
  SPACING: 20,
  AVATAR_SIZE: 70,
};

export const bg =
  'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg';

export const dataUser = [...Array(130).keys()].map(() => ({
  key: faker.datatype.uuid(),
  image: `https://randomuser.me/portraits/${faker.helpers.randomize([
    'women',
    'men',
  ])}/${faker.datatype.number(60)}.jpg`,
  name: faker.name.firstName(faker.datatype.number(60)),
  jobTitle: faker.name.jobTitle(),
  email: faker.internet.email(),
}));
