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
  ({
    rowChildren,
    dispatch,
    onCellClick,
    headers,
  }: ChildRowsVirtualizedProps) => {
    const parentRef = useRef(null);

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
      <tbody ref={parentRef} className="virtualized-tbody">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
          className="w-100"
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const child = rowChildren[virtualRow.index];
            return (
              <tr
                key={child.id}
                style={{
                  position: "absolute",
                  top: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                }}
                onClick={() => handleChildRowClick(child)}
                className="virtual-row"
              >
                {child.cells.map((cell, idx) => (
                  <td
                    key={idx}
                    style={{
                      border: "1px solid black",
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                    className="childCol p-2"
                  >
                    {String(cell.value)}
                  </td>
                ))}
              </tr>
            );
          })}
        </div>
      </tbody>
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
        <tbody>
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
        </tbody>
      </BTable>
    </div>
  );
};

export default Table;
