
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
//stripe require a valid key
const { AuthenticationError } = require('apollo-server-express')


const resolvers = {
  Query: {
    // get all sale items // no auth
    getSales: async (parent, { categoryID, priceSortOrder }) => {

      try {
        const sortOptions = {};

        if (priceSortOrder === 'priceLowToHigh') {
          sortOptions.price = 1;
        } else if (priceSortOrder === 'priceHighToLow') {
          sortOptions.price = -1;
        }

        let query = { sale: true };

        if (categoryID && categoryID.length > 0) {
          query.category = { $in: categoryID };
        }

        const products = await Product.find(query)
          .populate('category')
          .sort(sortOptions);

        return products;
      } catch (error) {
        throw new Error('Error fetching products by category');
      }
    },

    // search for product via query // no auth
    searchProducts: async (parent, { searchQuery, priceSortOrder }) => {
      const query = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
          { tags: { $regex: searchQuery, $options: 'i' } }
        ]
      };
      const sortOptions = {}

      if (priceSortOrder === 'priceLowToHigh') {
        sortOptions.price = 1;
      } else if (priceSortOrder === 'priceHighToLow') {
        sortOptions.price = -1;
      }
    
      return Product.find(query).populate('category').sort(sortOptions);
    },

    // get all products for a category // no auth
    categories: async () => {
      return await Category.find();
    },

    allProducts: async () => {
      try {
        const products = await Product.find().populate('category');
        return products;
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },

    products: async (parent, { categoryID, priceSortOrder }) => {
      try {
        const sortOptions = {};

        if (priceSortOrder === 'priceLowToHigh') {
          sortOptions.price = 1;
        } else if (priceSortOrder === 'priceHighToLow') {
          sortOptions.price = -1;
        }

        let query = { category: categoryID };

        if (!categoryID) {
          query = {};
        }

        const products = await Product.find(query)
          .populate('category')
          .sort(sortOptions);

        return products;
      } catch (error) {
        throw new Error('Error fetching products by category');
      }
    },



    // get product by ID // no auth

    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },

    // get user by id // user auth
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
        .populate({
          path: 'orders',
          populate: {
            path: 'products',
            model: 'Product',
          },
        })

        return user;
      }

      throw AuthenticationError;
    },

    // view all orders // admin auth
    viewOrders: async (parent, { shipped, completed }, context) => {

      if (context.user.admin) {
        try {
          if (shipped) {
            return await Order.find({ shipped: true }).populate('products')
          } else if (completed) {
            return await Order.find({ completed: true }).populate('products')
          } else if (shipped && completed) {
            return await Order.find({ shipped: true, completed: true }).populate('product')
          } else {

            const data = await Order.find().populate('products')
            console.log(data)
            return data
          }

        } catch (err) {
          throw err;
        }
      } else {
        throw AuthenticationError;
      }
    },


    // get orders // user auth
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },

    checkout: async (parent, args, context) => {
      try {
        const url = new URL(context.headers.referer).origin;
        const orderItems = args.products.map(({ _id }) => _id);
        console.log(orderItems)
        const line_items = [];
    
        for (const product of args.products) {
          line_items.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: product.name,
                description: product.description,
                images: [`${url}/images/${product.image}`],
              },
              unit_amount: product.price * 100,
            },
            quantity: product.purchaseQuantity,
          });
        }
    
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}&orderItems=${encodeURIComponent(JSON.stringify(orderItems))}`,
          cancel_url: `${url}/`,
        });

        return { session: session.id, orderItems};
      
      } catch (error) {
        // Handle any errors that occur during the checkout process
        console.error('Checkout error:', error);
        throw new Error('Checkout failed.');
      }
    },
    
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // create and associate new order with a user // user auth
    addOrder: async (parent, args, context) => {
 
      if (context.user) {
        const order = await Order.create({products: args.orderItems})
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order._id }
        });
        return order._id;
      }

      throw AuthenticationError;
    },

    // update user info // user auth
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },


    //update shipped and completed boolean // admin  auth 
    updateOrderShipped: async (parent, { _id, shipped }, context) => {
      if (context.user.admin) {
        try {
          const updatedOrder = await Order.findByIdAndUpdate(_id, { shipped }, { new: true }).populate('products');

          if (!updatedOrder) {
            throw new Error('Order not found');
          }

          return updatedOrder;
        } catch (error) {
          throw new Error('Failed to update the order shipped status');
        }
      } else {
        throw AuthenticationError
      }
    },
    updateOrderCompleted: async (parent, { _id, completed }, context) => {
      if (context.user.admin) {
        try {
          const completedOrder = await Order.findByIdAndUpdate(_id, { completed }, { new: true }).populate('products');

          if (!completedOrder) {
            throw new Error('Order not found');
          }

          return completedOrder;
        } catch (error) {
          throw new Error('Failed to update the order completed status');
        }
      } else {
        throw AuthenticationError
      }
    },

    // add product // admin auth
    addProduct: async (parent, { name, author, description, image, price, quantity, category, tags, sale }, context) => {
      if (context.user.admin) {
        try {
          return await Product.create({
            name,
            author,
            description,
            image,
            price,
            category,
            tags,
            sale,
          })
        } catch (err) {
          throw err;
        }
      } else {
        throw AuthenticationError
      }
    },

    // delete product // admin auth
    deleteProduct: async (parent, { _id }, context) => {
      if (context.user.admin) {
        try {
          const deletedProduct = await Product.findByIdAndRemove(_id)
          if (!deletedProduct) {
            throw new Error('Product not found');
          }
          return deletedProduct;
        } catch (err) {
          throw err;
        }
      } else {
        throw AuthenticationError
      }
    },


    // update product info // admin auth
    updateProduct: async (parent, { _id, name, quantity, description, price, sale, category, tags, salePrice }, context) => {
      if (context.user.admin) {
        try {
          const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            {
              $set: {
                quantity: quantity !== undefined ? quantity : null,
                name: name !== undefined ? name : null,
                description: description !== undefined ? description : null,
                price: price !== undefined ? price : null,
                sale: sale !== undefined ? sale : null,
                tags: tags !== undefined ? tags : null,
                salePrice: salePrice !== undefined ? salePrice : null,
                category: category !== undefined? category: null,
              },
            },
            { new: true }
          );
          if (!updatedProduct) {
            throw new Error('Product not found');
          }

          return updatedProduct;
        } catch (error) {
          throw error;
        }
      } else {
        throw AuthenticationError
      }
    },
    addCategory: async (parent, { name }, context) => {
      if (context.user.admin) {
      try {
        // Create a new category
        const newCategory = await Category.create({ name });

        return newCategory;
      } catch (error) {
        throw new Error(`Error adding category: ${error.message}`);
      }
    } else {
      throw AuthenticationError
    }
    },

    deleteCategory: async (parent, { categoryId }, context) => {
      if (context.user.admin) {
      try {
        // Find the category by ID and remove it
        const deletedCategory = await Category.findByIdAndRemove(categoryId);

        if (!deletedCategory) {
          throw new Error('Category not found');
        }

        return `Category "${deletedCategory.name}" has been deleted successfully.`;
      } catch (error) {
        throw new Error(`Error deleting category: ${error.message}`);
      }
    } else {
      throw AuthenticationError
    }
    },
  }
}



module.exports = resolvers;