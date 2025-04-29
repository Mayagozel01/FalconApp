import { useDispatch } from "react-redux";
import { addLayout } from "../../widgets/layouts-manager/layoutsSlice";

const List = ({ title, content, ...rest }) => {
  const dispatch = useDispatch();
  console.log(rest);
  const handleDuplicate = () => {
    dispatch(addLayout(rest)); // Создаем копию props перед отправкой
  };
  console.log("Permission props:", rest);
  return (
    <div>
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
    </div>
  );
};

export default List;
