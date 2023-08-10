import { App, Button, Form, Input, InputNumber } from 'antd';
import type { PropsWithModalEnhanced } from 'easy-antd-modal';
import * as React from 'react';

const ContentForm: React.FC<PropsWithModalEnhanced> = ({ enhancedAction }) => {
  const { message } = App.useApp();
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    globalThis.console.log(JSON.stringify(values, null, 2));
    message.success({
      content: 'Please check the console',
      duration: 1,
      onClose() {
        setLoading(false);
        enhancedAction?.close(); // close the modal after message is closed
      },
    });
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      name="nest-messages"
      onFinish={onFinish}
      initialValues={{
        user: {
          name: 'John Doe',
          age: 26,
        },
      }}
    >
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContentForm;
