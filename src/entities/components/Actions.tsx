import {
    faChevronDown,
    faChevronRight,
    faEdit,
    faTrashAlt,
  } from "@fortawesome/free-solid-svg-icons";
  import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Actions component for edit and delete buttons
const Actions = () => (
    <div className="end-0 top-50 pe-3 translate-middle-y hover-actions">
      <Button variant="light" size="sm" className="border-300 me-1 text-600">
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Button variant="light" size="sm" className="border-300 text-600">
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
    </div>
  );
  export default Actions;