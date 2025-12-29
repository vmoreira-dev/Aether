"use client";

import { Reorder } from "framer-motion";
import { useState } from "react";

export default function DraggableGrid({ children }: { children: any[] }) {
  const [items, setItems] = useState(children);

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="space-y-6"
    >
      {items.map((child, i) => (
        <Reorder.Item
          key={i}
          value={child}
          className="cursor-grab active:cursor-grabbing"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          whileDrag={{ scale: 1.02 }}
        >
          {child}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
