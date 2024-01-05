import { Button, Space, Typography, version } from 'antd';
import { DragModal, Drawer, Modal } from 'easy-antd-modal';

export default () => (
  <>
    <Typography.Title level={2}>antd version: {version}</Typography.Title>

    <Modal title="easy-antd-modal" trigger={<Button type="primary">Modal</Button>}>
      I ❤️ antd
    </Modal>

    <br />
    <br />

    <Drawer title="easy-antd-modal" trigger={<Button type="primary">Drawer</Button>}>
      I ❤️ antd
    </Drawer>

    <br />
    <br />

    <DragModal title="easy-antd-modal" trigger={<Button type="primary">DragModal</Button>}>
      I ❤️ antd
    </DragModal>

    <br />
    <br />

    <Button
      danger
      onClick={() => {
        Modal.success({
          title: 'success',
          content: (
            <Space>
              不推荐使用!!!
              <Button type="link" href="https://ant.design/docs/blog/why-not-static-cn">
                为什么?
              </Button>
            </Space>
          ),
          onOk: () => console.log('success'),
        });
      }}
    >
      Static Methods
    </Button>
  </>
);
