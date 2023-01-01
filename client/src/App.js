import React,{useState} from 'react';
import DisplayCard from './Components/DisplayCard'
import InputForm from './Components/InputForm';
import {Layout,theme,Typography,Modal, Button } from 'antd';
import {ApolloClient,
        InMemoryCache,
        ApolloProvider,
        HttpLink,
        from
} 
from "@apollo/client"
import {onError} from '@apollo/client/link/error'

//apollo client
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.log(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({uri:"http://localhost:4000/graphql"})
])
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link:link
})
//antd design
const { Content } = Layout;
const {Title} = Typography
function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <ApolloProvider client={client}>
    <Layout>
      <Title  style={{textAlign:'center'}}>Graphql App</Title>
      <Button size="middle" type="primary" style={{width:'15%',marginLeft:'10px',alignItems:'end'}} onClick={showModal}>
        Create User
      </Button>
      <Content style={{padding: '10px 10px',}}>
        <div
          className="site-layout-content"
          //style={{background: colorBgContainer}}
        >
          <DisplayCard/>
        </div>
      </Content>
      <Modal title="Create User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <InputForm/>
      </Modal>
    </Layout>
    </ApolloProvider>
  );
}

export default App;
