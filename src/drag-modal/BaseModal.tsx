import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { DragModalProps } from '.';
import usePrefixCls from '../hooks/usePrefixCls';
import Modal from '../modal';

export interface BaseModalProps extends DragModalProps {
  offsetX?: number;
  offsetY?: number;
}

function BaseModal(props: BaseModalProps) {
  const { modalRender, title, offsetX, offsetY, className, ...resetProps } = props;

  const prefixCls = usePrefixCls('drag-modal', props.prefixCls);

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
      className={`${prefixCls}-content__wrapper`}
    >
      {modalRender?.(rawNode) ?? rawNode}
    </div>
  );

  // Compliance with BEM norms
  const modalCls = [className, isDragging && `${prefixCls}_dragging`].filter(Boolean).join(' ');

  return (
    <Modal
      {...resetProps}
      prefixCls={prefixCls}
      className={modalCls}
      title={
        <div
          {...listeners}
          {...attributes}
          style={{ cursor: 'move' }}
          className={`${prefixCls}-title__inner`}
        >
          {title}
        </div>
      }
      modalRender={mergeModalRender}
    />
  );
}

export default BaseModal;
