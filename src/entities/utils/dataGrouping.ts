import { Header, Row } from "entities/layouts/types/layout";

interface GroupedHeader {
  parent: Header | null;
  children: Header[];
}

export interface GroupedRow extends Row {
  children: GroupedRow[];
}

export const groupHeaders = (headers: Header[]): GroupedHeader[] => {
  const groups = new Map<string, GroupedHeader>();

  headers.forEach((header) => {
    const { id, parentId } = header;

    if (!parentId) {
      const group = groups.get(String(id)) || { parent: null, children: [] };
      group.parent = header;
      groups.set(String(id), group);
    } else {
      const group = groups.get(String(parentId)) || {
        parent: null,
        children: [],
      };
      group.children.push(header);
      groups.set(String(parentId), group);
    }
  });

  return Array.from(groups.values());
};

export const groupRows = (rows: Row[]): GroupedRow[] => {
  const rowMap = new Map<string, GroupedRow>();
  rows.forEach((row) => rowMap.set(String(row.id), { ...row, children: [] }));
  rows.forEach((row) => {
    if (row.parentId && rowMap.has(String(row.parentId))) {
      rowMap
        .get(String(row.parentId))
        .children.push(rowMap.get(String(row.id)));
    }
  });
  return Array.from(rowMap.values()).filter((row) => !row.parentId);
};
