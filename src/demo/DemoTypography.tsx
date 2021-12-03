import React from 'react';
import H1 from '../components/typography/Heading1';
import H2 from '../components/typography/Heading2';
import H3 from '../components/typography/Heading3';
import H4 from '../components/typography/Heading4';
import H5 from '../components/typography/Heading5';
import H6 from '../components/typography/Heading6';
import LeadText from '../components/typography/LeadText';
import Paragraph from '../components/typography/Paragraph';
import Quote from '../components/typography/Quote';
import Small from '../components/typography/Small';

export const DemoTypography = () => {
  return (
    <>
      <div className={'w-full flex flex-col gap-y-3 mt-5'}>
        <H1 color="primary">Micro frontend H1</H1>
        <H2 color="secondary">Micro frontend H2</H2>
        <H3 color="danger">Micro frontend H3</H3>
        <H4 color="success">Micro frontend H4</H4>
        <H5 color="info">Micro frontend H5</H5>
        <H6 color="warning">Micro frontend H6</H6>
        <H4>Lead Text</H4>
        <LeadText color="warning">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          eius quae, ducimus tempora amet, quia illum praesentium odit deserunt
          fuga aliquid error commodi sequi facere unde? Maiores tempore expedita
          explicabo.
        </LeadText>
        <H4>Paragraph</H4>
        <Paragraph color="secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ut
          quibusdam sequi aperiam officia pariatur, excepturi inventore, itaque
          recusandae assumenda necessitatibus incidunt dolor! Quod illum nobis
          inventore itaque aspernatur hic.
        </Paragraph>
        <H4>Quote</H4>
        <Quote footer={'footer'} cite="and cite" color="success">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ut
          quibusdam sequi aperiam officia pariatur, excepturi inventore, itaque
          recusandae assumenda necessitatibus incidunt dolor! Quod illum nobis
          inventore itaque aspernatur hic.
        </Quote>
        <H4>Small</H4>
        <Small>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ut
          quibusdam sequi aperiam officia pariatur, excepturi inventore, itaque
          recusandae assumenda necessitatibus incidunt dolor! Quod illum nobis
          inventore itaque aspernatur hic.
        </Small>
      </div>
    </>
  );
};
