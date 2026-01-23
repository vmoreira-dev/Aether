"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

function SortableItem({ id, children }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      {children}
    </div>
  );
}

export default function SortableGrid({ items }: any) {
  const [order, setOrder] = useState(items.map((x: any) => x.id));
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragStart = (event: any) => setActiveId(event.active.id);
  const onDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    setOrder((prev: any) => {
      const oldIndex = prev.indexOf(active.id);
      const newIndex = prev.indexOf(over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const activeItem = items.find((x: any) => x.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <div className="space-y-8">
          {order.map((id: string) => {
            const block = items.find((i: any) => i.id === id);
            return (
              <SortableItem key={id} id={id}>
                {block.node}
              </SortableItem>
            );
          })}
        </div>
      </SortableContext>

      {/* ⬇️ This guy prevents the layout from exploding */}
      <DragOverlay dropAnimation={null}>
        {activeItem ? (
          <div className="opacity-90 scale-[1.02]">
            {activeItem.node}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
