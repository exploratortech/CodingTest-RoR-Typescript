import { Button, ListGroup, Form } from "react-bootstrap";
import styled from "styled-components";

export const ResetButton = styled(Button)`
  margin-top: 1em;
`;

export const ListGroupItem = styled(ListGroup.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FileInput = styled(Form.Control)`
  width: 35%;
`;
