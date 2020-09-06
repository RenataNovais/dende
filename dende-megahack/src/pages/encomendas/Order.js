import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useHistory, Link } from 'react-router-dom';
import ProductInput from '../../components/ProductInput';
import Header from '../../components/Header';
import Button from 'react-bootstrap/esm/Button';
import { scheduleIt, clearProduct } from '../../redux/actions';

function Order(props) {
  const history = useHistory();
  const { productList, registerOrder, clearProducts, clients } = props;

  const [client, setClient] = useState();
  const [date, setDate] = useState();
  const [delivery, setDelivery] = useState();
  const [details, setDetails] = useState();
  const [disableByClients, setDisableByClients] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(true);

  const dropdownClients = (param) => {
    return (
      <Form.Control as="select" title="Clientes" onChange={(e) => {setClient(e.target.value); noClientsDisable()}}>
        <option value="">Clientes</option>
        {param.map((client, i) => <option key={i} value={client.name}>{client.name}</option>)}
      </Form.Control>
    );
  }

  const noClientsDisable = () => {
    if (client !== '') {
      setDisableByClients(!disableByClients);
    }
  }

  useEffect(() => {
    if (client !== '' && productList.length > 0 && date && delivery) {
      setButtonDisable(false);
    }
  })

  return (
    <div>
      <Header />
      <h3>Agendar Encomenda</h3>
      <div>
        <Form className="form-container">
          {clients.length > 0 ? dropdownClients(clients) :
            <Link to="/add-client"><Button className="button-verde">Adicionar Cliente</Button></Link>
          }
          <ProductInput name="Produto" qtde="Qtde" client={client} />
          {(productList.length > 0) ? (
            <div>
              {productList.map((product, i) => i > 0 && i < 1 ? <ProductInput name={product.product} qtde={product.quantity} /> : <ProductInput name="Produto" qtde="Quantidade" /> )}
            </div>
          ): false}
          <Form.Row className="select-row">
            <Form.Group>
              <Form.Label>Prazo</Form.Label>
              <Form.Control type="date" onChange={(e) => setDate(e.target.value)} disabled={disableByClients} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Escolha a opção de entrega</Form.Label>
              <Form.Control as="select" onChange={(e) => setDelivery(e.target.value)} disabled={disableByClients}>
                <option value="">Selecione</option>
                <option value="entregar">Entregar</option>
                <option value="buscar">Buscar</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Mais Informações</Form.Label>
            <Form.Control as="textarea" rows="4" placeholder="Detalhes ou mais informações" onChange={(e) => setDetails(e.target.value)} disabled={disableByClients} />
          </Form.Group>
          <Button className="button-verde" disabled={buttonDisable} onClick={() => {
            registerOrder(productList, client, date, delivery, details)
            history.push('/encomendas');
            clearProducts();
          }}>
            Agendar
          </Button>
        </Form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  productList: state.orderReducer.products,
  clients: state.clientsReducer.clients,
})

const mapDispatchToProps = (dispatch) => ({
  registerOrder: (productList, client, date, delivery, details) => dispatch(scheduleIt(productList, client, date, delivery, details)),
  clearProducts: () => dispatch(clearProduct()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Order);
