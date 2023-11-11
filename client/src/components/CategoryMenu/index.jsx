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
import { ADD_CATEGORY } from '../../utils/mutations';

const isAdmin = AuthService.checkAdmin();


function CategoryMenu({ isOnSearchPage }) {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;
  const navigate = useNavigate();
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addCategory] = useMutation(ADD_CATEGORY);

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


  return (
    <>
      <div className='link'>
        <button onClick={() => { handleClick('') }}>
          All
        </button>
        {categories.map((item) => (
          <div key={item._id} style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => {
                if (isOnSearchPage) {
                  navigate('/');
                }
                handleClick(item._id);
              }}
              style={{ margin: '10px' }}
            >
              {item.name}
            </button>

            {isAdmin && (
              <>
                <button>
                  del
                </button>
              </>
            )}
          </div>
        ))}

        <Link to="/sales">
          <button>
            Sales
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
