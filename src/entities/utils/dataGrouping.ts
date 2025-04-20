interface Header {
    id: string;
    parentId?: string;
    title: string;
    // Другие свойства заголовка, если есть
  }
  
  interface GroupedHeader {
    parent: Header | null;
    children: Header[];
  }
  
  interface Cell {
    value: any;
    // Другие свойства ячейки, если есть
  }
  
  interface Row {
    id: string;
    parentId?: string;
    cells: Cell[];
    // Другие свойства строки, если есть
  }
  
  interface GroupedRow extends Row {
    children: GroupedRow[];
  }
  
  export const groupHeaders = (headers: Header[]): GroupedHeader[] => {
    const groups = new Map<string, GroupedHeader>();
  
    headers.forEach((header) => {
      const { id, parentId } = header;
  
      if (!parentId) {
        const group = groups.get(id) || { parent: null, children: [] };
        group.parent = header;
        groups.set(id, group);
      } else {
        const group = groups.get(parentId) || { parent: null, children: [] };
        group.children.push(header);
        groups.set(parentId, group);
      }
    });
  
    return Array.from(groups.values());
  };
  
  export const groupRows = (rows: Row[]): GroupedRow[] => {
    const rowMap = new Map<string, GroupedRow>();
    rows.forEach((row) => rowMap.set(row.id, { ...row, children: [] }));
    rows.forEach((row) => {
      if (row.parentId && rowMap.has(row.parentId)) {
        (rowMap.get(row.parentId) as GroupedRow).children.push(rowMap.get(row.id) as GroupedRow);
      }
    });
    return Array.from(rowMap.values()).filter((row) => !row.parentId);
  };