import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ReactNode } from "react";
import { SortableItem } from "./SortableItem";

interface SortableItemType {
    _id: string;
    order: number;
}

interface SortableListProps<T extends SortableItemType> {
    items: T[];
    onReorder: (items: T[]) => void;
    onUpdateOrder?: (id: string, order: number) => Promise<void>;
    children: (item: T) => ReactNode;
    saveOnReorder?: boolean;
}

export function SortableList<T extends SortableItemType>({
    items,
    onReorder,
    onUpdateOrder,
    children,
    saveOnReorder = true,
}: SortableListProps<T>) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item._id === active.id);
            const newIndex = items.findIndex((item) => item._id === over.id);
            const newItems = arrayMove(items, oldIndex, newIndex).map(
                (item, index) => ({
                    ...item,
                    order: index,
                }),
            );
            onReorder(newItems);
            if (saveOnReorder && onUpdateOrder) {
                newItems.forEach((item) => onUpdateOrder(item._id, item.order));
            }
        }
    }

    const sortedItems = [...items].sort((a, b) => a.order - b.order);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={sortedItems.map((item) => item._id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                    {sortedItems.map((item) => (
                        <SortableItem key={item._id} id={item._id}>
                            {children(item)}
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
