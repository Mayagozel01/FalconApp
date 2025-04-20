import { useDispatch } from "react-redux";
import { addLayout } from "../../widgets/layouts-manager/layoutsSlice";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";

const Registry = ({ ...rest }) => {
  const dispatch = useDispatch();

  const handleDuplicate = () => {
    dispatch(addLayout(rest));
  };

  const { content, title } = rest;
  const { structure } = content || {};
  const { rows = [], header = [], view = "table" } = structure || {};

  if (!rows.length || !header.length) {
    return <div className="text-center p-4">No data to display</div>;
  }

  return (
    <div className=" vh-100 bg-white shadow-sm">
      <Navbar variant="light" bg="primary" expand="sm" className="py-3">
        <Container fluid>
          <Row className="w-100 align-items-center">
            <Col>
              <h3 className="text-white m-0">{title?.value} Registry</h3>
            </Col>
            <Col xs="auto">
              <Button variant="light" size="sm" onClick={handleDuplicate}>
                Duplicate
              </Button>
            </Col>
          </Row>
        </Container>
      </Navbar>

      <div className="flex-grow-1 p-4 overflow-auto">
        {view === "table" && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped ">
              <thead className="table-primary">
                <tr>
                  {header.map((h) => (
                    <th key={h.id}>{h.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {row.cells.map((cell, idx) => (
                      <td key={idx}>{cell?.value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "list" && (
          <ul className="list-group">
            {rows.map((row) => (
              <li key={row.id} className="list-group-item">
                {row.cells.map((cell, idx) => (
                  <span key={idx} className="me-2">
                    {cell?.value}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Registry;
