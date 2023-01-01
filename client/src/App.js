import React,{useState,useEffect} from 'react';
import WebFont from 'webfontloader';
import GraphqlIcon from './img/Graphql.png';
import DisplayCard from './Components/DisplayCard'
import InputForm from './Components/InputForm';
import { PlusOutlined } from '@ant-design/icons';
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
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins']
      }
    });
   }, []);
  return (
    <ApolloProvider client={client}>
    <Layout>
      <Title  style={{display:"flex",alignItems:'center',textAlign:'center' ,fontFamily: 'Poppins',marginLeft:"40%"}}>
        <img  style={{ position:"relative",marginRight:'10px',width:'40px' ,height:'40x'}}src={GraphqlIcon} alt="Graphql Icon"/>
        Graphql App
      </Title>
      <Button size="middle" style={{width:'5%',marginLeft:'10px',alignItems:'center' ,textAlign:'center' ,backgroundColor:"#E10098" ,color:"white"}} onClick={showModal}>
        <PlusOutlined/>
      </Button>
      <Content style={{padding: '10px 10px',}}>
        <div className="site-layout-content">
          <DisplayCard/>
        </div>
      </Content>
      <Modal title="Create User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <InputForm 
          data={{}}
          type={"create"}
        />
      </Modal>
    </Layout>
    </ApolloProvider>
  );
}

export default App;
