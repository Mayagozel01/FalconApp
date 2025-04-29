import classNames from "classnames";
import AppContext from "context/Context";
import { HTMLAttributes, ReactNode, useContext } from "react";
import { Button, Card, Col, Nav, Row, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { camelize } from "../../helpers/utils";
import FalconCardBody from "./FalconCardBody";
import Flex from "./Flex";

// Компонент без пропсов
const PreviewCode = () => {
  return (
    <Row className="d-inline-block">
      <Col>
        <Nav variant="pills" className="nav-pills-falcon m-0">
          <Nav.Item>
            <Nav.Link as={Button} size="sm" eventKey="preview">
              Preview
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Button} size="sm" eventKey="code">
              Code
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  );
};

interface FalconComponentCardHeaderProps {
  light?: boolean;
  className?: string;
  title?: string;
  children?: ReactNode;
  noPreview?: boolean;
}

const FalconComponentCardHeader = ({
  light,
  className,
  title,
  children,
  noPreview,
}: FalconComponentCardHeaderProps) => {
  const location = useLocation();
  const { isRTL } = useContext(AppContext);

  return (
    <Card.Header className={classNames({ "bg-light": light }, className)}>
      <Row
        className={classNames("g-2", {
          "align-items-center": !children,
          "align-items-end ": children,
        })}
      >
        <Col>
          {title && (
            <Flex>
              <h5
                className="mb-0 hover-actions-trigger text-truncate text-nowrap"
                id={camelize(title)}
              >
                {isRTL ? (
                  <>
                    <HashLink
                      to={`${location.pathname}#${camelize(title)}`}
                      className="hover-actions ps-2"
                      style={{ top: 0, left: "-25px" }}
                    >
                      #
                    </HashLink>
                    {title}
                  </>
                ) : (
                  <>
                    {title}
                    <HashLink
                      to={`${location.pathname}#${camelize(title)}`}
                      className="hover-actions ps-2"
                      style={{ top: 0, right: "-25px" }}
                    >
                      #
                    </HashLink>
                  </>
                )}
              </h5>
            </Flex>
          )}
          {children}
        </Col>
        {!noPreview && (
          <Col
            className={classNames({
              "col-auto": !children,
              "col-md-auto col-12": children,
            })}
          >
            <PreviewCode />
          </Col>
        )}
      </Row>
    </Card.Header>
  );
};

interface FalconComponentCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  multiSections?: boolean;
  noGuttersBottom?: boolean;
}

const FalconComponentCard = ({
  children,
  multiSections,
  noGuttersBottom,
  ...rest
}: FalconComponentCardProps) => {
  return (
    <Card className={classNames({ "mb-3": !noGuttersBottom })} {...rest}>
      {multiSections ? (
        <>{children}</>
      ) : (
        <Tab.Container defaultActiveKey="preview">{children}</Tab.Container>
      )}
    </Card>
  );
};

FalconComponentCard.Header = FalconComponentCardHeader;
FalconComponentCard.Body = FalconCardBody;

export default FalconComponentCard;
