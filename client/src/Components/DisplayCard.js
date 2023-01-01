import React,{useState,useEffect} from 'react'
import { Card, Col, Row, Tag, Avatar, Typography} from 'antd';
import { UserOutlined,EditOutlined } from '@ant-design/icons';
import { startCase, isEmpty } from 'lodash'
import { LOAD_USERS } from '../Graphql/Queries';
import {useQuery} from '@apollo/client'
const { Text }= Typography

const DisplayCard=()=>{

  const [users,setUsers]= useState([])
  const {error,loading,data} = useQuery(LOAD_USERS)
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
  const editCard=()=>{
    console.log("edit")
  }
  return(
    <div className="site-card-wrapper">
    <Row gutter={16}>
      {
        users && users.map(({name,email,status})=>{
        return(
          <Col span={8} style={{paddingBottom:'10px'}}>
            <Card title={startCase(name)} bordered={false} extra={<EditOutlined key="edit" style={{cursor:'pointer'}} onClick={editCard}/>}>
              {getAvatar(status)}
              <p><Text strong>Name: </Text>{name}</p>
              <p><Text strong>Email: </Text>{email}</p>
              <p><Text strong>Status: </Text>{getStatus(status)}</p>
              
            </Card>
          </Col>)
        })}
    </Row>
  </div>
  );
}
export default DisplayCard; 