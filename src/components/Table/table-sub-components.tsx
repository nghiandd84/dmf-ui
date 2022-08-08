import React, { Fragment, useState } from 'react';
import tw, { TwStyle } from 'twin.macro';
import Button from '../Button';
import Checkbox from '../Checkbox';
import { Color } from '../core/Core';
import Icon from '../Icon/Icon';
import Input from '../Input';
import Pagination from '../pagination/Pagination';
import PaginationItem from '../pagination/PaginationItem';
import Select from '../Select/Select';
import H4 from '../typography/Heading4';
// import Button from "./Button";
// import CheckedBox from "./svgs/CheckedBox";
// import UnCheckedBox from "./svgs/UnCheckedBox";
// import IndeterminateCheckBox from "./svgs/IndeterminateCheckBox";
// import Import from "./svgs/Import";
// import Search from "./svgs/search";
import {
  Icolumn,
  Irow,
  renderFunction,
  IPaginated,
  IPerPage,
  stringRenderFunc,
} from './table-types';
import utilsClass from './utilsClass';

export interface ItableRow {
  row: Irow;
  columns: Icolumn[];
  /**
   * If users want to enable using bulk selects, then they have to pass in an array of strings of actions.
   * If that array of string is empty, then this will be false
   */
  use_bulk_action: boolean;
  index: number;
  render?: renderFunction;
  checked_set: Set<number>;
  active_page_number: number;
  /**
   * Whenever a single checkbox in a table row is clicked, this is invoked. Since I'm using a cotrolled input,
   * I therefore trigger an event up the tree to notify about this click. This is then recorded on the
   * `Set` that holds data of clicked rows for this page.
   */
  setCheck: (page_number: number, index: number, ischecked: boolean) => void;
  is_striped: boolean;
  is_bordered: boolean;
  is_hovered: boolean;
  row_style: string;
  data_style: string;
}

export function TableRow(props: ItableRow) {
  return (
    <tr
      tw="mt-3 flex flex-wrap flex-row sm:flex-none sm:table-row sm:flex-nowrap sm:mt-0"
      className={
        `${props.is_hovered ? 'hover:bg-gray-50 ' : ''} 
						${props.is_bordered ? 'border-b border-gray-200 ' : ''} 
						${
              utilsClass.isEven(props.index + 1) && props.is_striped
                ? 'bg-gray-50 '
                : ''
            }` + props.row_style
      }
    >
      {props.use_bulk_action && (
        <td
          tw="px-4 py-1 text-base w-5 hidden sm:table-cell"
          className={props.data_style}
        >
          <Checkbox
            text=""
            checked={props.checked_set.has(props.index)}
            onChange={(ev) =>
              props.setCheck(
                props.active_page_number,
                props.index,
                ev.target.checked
              )
            }
          />
        </td>
      )}

      {props.columns.map((column: Icolumn, index: number) => {
        return (
          <TableData
            key={index.toString()}
            col={column}
            row={props.row}
            render={props.render}
            style={props.data_style}
          />
        );
      })}
    </tr>
  );
}

export function TableData(props: {
  col: Icolumn;
  row: Irow;
  render?: renderFunction;
  style: string;
}) {
  var display_value = utilsClass.unwindObject(props.row, props.col.field);
  return (
    <td tw="px-2 py-1 text-sm w-3/6 sm:w-auto">
      <span tw="block font-bold text-xs text-gray-700 sm:hidden inset-x-0 p-1 bg-gray-300 pl-2 w-full">
        {props.col.use}
      </span>
      <div tw="px-1 py-1 sm:px-0 sm:py-0">
        {(props.render && props.render(props.row, props.col, display_value)) ||
          display_value}
      </div>
    </td>
  );
}

interface Ithead {
  columns: Icolumn[];
  useBulkAction: boolean;
  pageData: IPerPage;
  activePageNumber: number;
  mass_checking: (
    page_number: number,
    action: 'check-all' | 'uncheck-all'
  ) => void;
  row_style: string;
  data_style: string;
}

export function TableHead(props: Ithead) {
  let page = props.activePageNumber;
  let rows_lenth: number = 0;
  let checked_length: number = 0;
  let all_is_checked: boolean = false;
  let some_ischecked: boolean = false;
  let none_is_checked: boolean = false;

  //Only run this calculations if user opted to use bulk select api and the table data is not empty
  if (props.useBulkAction) {
    //This data might be undefined, so use this operator
    rows_lenth = props.pageData?.page_row_array.length;
    checked_length = props.pageData?.checked_set.size;
    all_is_checked = rows_lenth === checked_length && rows_lenth !== 0;
    some_ischecked = checked_length > 0 && !all_is_checked;
    none_is_checked = checked_length === 0;
  }

  const display_columns = props.columns.filter((column: Icolumn) => {
    return column.useInDisplay !== false;
  });
  return (
    <tr className={'bg-gray-300 text-left ' + props.row_style}>
      {props.useBulkAction && (
        <th
          tw="text-base font-semibold text-gray-700 py-2 px-4"
          className={props.data_style}
        >
          {all_is_checked && (
            <Checkbox
              text=""
              checked={all_is_checked}
              name="check-all"
              onClick={() => props.mass_checking(page, 'uncheck-all')}
            />
          )}
          {some_ischecked && (
            <Checkbox
              text=""
              name="check-all"
              onClick={() => props.mass_checking(page, 'check-all')}
            />
          )}
          {none_is_checked && (
            <Checkbox
              text=""
              name="check-all"
              onClick={() => props.mass_checking(page, 'check-all')}
            />
          )}
        </th>
      )}

      {display_columns.map((column: Icolumn, index) => {
        // if item is the first in array, then padd left
        // if it is last, then pad right
        return (
          <th
            key={index.toString()}
            className={
              `text-base font-semibold text-black py-1.5 px-2 
			    					${!props.useBulkAction && index === 0 ? 'pl-4 ' : ''}
			    					${index === display_columns.length - 1 ? 'pr-4 ' : ''} ` + props.data_style
            }
          >
            {column.use ? column.use : column.field}
          </th>
        );
      })}
    </tr>
  );
}

export function TableCaption(props: { text: string; className: string }) {
  return (
    <div tw="m-4">
      <H4 className={props.className}>{props.text}</H4>
    </div>
  );
}

export function TableSearch(props: {
  onSearch: (text: string) => void;
  label?: string;
  placeHolder?: string;
  iconFamily?: 'material' | 'awesome';
}) {
  const iconFamily = props.iconFamily || 'awesome';
  return (
    <div tw="relative flex items-center mt-3 md:mt-0">
      <Input
        tw="text-xs py-2 h-10 w-52"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          props.onSearch(ev.target.value);
        }}
        label={props.label || 'Search'}
        placeholder={props.placeHolder || undefined}
        type="text"
        iconFamily={iconFamily}
        iconName={iconFamily === 'material' ? 'search' : 'fa-search'}
        size="sm"
      />
    </div>
  );
}

interface IexportProps {
  export_text: string;
  paginated_data: IPaginated;
  cols: Icolumn[];
  file_name: string;
  processFunc?: stringRenderFunc;
  color: Color;
}
export function TableExport(props: IexportProps) {
  return (
    <div tw="flex items-center cursor-pointer order-first md:order-none self-end md:self-auto">
      <Button
        color={props.color}
        onClick={() =>
          processDownload(
            props.paginated_data,
            props.cols,
            props.file_name,
            props.processFunc
          )
        }
      >
        {props.export_text}
      </Button>
    </div>
  );
}

export function TableTop(props: { children?: React.ReactNode; style: string }) {
  return (
    <Fragment>
      {props.children && (
        <div
          tw="flex flex-col md:flex-row md:items-center py-2 justify-between px-4 mt-4 mb-2"
          className={props.style}
        >
          {props.children}
        </div>
      )}
    </Fragment>
  );
}

export interface ItableActProps {
  action_options: string[];
  eventSelected: (option: string) => void;
  bgColor?: Color;
  text_color?: string;
  dropdown_style: string;
  button_style: string;
  button_text: string;
}
export function TableBulkAction(props: ItableActProps) {
  const [currentOption, setOption] = useState<string[]>([]);
  function takeAction() {
    props.eventSelected(currentOption.length > 0 ? currentOption[0] : '');
  }
  const actionsOptions = props.action_options.map((item) => ({
    value: item,
    label: item,
  }));
  return (
    <div tw="flex items-center mt-3 md:mt-0">
      <div tw="w-52 md:w-48 relative mr-2 flex ">
        <Select
          value={currentOption}
          label="Select Action"
          options={actionsOptions}
          multiple={false}
          onValueChange={(_, value: any) => {
            setOption([value]);
          }}
        />
      </div>

      <Button uppercase={false} onClick={takeAction}>
        {props.button_text}
      </Button>
    </div>
  );
}

interface Ifooter {
  pageNumberList: number[];
  paginatedMap: IPaginated;
  activePage: number;
  totalPages: number;
  onPageChange: (page_number: number) => void;
}

export function Footer(props: Ifooter) {
  const {
    activePage: active_page,
    pageNumberList: page_number_list,
    paginatedMap: paginated_map,
  } = props;
  console.log(props);

  let page_count = props.pageNumberList.length;

  function pageClick(page_number: number) {
    props.onPageChange(page_number);
  }

  function nextBackBtnClick(direction: 'nxt' | 'bck') {
    if (
      direction === 'nxt' &&
      paginated_map[active_page].forward_button_clickable
    ) {
      props.onPageChange(active_page + 1);
      return;
    }
    if (
      direction === 'bck' &&
      paginated_map[active_page].back_button_clickable
    ) {
      props.onPageChange(active_page - 1);
      return;
    }
  }

  return page_count > 1 ? (
    <div tw="flex flex-col md:flex-row justify-between mt-1 items-center px-2 w-full md:w-auto">
      <Pagination>
        <PaginationItem onClick={() => nextBackBtnClick('bck')} ripple="dark">
          <Icon name="keyboard_arrow_left" />
        </PaginationItem>
        {page_number_list.length <= 7 &&
          page_number_list.map((page_number) => {
            let is_active_page = page_number === active_page;
            return (
              <PaginationItem
                key={page_number}
                color={is_active_page ? 'primary' : undefined}
                onClick={() => pageClick(page_number)}
                ripple={is_active_page ? 'dark' : 'light'}
              >
                {page_number}
              </PaginationItem>
            );
          })}
        <PaginationItem onClick={() => nextBackBtnClick('nxt')} ripple="dark">
          <Icon name="keyboard_arrow_right" />
        </PaginationItem>
      </Pagination>
    </div>
  ) : null;
}

async function processDownload(
  paginated_data: IPaginated,
  colums: Icolumn[],
  file_name: string,
  processFunc?: stringRenderFunc
) {
  let all_rows: Irow[] | null = [];
  var page: string; //suppose to be :number
  file_name = file_name + '.csv';
  for (page in paginated_data) {
    all_rows = all_rows.concat(paginated_data[page].page_row_array);
  }

  let blob = await utilsClass.generateCSV(colums, all_rows, processFunc),
    url = window.URL.createObjectURL(blob);

  // @ts-ignore
  if (window.navigator.msSaveOrOpenBlob)
    // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
    // TODO Fix later
    console.log('window.navigator.msSaveBlob(blob, file_name);');
  // window.navigator.msSaveBlob(blob, file_name);
  else {
    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', file_name);
    document.body.appendChild(link); // Required for Fire fox

    link.click(); // This will download the data file named "my_data.csv".

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      all_rows = null;
    }, 0);
  }
}
