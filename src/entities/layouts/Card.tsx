import {
  faChevronDown,
  faChevronRight,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useMemo, useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addLayout } from "../../widgets/layouts-manager/layoutsSlice";
import Actions from "entities/components/Actions";
import { groupHeaders, groupRows } from "entities/utils/dataGrouping";

const ChildRowsVirtualized = ({ children, dispatch, onCellClick, headers }) => {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: children.length,
    estimateSize: () => 60,
    getScrollElement: () => parentRef.current,
    overscan: 15,
  });

  const handleChildRowClick = useCallback((child) => {
    const cellData = { ...child, name: "ClickedCellComponent", headers };
    dispatch(addLayout(cellData));
    onCellClick(cellData);
  }, [dispatch, onCellClick, headers]);

  return (
    <tbody ref={parentRef}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
        className="w-100"
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const child = children[virtualRow.index];
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
                  {cell.value}
                </td>
              ))}
            </tr>
          );
        })}
      </div>
    </tbody>
  );
};

const Card = ({ content }) => {
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

  const handleCellClick = useCallback((cellData) => {
    setClickedCell({
      ...cellData,
      headers,
    });
  }, [headers]);

  const groupedHeaders = useMemo(() => groupHeaders(headers), [headers]);
  const groupedRows = useMemo(
    () => groupRows(content.structure.rows),
    [content.structure.rows]
  );

  const handleParentRowClick = useCallback((rowId) => {
    toggleExpanded(rowId);
  }, [toggleExpanded]);

  return (
    <div style={{ width: "100%", height: "auto" }} className="">
      <h3>{content.structure.tableName}</h3>
      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead>
          <tr>
            {groupedHeaders.map((group, index) => (
              <th
                key={`parent-${index}`}
                colSpan={group.children.length || 1}
                rowSpan={group.children.length === 0 ? 2 : 1}
                className={`text-center m-0 p-0`}
                style={{ border: "1px solid black" }}
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
                      <th
                        key={`child-${child.id}`}
                        className="text-center childCol"
                        style={{ border: "1px solid black" }}
                      >
                        {child.title}
                      </th>
                    ))
                  : null
              )}
            </tr>
          )}
        </thead>
        <tbody>
          {groupedRows.map((row) => (
            <React.Fragment key={row.id}>
              <tr>
                <td
                  colSpan={groupedHeaders.length}
                  onClick={() => handleParentRowClick(row.id)}
                >
                  {row.children.length > 0 && (
                    <FontAwesomeIcon
                      icon={
                        expandedRows[row.id] ? faChevronDown : faChevronRight
                      }
                    />
                  )}
                  {row.cells[0].value}
                </td>
              </tr>
              {expandedRows[row.id] && (
                <ChildRowsVirtualized
                  children={row.children}
                  dispatch={dispatch}
                  onCellClick={handleCellClick}
                  headers={headers}
                />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Card;