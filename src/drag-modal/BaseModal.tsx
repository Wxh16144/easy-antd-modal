import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { DragModalProps } from '.';
import Modal from '../modal';

export interface BaseModalProps extends DragModalProps {
  offsetX?: number;
  offsetY?: number;
}

function BaseModal(props: BaseModalProps) {
  const { modalRender, title, offsetX, offsetY, ...resetProps } = props;
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
    >
      {modalRender?.(rawNode) ?? rawNode}
    </div>
  );

  return (
    <Modal
      title={
        <div {...listeners} {...attributes} style={{ cursor: 'move' }}>
          {title}
        </div>
      }
      modalRender={mergeModalRender}
      {...resetProps}
    />
  );
}

export default BaseModal;
