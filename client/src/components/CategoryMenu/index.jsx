import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import AuthService from '../../utils/auth';
import { Link } from "react-router-dom";
import { ADD_CATEGORY, DELETE_CATEGORY } from '../../utils/mutations';


const isAdmin = AuthService.checkAdmin();


function CategoryMenu({ isOnSearchPage }) {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;
  const navigate = useNavigate();
  const { loading, data: categoryData, refetch } = useQuery(QUERY_CATEGORIES);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addCategory] = useMutation(ADD_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY)

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (categoryID) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: categoryID,
    });
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim() !== '') {
      const { data } = await addCategory({
        variables: {
          name: newCategoryName,
        },
      });
      const newCategory = data.addCategory;

      console.log('New category added:', newCategory);
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: [...categories, newCategory],
      });
      idbPromise('categories', 'put', [...categories, newCategory]);
      setNewCategoryName('');
    }
  };

  const handleDeleteCategory = async (categoryID) => {
  const {data} = await deleteCategory({
    variables: {
      categoryId: categoryID
    }
  })
  console.log('deleted' + data.deleteCategory)
  refetch();
  }

  return (
    <>
      <div className='link'>
      <button onClick={() => { 
        if (isOnSearchPage) {
          navigate('/');
        }
        handleClick('') }}
      style={{
        margin: '10px',
        fontFamily: "'M PLUS Rounded 1c', sans-serif", 
      }}>
          ALL
        </button>
        {categories.map((item) => (
          <button
            key={item._id}
            onClick={() => {
              if (isOnSearchPage) {
                navigate('/');
              }
              handleClick(item._id);
            }}
            style={{
              margin: '10px',
              fontFamily: "'M PLUS Rounded 1c', sans-serif", 
            }}
          >
            {(item.name).toUpperCase()}
            {isAdmin ? (
              <>
              <button  onClick={(e) => {
              e.stopPropagation(); 
              handleDeleteCategory(item._id);}}>
              <i className="fas fa-trash-alt"></i>
              </button>
              </>
            ) : null}
          </button>
        ))}
        <Link to="/sales">
          <button
          style={{
            margin: '10px',
            fontFamily: "'M PLUS Rounded 1c', sans-serif", 
          }}>
            SALES
          </button>
        </Link>
        {isAdmin ? (
          <>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button onClick={handleAddCategory}>
              +
            </button>
          </>
        ) : null}
      </div>
    </>
  );
  
}

export default CategoryMenu;
