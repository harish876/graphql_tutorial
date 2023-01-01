import React,{useState,useEffect} from 'react'
import { Card, Col, Row, Tag, Avatar, Typography, Modal} from 'antd';
import { UserOutlined,EditOutlined } from '@ant-design/icons';
import { startCase, isEmpty } from 'lodash'
import { LOAD_USERS } from '../Graphql/Queries';
import {useQuery} from '@apollo/client'
import InputForm from './InputForm';
const { Text }= Typography

const DisplayCard=()=>{

  const [users,setUsers]= useState([])
  const [userDetail,setUserDetail]=useState({})
  const {error,loading,data} = useQuery(LOAD_USERS)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setUserDetail({})
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setUserDetail({})
    setIsModalOpen(false);
  };

  useEffect(()=>{
    console.log(data,error,loading)
    const responseData = !isEmpty(data)? data.getAllUsers:[]
    setUsers(responseData)
  },[data])

  const getStatus=(status)=>{
      return status?<Tag color="#87d068">active</Tag>:<Tag color="#f50">inactive</Tag>
  }
  const getAvatar=(status)=>{
    return status?<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />:<Avatar style={{ backgroundColor: '"#f50"' }} icon={<UserOutlined />} />
  }
  const editCard=(name,email,status,password)=>{
    setUserDetail((prevVal)=> ({...prevVal,name,email,status,password}))
    console.log(userDetail)
    showModal();
  }
  return(
    <div className="site-card-wrapper">
    <Row gutter={16}>
      {
        users && users.map(({name,email,status,password})=>{
        return(
          <Col span={8} style={{paddingBottom:'10px'}}>
            <Card title={startCase(name)} bordered={false} extra={<EditOutlined key="edit" style={{cursor:'pointer'}} onClick={()=>{editCard(name,email,status,password)}}/>}>
              {getAvatar(status)}
              <p><Text strong>Name: </Text>{name}</p>
              <p><Text strong>Email: </Text>{email}</p>
              <p><Text strong>Status: </Text>{getStatus(status)}</p>
              
            </Card>
          </Col>)
        })}
    </Row>
    <Modal title="Update User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <InputForm 
        data={userDetail}
        type={"update"}
        />
      </Modal>
  </div>
  );
}
export default DisplayCard; 