import { memo } from "react";

type TableHeaderProps = {
  groupedHeaders: any[];
};

export const TableHeader = memo(({ groupedHeaders }: TableHeaderProps) => (
  <thead>
    <tr>
      {groupedHeaders.map((group, index) => (
        <th
          key={`parent-${index}`}
          colSpan={group.children.length || 1}
          rowSpan={group.children.length === 0 ? 2 : 1}
          className="text-center m-0 p-0"
        >
          {group.parent?.title || "No Parent"}
        </th>
      ))}
    </tr>
    {groupedHeaders.some((group) => group.children.length > 0) && (
      <tr>
        {groupedHeaders.map((group) =>
          group.children.length > 0
            ? group.children.map((child) => (
                <th key={`child-${child.id}`} className="text-center childCol">
                  {child.title}
                </th>
              ))
            : null
        )}
      </tr>
    )}
  </thead>
));
