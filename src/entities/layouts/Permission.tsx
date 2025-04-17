import React from "react";
import { useDispatch } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { addLayout } from "../../widgets/layouts-manager/layoutsSlice";

const Permission = ({ title, content, ...rest }) => {
  const dispatch = useDispatch();

  const handleDuplicate = () => {
    dispatch(addLayout({ title, content, ...rest }));
  };

  if (!content?.structure?.rows?.length) {
    return <div className="text-muted p-3">No permission data available</div>;
  }

  return (
    <Card className="p-4">
      <h3 className="mb-4">{title?.value || "Permission"}</h3>
      <div className="p-3 shadow-sm">
        {content.structure.rows.map((row) => (
          <div
            key={row.id}
            className="border-bottom py-2 d-flex flex-wrap align-items-center"
          >
            {row.cells.map((cell, idx) => (
              <span key={idx} className="me-3 text-dark">
                {cell?.value}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Permission;
