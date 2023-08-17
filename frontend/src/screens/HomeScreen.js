import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import CategoryCard from '../components/CategoryCard';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../actions/productActions';

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const categories = [
    {
      id: 1,
      iconSrc:
        'https://cdnprod.mafretailproxy.com/assets/images/Best_Deals_EN_2x_e8c999f7bd.png',
      title: 'Best Deals',
    },
    {
      id: 2,
      iconSrc:
        'https://cdnprod.mafretailproxy.com/assets/images/3_Fruits_and_Vegetable_3d4bb7ebf0.png',
      title: 'Fruits & Vegetables',
    },
    {
      id: 3,
      iconSrc:
        'https://cdnprod.mafretailproxy.com/assets/images/4_Meat_and_Poultry_75f53eba5c.png',
      title: 'Meat & Poultry',
    },
    {
      id: 4,
      iconSrc:
        'https://cdnprod.mafretailproxy.com/assets/images/5_Dairy_and_Eggs_94e4027d93.png',
      title: 'Dairy & Eggs',
    },
    {
      id: 5,
      iconSrc:
        'https://cdnprod.mafretailproxy.com/assets/images/7_Cooking_Ingredients_49a59a92c4.png',
      title: 'Cooking Essentials',
    },
    {
      id: 6,
      iconSrc:
        'https://cdnprod.mafretailproxy.com/assets/images/6_Rice_Pulses_and_Pasta_5aae2c4170.png',
      title: 'Rice & Pasta',
    },
    // {
    //     id: 7,
    //     iconSrc:
    //       'https://cdnprod.mafretailproxy.com/assets/images/9_Frozen_Food_68d047637c.png',
    //     title: 'Frozen Food',
    //   },
    //   {
    //     id: 8,
    //     iconSrc:
    //       'https://cdnprod.mafretailproxy.com/assets/images/16_Home_and_Garden_e078cf8ff5.png',
    //     title: 'Home & Garden',
    //   },
    //   {
    //     id: 9,
    //     iconSrc:
    //       'https://cdnprod.mafretailproxy.com/assets/images/15_Smartphones_and_Electronics_7b54200566.png',
    //     title: 'Mobiles & Electronics',
    //   },
    //   {
    //     id: 10,
    //     iconSrc:
    //       'https://cdnprod.mafretailproxy.com/assets/images/14_Appliances_5dedf63667.png',
    //     title: 'Appliances',
    //   },
    //   {
    //     id:11,
    //     iconSrc:
    //       'https://cdnprod.mafretailproxy.com/assets/images/13_Baby_Care_48174bb941.png',
    //     title: 'Baby Products',
    //   },
    //   {
    //     id: 12,
    //     iconSrc:
    //       'https://cdnprod.mafretailproxy.com/assets/images/11_Cleaning_and_Household_13916df221.png',
    //     title: 'Cleaning & Laundry',
    //   },
    // Add more categories as needed
  ];

  return (
    <div>
      {!keyword && <ProductCarousel />}

      <h1 className='text-capitalize'>Categories: </h1>

      <Row>
        {categories.map((category) => (
          <Col xs={6} sm={4} md={3} xl={2}>
            <CategoryCard
              iconSrc={category.iconSrc}
              title={category.title}
            />
          </Col>
        ))}
      </Row>
      <div style={{width:'100%', height:'1px', backgroundColor:'grey', marginTop:'10px',marginBottom:'10px'}}></div>

      <h1 className='text-capitalize'>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Paginate
            page={page}
            pages={pages}
            keyword={keyword}
          />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
