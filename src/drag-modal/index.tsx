import { DndContext } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import type { Coordinates } from '@dnd-kit/utilities';
import * as React from 'react';
import type { ModalProps } from '../modal';
import type { RequireKeys } from '../types';
import BaseModal from './BaseModal';

export type DragModalProps = RequireKeys<ModalProps, 'title'>;

const defaultCoordinates: Coordinates = { x: 0, y: 0 };

function DragModal(props: DragModalProps) {
  const [{ x, y }, setCoordinates] = React.useState<Coordinates>(defaultCoordinates);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCoordinates(defaultCoordinates);
    }
    props.afterOpenChange?.(open);
  };

  return (
    <DndContext
      modifiers={[restrictToWindowEdges]}
      onDragEnd={({ delta }) =>
        setCoordinates(({ x, y }) => ({
          x: x + delta.x,
          y: y + delta.y,
        }))
      }
    >
      <BaseModal {...props} afterOpenChange={handleOpenChange} offsetX={x} offsetY={y} />
    </DndContext>
  );
}

export default DragModal;
