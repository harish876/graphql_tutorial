import React, { useState,useRef, useEffect } from 'react';
import { Button, Checkbox, Form, Input,Select } from 'antd';
import { CREATE_USER,UPDATE_USER } from '../Graphql/Mutation';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';
const {Item} = Form
const InputForm = (props) => {
 
    const {data} = props
    data.status = data.status?"true":"false"
    
    const {type}=props
    console.log(data,type)
    const formRef= useRef()
    useEffect(()=>{
      formRef.current.resetFields();
    },[data])
    const [createUser,{error:create_error}] = useMutation(CREATE_USER)
    const [updateUser,{error:update_error}] = useMutation(UPDATE_USER)
    const onFinish = (values) => {
        const {name,email,password,status} = values
        let formattedStatus = status==='true'?true:false
        if(!isEmpty(type) && ['create'].includes(type))
        {
          createUser({
              variables:{
                  name,
                  email,
                  password,
                  status:formattedStatus
              }
          })
      }
      else
      {
          updateUser({
            variables:{
              name,
              email,
              status:formattedStatus
          }
          })
      }
        console.log('Success:', values);
        refreshPage()
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    function refreshPage() {
      window.location.reload(false);
    }
  return (
    <Form
      ref={formRef}
      name="basic"
      labelCol={{span: 8,}}
      wrapperCol={{span: 16,}}
      initialValues={{...data}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Item>

      <Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Item>

      <Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Item>

        <Item label="Select" name="status">
          <Select>
            <Select.Option value="true">Active</Select.Option>
            <Select.Option value="false">Inactive</Select.Option>
          </Select>
        </Item>

      <Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
      </Form>
  );
};
export default InputForm;