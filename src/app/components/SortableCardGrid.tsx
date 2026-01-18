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
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

function SortableCard({ id, children }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      {children}
    </div>
  );
}

export default function SortableCardGrid({ items }: any) {
  const [order, setOrder] = useState(items.map((x: any) => x.id));
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const activeItem = items.find((x: any) => x.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={(e) => {
        const { active, over } = e;
        setActiveId(null);
        if (!over || active.id === over.id) return;

        setOrder((prev) => {
          const from = prev.indexOf(active.id);
          const to = prev.indexOf(over.id);
          return arrayMove(prev, from, to);
        });
      }}
    >
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-3 gap-6">
          {order.map((id) => {
            const block = items.find((x: any) => x.id === id);
            return (
              <SortableCard key={id} id={id}>
                {block.node}
              </SortableCard>
            );
          })}
        </div>
      </SortableContext>

      {/* drag ghost — layout stays frozen */}
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
