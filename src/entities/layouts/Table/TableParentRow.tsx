import { GroupedRow } from "entities/utils/dataGrouping";
import { memo } from "react";
import { Accordion } from "react-bootstrap";

type TableParentRowProps = {
  row: GroupedRow;
  isExpanded: boolean;
  onToggle: (rowId: any) => void;
  colSpan: number;
};

export const TableParentRow = memo(
  ({ row, isExpanded, onToggle, colSpan }: TableParentRowProps) => (
    <tr>
      <td colSpan={colSpan} onClick={onToggle} className="parent-row">
        <Accordion.Header>{String(row.cells[0].value)}</Accordion.Header>
      </td>
    </tr>
  )
);
