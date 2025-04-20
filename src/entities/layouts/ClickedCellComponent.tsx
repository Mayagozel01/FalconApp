import React, { useState, useMemo } from "react";
import { faCircle,faEdit, faTrashAlt, faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { deleteLayout, updateLayout } from "../../widgets/layouts-manager/layoutsSlice";

interface Header {
  id: string;
  parentId?: string;
  title?: string;
}

interface Cell {
  headerId: string;
  value: string;
}

interface RowState {
  isActive?: boolean;
  unionRow?: boolean;
  veracity?: boolean | null;
  isAllowed?: boolean;
  isShow?: boolean;
  isMark?: boolean;
}

interface RowCell {
  id?: string;
  index?: number | Record<string, number>;
  alt?: string;
  icon?: string | null;
  state?: {
    isAllowed?: boolean;
    veracity?: boolean | null;
  };
  note?: string | null;
  headerId: string;
  value: string;
  units?: string;
  action?: {
    link?: string;
    body?: any;
  };
}

interface Row {
  icon?: string | null;
  state?: RowState;
  id: string;
  index: number;
  parentId?: string | null;
  nesting?: string;
  cells: RowCell[];
  isNew?: boolean;
}

interface Structure {
  rows: Row[];
}

interface Content {
  structure: Structure;
}

interface Layout {
  id: string;
  content: Content;
}

interface LayoutsState {
  layouts: Layout[];
}

const ClickedCellComponent = ({ 
  id: layoutId, 
  cells, 
  onEdit, 
  headers 
}: { 
  id: string; 
  cells: Cell[]; 
  onEdit: () => void; 
  headers: Header[] 
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  console.log(cells)
  const { layouts } = useSelector<any, LayoutsState>((state) => state.layouts);
  
  const firstCell = useMemo(() => {
    if (!layouts || layouts.length === 0) return null;
    const firstLayout = layouts[0];
    if (!firstLayout?.content?.structure?.rows || firstLayout.content.structure.rows.length === 0) return null;
    const firstRow = firstLayout.content.structure.rows[0];
    if (!firstRow.cells || firstRow.cells.length === 0) return null;
    return firstRow.cells[0];
  }, [layouts]);

  const groupedHeaders = useMemo(() => {
    const groups = new Map<string, { parent: Header | null; children: Header[] }>();
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
  }, [headers]);

  const rootCells = cells.filter(cell =>
    !headers.some(header => header.id === cell.headerId)
  );

  const handleDelete = () => layoutId && dispatch(deleteLayout(layoutId));
  const handleSave = (updatedCells: Cell[]) => {
    dispatch(updateLayout({ id: layoutId, cells: updatedCells }));
    setIsEditing(false);
  };

  return (
    <div style={{
      marginTop: "20px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    }}>
 
      <table>
      <tbody>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ 
              padding: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              {/* Иконка */}
              {firstCell.icon && (
                <img 
                  src={firstCell.icon} 
                  alt="icon" 
                  style={{ width: "20px", height: "20px" }}
                />
              )}
              
              {/* Метки для headerId 3, 4, 5 */}
              <div style={{ display: "flex", gap: "5px" }}>
                  <span style={{
                    padding: "2px 5px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "3px",
                    fontSize: "20px"
                  }}>
                    {`${cells[0].value} 
                    ${cells[1].value} 
                    ${cells[2].value}`}
                  </span>
              </div>
              
            
              {firstCell.state?.veracity !== undefined && (
                <FontAwesomeIcon 
                  icon={faCircle} 
                  style={{ 
                    color: firstCell.state?.veracity === true ? "green" : 
                    firstCell.state?.veracity === false ? "red" : "yellow",
                    fontSize: "15px"
                  }} 
                />
              )}
            </td>
          </tr>
          
          <tr>
            <td style={{ 
              padding: "10px",
              textAlign: "center",
              fontStyle: "italic",
              color: "#666"
            }}>
              {firstCell.note || "Нет примечания"}
            </td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {rootCells.length > 0 && (
            <>
              <tr>
                <td colSpan={2} style={{ padding: "8px", borderBottom: "2px solid black" }}>
                  <strong>Общие данные</strong>
                </td>
              </tr>
              {rootCells.map(cell => (
                <tr key={cell.headerId}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {cell.headerId ? `ID: ${cell.headerId}` : "Без заголовка"}
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {cell.value || <span style={{ color: "#999" }}>Пусто</span>}
                  </td>
                </tr>
              ))}
            </>
          )}

          {groupedHeaders.map((group) => (
            <React.Fragment key={group.parent?.id || 'root'}>
              {group.parent && (
                <tr>
                  <td colSpan={2} style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    <div 
                      style={{ 
                        display: "flex", 
                        alignItems: "center",
                        cursor: group.children.length ? "pointer" : "default"
                      }}
                      onClick={() => group.children.length && 
                        setExpandedGroups(prev => ({ 
                          ...prev, [group.parent.id]: !prev[group.parent.id] 
                        }))
                      }
                    >
                      {group.children.length > 0 && (
                        <>
                          <FontAwesomeIcon 
                            icon={expandedGroups[group.parent.id] ? faChevronDown : faChevronRight} 
                            style={{ marginRight: "8px" }}
                          />
                          <strong>{group.parent.title}</strong>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )}

              {cells.filter(cell => cell.headerId === group.parent?.id).map(cell => (
                <tr key={cell.headerId}>
                  <td style={{ padding: "8px 8px 8px 28px", borderBottom: "1px solid #eee", width: "40%" }}>
                    {group.parent?.title}
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {cell.value || <span style={{ color: "#999" }}>Пусто</span>}
                  </td>
                </tr>
              ))}

              {group.children.length > 0 && expandedGroups[group.parent?.id] &&
                group.children.map(childHeader => {
                  const cell = cells.find(c => c.headerId === childHeader.id);
                  return cell ? (
                    <tr key={childHeader.id}>
                      <td style={{ padding: "8px 8px 8px 28px", borderBottom: "1px solid #eee", width: "40%" }}>
                        {childHeader.title}
                      </td>
                      <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                        {cell.value || <span style={{ color: "#999" }}>Пусто</span>}
                      </td>
                    </tr>
                  ) : null;
                })
              }
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setIsEditing(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#1890ff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
          Редактировать
        </button>

        <button
          onClick={handleDelete}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
          Удалить слой
        </button>
      </div>
    </div>
  );
};

export default ClickedCellComponent;