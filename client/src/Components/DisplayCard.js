import React,{useState,useEffect} from 'react'
import { Card, Col, Row, Tag} from 'antd';
import { LOAD_USERS } from '../Graphql/Queries';
import {useQuery} from '@apollo/client'

const DisplayCard=()=>{

  const [users,setUsers]= useState([])
  const {error,loading,data} = useQuery(LOAD_USERS)
  useEffect(()=>{
    console.log(data,error,loading)
    const responseData = data? data.getAllUsers:[]
    setUsers(responseData)
  },[data])

  const getStatus=(status)=>{
      return status?<Tag color="#87d068">active</Tag>:<Tag color="#f50">inactive</Tag>
  }
  return(
    <div className="site-card-wrapper">
    <Row gutter={16}>
      {
        users && users.map(({name,email,status})=>{
        return(
          <Col span={8} style={{paddingBottom:'10px'}}>
            <Card title={name} bordered={false}>
              <p>{name}</p>
              <p>{email}</p>
              {getStatus(status)}
            </Card>
          </Col>)
        })}
    </Row>
  </div>
  );
}
export default DisplayCard; 