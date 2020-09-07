import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Details(props) {
  const { products } = props;
  const history = useHistory();
  let total = 0;
  const [product, setProduct] = useState('');

  useEffect(() => {
    const { indice } = props.match.params;
    setProduct(products[indice]);
  }, []);
  
  function calcCost(quantity, price) {
    const value = quantity * price;
    total = (total + value);
    console.log('oi');
    return value;
  };

  return (
    <React.Fragment>
  
      <Header />
      <React.Fragment>
        <h1>Detalhes do Produto</h1>

        {product !== '' ? (
          <div>
            <p>{product.nameProduct}</p>
            <p>{product.date}</p>
            <div>
              {product.itens.map((item, i) => (
                <div key={i}>
                  {item.item} | {item.quantity} | {item.unity} | {item.price} | {calcCost(item.quantity, item.price)}
                </div>
              ))}
            </div>
            <p>Rendimento: {product.produce}</p>
            <p>Custo total da receita: {total}</p>
          </div>
        ) : <p>Ocorreu algum erro no cadastro do seu produto</p>}
      </React.Fragment>
        <div>
          <h5>Metódo de Cálculo: {product.method} </h5>
          <h5>Preço do produto: {product.productPrice} </h5>
        </div>
      <div>
        <h5>Modo de Preparo</h5>
        {product.prepare}
      </div>
      <Form.Group>
        <Button className="button-verde" type="button" onClick={() => history.push('/fichas-tecnicas')}>
          Voltar
        </Button>
      </Form.Group>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  products: state.registerReducer.allProducts,
})

export default connect(mapStateToProps)(Details);
