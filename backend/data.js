import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      // ADMIN
      name: 'Sidra',
      email: 'admin@exmple.com',
      // encrypt pasasword
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      // USER
      name: 'Ahmad',
      email: 'user@exmple.com',
      // encrypt pasasword
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      //_id assign automatically by mongodb
      //_id: '1',
      name: 'Light shade Cups',
      p_key: 'cups',
      category: 'Crockery',
      image: '/images/p1.jpg',
      price: 350,
      countInStock: 0,
      brand: 'Cups',
      rating: 4.5,
      numreviews: 10,
      description: 'high quality cup',
    },
    {
      // _id: '2',
      name: 'Sillk Ties',
      p_key: 'hair_Acc',
      category: 'Hair Accessory',
      image: '/images/p2.jpg',
      price: 100,
      countInStock: 10,
      brand: 'Hairy',
      rating: 3,
      numreviews: 7,
      description: 'high quality clips',
    },
    {
      //_id: '3',
      name: 'Painting',
      p_key: 'Art',
      category: 'Art',
      image: '/images/p3.jpg',
      price: 500,
      countInStock: 7,
      brand: 'Arts',
      rating: 4,
      numreviews: 24,
      description: 'high quality painting',
    },
    {
      //_id: '4',
      name: 'Vase',
      p_key: 'vase',
      category: 'Vase',
      image: '/images/p4.jpg',
      price: 1000, //679px * 829px
      countInStock: 30,
      brand: 'vase',
      rating: 3.5,
      numreviews: 18,
      description: 'high quality stuff',
    },
  ],
};
export default data;
