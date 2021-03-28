import React, { FC, useCallback } from 'react';
import { Duration } from 'date-fns';
import { formatDuration } from 'date-fns';
import {
  Table, TableBody, TableCell, TableHeader, TableRow, Text, Card, CardHeader, CardBody, CheckBox,
} from 'grommet';

interface IProps {
  usersCount: number;
  totalTime: Duration;
  productiveTime: Duration;
  unproductiveTime: Duration;
  showActive: boolean;
  onToggleActive: (nextState: boolean) => void;
}

export const Summary: FC<IProps> = (props) => {
  const {
    usersCount, totalTime, productiveTime, unproductiveTime, showActive, onToggleActive,
  } = props;

  const handleToggle = useCallback((e) => {
    onToggleActive(e.target.checked)
  }, [onToggleActive]);

  return (
    <Card>
      <CardHeader pad="medium" background="light-2">
        <Text>General summary</Text>
      </CardHeader>
      <CardBody pad="medium">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell border="bottom">
                <Text>Employees</Text>
              </TableCell>
              <TableCell border="bottom">
                <Text>Total time</Text>
              </TableCell>
              <TableCell border="bottom">
                <Text>Productive time</Text>
              </TableCell>
              <TableCell border="bottom">
                <Text>Unproductive time</Text>
              </TableCell>
              <TableCell border="bottom">
                <Text>Active</Text>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell border="bottom">
                <Text>{usersCount}</Text>
              </TableCell>
              <TableCell border="bottom">
                <Text>{formatDuration(totalTime)}</Text>
              </TableCell>
              <TableCell border="bottom">
                <Text>{formatDuration(productiveTime)}</Text>
              </TableCell>
              <TableCell border="bottom">
                <Text>{formatDuration(unproductiveTime)}</Text>
              </TableCell>
              <TableCell border="bottom">
                <CheckBox
                  checked={showActive}
                  onChange={handleToggle}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
