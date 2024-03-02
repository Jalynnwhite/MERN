const { User } = require('../models/User'); 
const bcrypt = require('bcrypt');

const resolvers = {
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
        });

        return newUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
