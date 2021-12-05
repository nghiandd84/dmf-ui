import React from 'react';
import Alert from '../components/alert/Alert';
import ClosingAlert from '../components/alert/ClosingAlert';
import Label from '../components/label/Label';
import ClosingLabel from '../components/label/ClosingLabel'
export const DemoAlert = () => {
  return (
    <>
      <Alert>This is my allert</Alert>
      <Alert color="warning">This is my allert</Alert>
      <ClosingAlert color="success">This is my allert</ClosingAlert>
      <ClosingAlert duration={5000}>
        This is a close alert <br />
        This is a close alert <br />
        This is a close alert <br />
      </ClosingAlert>
      <Label>Label</Label>
      <ClosingLabel>ClosingLabel</ClosingLabel>
    </>
  );
};
