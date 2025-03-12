import { useSelector } from "react-redux";
import { LayoutContainer } from "widgets/layouts-manager/LayoutContainer";

import "react-resizable/css/styles.css";

export const LayoutManager = () => {
  const { layouts } = useSelector<any, any>((state) => state.layouts);

  if (!layouts || !layouts.length) {
    return <div>No layout data available.</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
      }}
    >
      {layouts.map((layout, index) => (
        <LayoutContainer layout={layout} index={index} />
      ))}
    </div>
  );
};
