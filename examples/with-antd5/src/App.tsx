import { Button, Divider, Space, Typography, version } from 'antd';
import type {
  DrawerContentPropsWithEnhanced,
  ModalContentPropsWithEnhanced,
} from 'easy-antd-modal';
import { DragModal, Drawer, EasyAntdModalProvider, Modal } from 'easy-antd-modal';

const ModalContent = ({ enhancedAction }: ModalContentPropsWithEnhanced) => (
  <button type="button" onClick={(event) => enhancedAction?.close('onCancel', event)}>
    Close(ModalContent)
  </button>
);

const DrawerContent = ({ enhancedAction }: DrawerContentPropsWithEnhanced) => (
  <button type="button" onClick={(event) => enhancedAction?.close('onClose', event)}>
    Close(DrawerContent)
  </button>
);

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

    <Divider>Provider</Divider>

    <EasyAntdModalProvider triggerProps="children" contentProps="content">
      <Modal content="I ❤️ antd">
        <Button type="primary">Modal(Provider)</Button>
      </Modal>
      <br />
      <br />
      <Drawer content="I ❤️ antd">
        <Button type="primary">Drawer(Provider)</Button>
      </Drawer>
    </EasyAntdModalProvider>

    <Divider>1.5.0</Divider>
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

    <Divider>1.6.0</Divider>
    <Modal
      trigger={<Button>Open Show ModalContent</Button>}
      onCancel={(event) => console.log('<Modal /> onCancel', { event })}
    >
      <ModalContent />
    </Modal>

    <br />
    <br />

    <Drawer
      trigger={<Button>Open Show DrawerContent</Button>}
      onClose={(event) => console.log('<Drawer /> onClose', { event })}
    >
      <DrawerContent />
    </Drawer>
  </>
);
