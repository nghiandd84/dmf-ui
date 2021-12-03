import React from 'react';
// import { Card, CardBody, CardFooter, CardHeader, CardImage } from '../components/card';
import Card from '../components/card/Card';
import CardBody from '../components/card/CardBody';
import CardFooter from '../components/card/CardFooter';
import CardHeader from '../components/card/CardHeader';
import CardImage from '../components/card/CardImage';
import Button from '../components/Button';

export function RegularCard() {
  return (
    <Card>
      <CardHeader>
        My Header
      </CardHeader>
      {/* <CardImage
        src="https://images.unsplash.com/photo-1612831455740-a2f6212eeeb2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2250&amp;q=80"
        alt="Card Image"
      /> */}

      <CardBody>
        {/* <H6 color="gray">Card Title</H6>
        <Paragraph color="gray">
          Don't be scared of the truth because we need to restart the human
          foundation in truth And I love you like Kanye loves Kanye I love Rick
          Owens’ bed design but the back is...
        </Paragraph> */}
        <h6>Card Title</h6>
        <p>
          Don't be scared of the truth because we need to restart the human
          foundation in truth And I love you like Kanye loves Kanye I love Rick
          Owens’ bed design but the back is...
        </p>
      </CardBody>

      <CardFooter>
        <Button color="primary" size="lg" ripple="light">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}
export const DemoCard = () => {
  return (
    <>
      <RegularCard />
    </>
  );
};
