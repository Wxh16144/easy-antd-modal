import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import * as React from 'react';
import type { DragModalProps } from '.';
import Modal from '../modal';

export interface BaseModalProps extends DragModalProps {
  offsetX?: number;
  offsetY?: number;
}

function BaseModal(props: BaseModalProps) {
  const {
    modalRender,
    title,
    offsetX,
    offsetY,
    prefixCls: customizePrefixCls,
    className,
    ...resetProps
  } = props;

  const { getPrefixCls } = React.useContext(AntdConfigProvider.ConfigContext);
  const dragModalCls = customizePrefixCls
    ? `${customizePrefixCls}`
    : `easy-${getPrefixCls()}-drag-modal`;

  const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
    id: 'easy-antd-modal-draggable-modal',
  });

  const mergeModalRender: typeof modalRender = (rawNode) => (
    <div
      ref={setNodeRef}
      style={{
        position: 'relative',
        transform: isDragging ? CSS.Transform.toString(transform) : undefined,
        top: offsetY,
        left: offsetX,
      }}
      className={`${dragModalCls}-content__wrapper`}
    >
      {modalRender?.(rawNode) ?? rawNode}
    </div>
  );

  // Compliance with BEM norms
  const modalCls = [className, isDragging && `${dragModalCls}_dragging`].filter(Boolean).join(' ');

  return (
    <Modal
      prefixCls={dragModalCls}
      className={modalCls}
      title={
        <div
          {...listeners}
          {...attributes}
          style={{ cursor: 'move' }}
          className={`${dragModalCls}-title__inner`}
        >
          {title}
        </div>
      }
      modalRender={mergeModalRender}
      {...resetProps}
    />
  );
}

export default BaseModal;
