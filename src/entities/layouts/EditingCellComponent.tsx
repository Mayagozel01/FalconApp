import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Cell, Header } from './types/layout';

interface HeaderLabel {
  id: string | number;
  title: string;
  dataType?: 'text' | 'number' | 'date' | 'select';
}

interface EditingCellProps {
  cellData: Cell[];
  layoutId: string;
  headerLabels: Record<string | number, string>;
  headers?: Header[];
  onSave: (updatedCells: Cell[]) => void;
  onCancel?: () => void;
}

const EditingCellComponent: React.FC<EditingCellProps> = ({
  cellData,
  layoutId,
  headerLabels,
  headers = [],
  onSave,
  onCancel
}) => {
  const [editedCells, setEditedCells] = useState<Cell[]>(cellData);
  const [hasChanges, setHasChanges] = useState(false);

  // Reset when cellData changes
  useEffect(() => {
    setEditedCells(cellData);
    setHasChanges(false);
  }, [cellData]);

  const handleCellChange = useCallback((id: string, value: string) => {
    setEditedCells(prev =>
      prev.map(cell => {
        if (cell.id === id) {
          return {
            ...cell,
            value: value // Ensure we maintain the correct value type
          };
        }
        return cell;
      })
    );
    setHasChanges(true);
  }, []);

  const handleSubmit = useCallback(() => {
    if (hasChanges) {
      onSave(editedCells);
    }
  }, [editedCells, hasChanges, onSave]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    } else {
      onSave(cellData);
    }
  }, [cellData, onCancel, onSave]);

  const getInputType = (headerId: string | number): string => {
    const header = headers.find(h => h.id === headerId);
    return header?.dataType || 'text';
  };

  const getCellValue = (cell: Cell): string => {
    if (typeof cell.value === 'string') {
      return cell.value;
    }
    if (typeof cell.value === 'number') {
      return cell.value.toString();
    }
    if (Array.isArray(cell.value)) {
      return cell.value.join(', ');
    }
    return '';
  };

  return (
    <div className="editing-cell-container">
      <h4 className="mb-3">Editing Layout: {layoutId}</h4>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {editedCells.map((cell) => (
              <tr key={`${layoutId}-${cell.id}`}>
                <td className="align-middle">
                  {headerLabels[cell.header_id] || headerLabels[cell.headerId] || `Field ${cell.header_id || cell.headerId}`}
                </td>
                <td>
                  <input
                    type={getInputType(cell.header_id || cell.headerId)}
                    className="form-control"
                    value={getCellValue(cell)}
                    onChange={(e) => handleCellChange(cell.id.toString(), e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button 
          variant="outline-secondary" 
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={!hasChanges}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditingCellComponent;