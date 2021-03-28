import React, { FC, useCallback } from 'react';
import {
  Box, Text, TextInput, DateInput,
  Table, TableBody, TableCell, TableHeader, TableRow,
   Card, CardHeader, CardBody,
} from 'grommet';
import { IUser } from '../../data';
import { columns } from './columns';

interface IProps {
  searchString: string;
  onSearch: (nextSearchString: string) => void;
  dateRange: [string, string];
  onRangeChange: (nextRange: [string, string]) => void;
  data: IUser[];
}

export const UsersTable: FC<IProps> = (props) => {
  const {
    searchString, onSearch, dateRange, onRangeChange, data,
  } = props;

  const handleSearch = useCallback((e) => {
    onSearch(e.target.value)
  }, [onSearch]);


  const handleDateChange = useCallback(({ value }) => {
    onRangeChange(value);
  }, [onRangeChange]);

  return (
    <Card>
      <CardHeader pad="medium" background="light-2">
        <Text>Employee table</Text>
      </CardHeader>
      <CardBody pad="medium">
        <Box gap="medium">
          <Box direction="row" gap="medium">
            <TextInput
              placeholder="Who are you looking for?"
              value={searchString}
              onChange={handleSearch}
            />
            <DateInput
              format="dd/mm/yyyy - dd/mm/yyyy"
              value={dateRange}
              onChange={handleDateChange}
            />
          </Box>

          <Table>
            <TableHeader>
              <TableRow>
                {columns.map(c => (
                  <TableCell key={c.property} scope="col" border="bottom">
                    <Text>{c.label}</Text>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell key={col.property}>
                      <Text>
                        {col.format ? col.format(row) : row[col.property as keyof IUser]}
                      </Text>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardBody>
    </Card>
  );
}
