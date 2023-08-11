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
  const titleCls = [
    `${dragModalCls}-title__inner`,
    isDragging && `${dragModalCls}-title__inner_dragging`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Modal
      prefixCls={dragModalCls}
      title={
        <div {...listeners} {...attributes} style={{ cursor: 'move' }} className={titleCls}>
          {title}
        </div>
      }
      modalRender={mergeModalRender}
      {...resetProps}
    />
  );
}

export default BaseModal;
