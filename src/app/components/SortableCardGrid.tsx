"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type UniqueIdentifier,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

/* ----------------------------------------
   Sortable Card Wrapper
---------------------------------------- */

type SortableCardProps = {
  id: UniqueIdentifier;
  children: React.ReactNode;
};

function SortableCard({ id, children }: SortableCardProps) {
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

/* ----------------------------------------
   Grid
---------------------------------------- */

type GridItem = {
  id: UniqueIdentifier;
  node: React.ReactNode;
};

type SortableCardGridProps = {
  items: GridItem[];
};

export default function SortableCardGrid({
  items,
}: SortableCardGridProps) {
  const [order, setOrder] = useState<UniqueIdentifier[]>(
    items.map((x) => x.id)
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(
    null
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const activeItem = items.find((x) => x.id === activeId);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);

    if (!over || active.id === over.id) return;

    setOrder((prev) => {
      const from = prev.indexOf(active.id);
      const to = prev.indexOf(over.id);
      return arrayMove(prev, from, to);
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={order}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-3 gap-6">
          {order.map((id) => {
            const block = items.find((x) => x.id === id);
            if (!block) return null;

            return (
              <SortableCard key={id} id={id}>
                {block.node}
              </SortableCard>
            );
          })}
        </div>
      </SortableContext>

      {/* Drag ghost — layout stays frozen */}
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
