import React from 'react';
import { Button, Checkbox, Form, Input,Select } from 'antd';
import { CREATE_USER } from '../Graphql/Mutation';
import { useMutation } from '@apollo/client';
const {Item} = Form
const InputForm = () => {
 
    const [createUser,{error}] = useMutation(CREATE_USER)
    const onFinish = (values) => {
        const {name,email,password,status} = values
        let formattedStatus = status==='true'?true:false
        createUser({
            variables:{
                name,
                email,
                password,
                status:formattedStatus
            }
        })
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <Form.Item
        label="Username"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

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