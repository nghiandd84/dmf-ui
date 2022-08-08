import React from 'react';
import Table, {
  Icolumn,
  Irow,
  ItableStyle,
  renderFunction,
} from '../components/Table/Table';
export const DemoTable = () => {
  const columns: Icolumn[] = [
    {
      field: 'created_at',
      use: 'Action',
      // use_in_search:false
    },
    {
      field: 'front_end_position.name',
      use: 'Position',
      useInSearch: true,
    },
    {
      // use_in_display: false,
      field: 'name',
      use: 'Name',
    },

   
    {
      field: "country_id",
      use: "Country",

      //Will not be displayed in the table
      useInDisplay: false
    },
    {
      field: "club_id",
      use: "Club Details",
      //would not be exported as a CSV column
      useInDisplay: true

    }
  ];

  const rowA: Irow[] = [
    {
      id: 1,
      name: 'Sadio Mane',
      country_id: 3,
      club_id: 2,
      position_id: 1,
      shirt_number: '10',
      created_by: 2,
      deleted_at: null,
      created_at: '12/12/12 15:00:00',
      updated_at: '12/12/12 15:00:00',
      is_defender: false,
      is_midfielder: false,
      is_forward: true,
      is_goalkeeper: false,
      front_end_position: {
        name: 'attach',
        id: 2,
      },
    },
    {
      id: 2,
      name: 'Mohammed Sala',
      country_id: 3,
      club_id: 2,
      position_id: 1,
      shirt_number: '11',
      created_by: 2,
      deleted_at: null,
      created_at: '12/12/12 15:00:00',
      updated_at: '12/12/12 15:00:00',
      is_defender: false,
      is_midfielder: false,
      is_forward: true,
      is_goalkeeper: false,
      front_end_position: {
        name: 'Forward',
        id: 4,
      },
    },
    {
      id: 3,
      name: 'Robertor Fermino',
      country_id: 3,
      club_id: 2,
      position_id: 1,
      shirt_number: '8',
      created_by: 2,
      deleted_at: null,
      created_at: '12/12/12 15:00:00',
      updated_at: '12/12/12 15:00:00',
      is_defender: false,
      is_midfielder: false,
      is_forward: true,
      is_goalkeeper: false,
      front_end_position: {
        name: 'Defence',
        id: 9,
      },
    },
  ];

  const rows = rowA.concat(rowA).concat(rowA);

  const rowRender: renderFunction = (
    row: Irow,
    column: Icolumn,
    display_value: any
  ) => {
    if (column.field === 'created_at') {
      return <button className="border p-2">See button</button>;
    }

    if (column.field === 'name') {
      return <b>{display_value}</b>;
    }

    return display_value;
  };
  const style: ItableStyle = {
    baseBgColor: 'primary',
    top: {
      elements: {
        search: {
          text: 'Search In Table',
          placeHolder: 'Mane ...'
        },
        bulkSelect: {
          button: 'Bulk Select',
          main: 'bulk-select'
        }
      },
      
    },
    
  };
  return (
    <>
      <Table
        columns={columns}
        rows={rows}
        perPage={2}
        tableHeader="Test Table"
        rowRender={rowRender}
        styling={style}
        bulkSelectOptions={['Delete']}
      />
    </>
  );
};
