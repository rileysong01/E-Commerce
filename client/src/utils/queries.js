import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($categoryID: ID, $priceSortOrder: String) {
    products(categoryID: $categoryID, priceSortOrder: $priceSortOrder) {
      _id
      name
      author
      description
      image
      quantity
      price
      category{
        _id
        name
      }
      sale
      tags
      dateAdded
    }
  }
`;

export const QUERY_SALES = gql`
query Query($categoryID: [ID], $priceSortOrder: String) {
  getSales(categoryID: $categoryID, priceSortOrder: $priceSortOrder) {
    _id
    author
    dateAdded
    description
    image
    name
    price
    quantity
    category {
      _id
      name
    }
    tags
  }
}`;


export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    allProducts {
      _id
      name
      author
      description
      image
      quantity
      price
      category{
        _id
        name
      }
      tags
      sale
      dateAdded
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
        shipped
        completed
      }
    }
  }
`;

export const QUERY_ORDERS = gql`
  query viewOrders($shipped: Boolean, $completed: Boolean) {
    viewOrders(shipped: $shipped, completed: $completed) {
      _id
      purchaseDate
      products {
        name
        _id
        author
        price
      }
      shipped
      completed
    }
  }  
`
export const QUERY_SEARCH_PRODUCTS = gql`
query searchProducts($searchQuery: String!) {
  searchProducts(searchQuery: $searchQuery) {
    _id
    name
    author
    description
    image
    quantity
    price
    category {
      _id
      name
    }
    tags
    sale
    salePrice
    dateAdded
  }
}
`