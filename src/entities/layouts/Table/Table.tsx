import { Dispatch } from "@reduxjs/toolkit";
import { useVirtualizer } from "@tanstack/react-virtual";
import { TableHeader } from "entities/layouts/Table/TableHeader";
import { TableParentRow } from "entities/layouts/Table/TableParentRow";
import { Layout } from "entities/layouts/types/layout";
import {
  GroupedRow,
  groupHeaders,
  groupRows,
} from "entities/utils/dataGrouping";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Table as BTable } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addLayout } from "../../../widgets/layouts-manager/layoutsSlice";

type ChildRowsVirtualizedProps = {
  rowChildren: GroupedRow[];
  dispatch: Dispatch<any>;
  onCellClick: (cellData: any) => void;
  headers: any;
};

const ChildRowsVirtualized = React.memo(
  ({ rowChildren, dispatch, onCellClick, headers }: ChildRowsVirtualizedProps) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
      count: rowChildren.length,
      estimateSize: () => 60,
      getScrollElement: () => parentRef.current,
      overscan: 15,
    });

    const handleChildRowClick = useCallback(
      (child) => {
        const cellData = { ...child, name: "ClickedCellComponent", headers };
        dispatch(addLayout(cellData));
        onCellClick(cellData);
      },
      [dispatch, onCellClick, headers]
    );

    return (
      <tr>
        <td colSpan={headers.length} style={{ padding: 0 }}>
        <div
  ref={parentRef}
  style={{
    maxHeight: "240px", 
    overflowY: "auto",
    position: "relative",
    margin: "0",
    padding: "0",
  }}
  className="scroll-container"
>
  <div 
    style={{
      height: `${rowVirtualizer.getTotalSize()}px`,
      position: "relative",
    }}
  >
    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
      const child = rowChildren[virtualRow.index];
      return (
        <div
          key={child.id}
          style={{
            position: "absolute",
            top: 0,
            transform: `translateY(${virtualRow.start}px)`,
            display: "table",
            tableLayout: "fixed",
            width: "100%",
            height: `${virtualRow.size}px`, 
            margin: 0,
            padding: 0,
          }}
        >
          <div style={{ display: "table-row" }}>
            {child.cells.map((cell, idx) => (
              <div
                key={idx}
                style={{
                  display: "table-cell",
                  paddingTop: "8px",
                  border: "1px solid #edf2f9",
                  whiteSpace: "normal",
                  boxSizing: "border-box",
                }}
                className="text-center"
              >
                {String(cell.value)}
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
</div>

        </td>
      </tr>
    );
  }
);

type TableProps = {
  content: Layout["content"];
};

const Table = ({ content }: TableProps) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [clickedCell, setClickedCell] = useState(null);
  const dispatch = useDispatch();
  const headers = content.structure.header;

  const toggleExpanded = useCallback((rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  }, []);

  const handleCellClick = useCallback(
    (cellData) => {
      setClickedCell({
        ...cellData,
        headers,
      });
    },
    [headers]
  );
  console.log(content.structure.rows);
  const groupedHeaders = useMemo(() => groupHeaders(headers), [headers]);
  const groupedRows = useMemo(
    () => groupRows(content.structure.rows),
    [content.structure.rows]
  );

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <BTable bordered responsive>
        <TableHeader groupedHeaders={groupedHeaders} />
          {groupedRows.map((row) => (
            <React.Fragment key={row.id}>
              <TableParentRow
                row={row}
                isExpanded={Boolean(expandedRows[row.id])}
                onToggle={() => toggleExpanded(row.id)}
                colSpan={groupedHeaders.length}
              />
              {expandedRows[row.id] && (
                <ChildRowsVirtualized
                  rowChildren={row.children}
                  dispatch={dispatch}
                  onCellClick={handleCellClick}
                  headers={headers}
                />
              )}
            </React.Fragment>
          ))}
      </BTable>
    </div>
  );
};

export default Table;
