import React, { FC, useState, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { subDays } from 'date-fns';
import { Duration } from 'luxon';
import {
  Spinner, Box, Heading, Text, Button,
} from 'grommet';
import { getUsers } from '../../actions';
import { IState } from '../../reducers';
import { Summary, UsersTable } from '../../components';
import { IUser } from '../../data';

export const Dashboard: FC = () => {
  const [showActive, setShowActive] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [dateRange, setDateRange] = useState<[string, string]>([
    subDays(new Date(), 6).toISOString(),
    new Date().toISOString(),
  ]);

  const dispatch = useDispatch();
  const { isLoading, error, data } = useSelector<IState, IState['users']>(({ users }) => ({
    isLoading: users.isLoading,
    error: users.error,
    data: users.data.filter((i) => i.active === showActive),
  }));

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleRefetch = useCallback(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const totals = useMemo(() => {
    const raw = data.reduce((acc, i) => {
      acc.total = acc.total.plus(i.totalTime);
      acc.productive = acc.productive.plus(i.productiveTime);
      acc.unproductive = acc.unproductive.plus(i.unproductiveTime);
      return acc;
    }, {
      total: Duration.fromObject({}),
      productive: Duration.fromObject({}),
      unproductive: Duration.fromObject({}),
    });

    return {
      count: data.length,
      total: raw.total.normalize().toObject(),
      productive: raw.productive.normalize().toObject(),
      unproductive: raw.unproductive.normalize().toObject(),
    }
  }, [data]);

  const filteredDate = useMemo(() => data.reduce<IUser[]>((acc, i) => {
    const bySearch = searchString ? i.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0 : true;

    if (bySearch) {
      const filteredByDate = i.filterByRange(new Date(dateRange[0]), new Date(dateRange[1]));

      if (filteredByDate.times.length > 0) {
        acc.push(filteredByDate);
      }
    }

    return acc;
  }, []), [searchString, dateRange, data]);

  switch (true) {
    case isLoading: {
      return (
        <Box fill="vertical" justify="center" pad="medium">
          <Spinner alignSelf="center"  size="large" message="Please wait..." />
        </Box>
      );
    }
    case Boolean(error): {
      return (
        <Box fill="vertical" justify="center" pad="medium">
          <Heading alignSelf="center">Oops...</Heading>
          <Text margin="medium" alignSelf="center">{error}</Text>
          <Button primary size="small" label="Try again" alignSelf="center" onClick={handleRefetch} />
        </Box>
      );
    }
    case Boolean(data): {
      return (
        <Box pad="medium" gap="medium">
          <Summary
            usersCount={totals.count}
            totalTime={totals.total}
            productiveTime={totals.productive}
            unproductiveTime={totals.unproductive}
            showActive={showActive}
            onToggleActive={setShowActive}
          />
          <UsersTable
            searchString={searchString}
            onSearch={setSearchString}
            dateRange={dateRange}
            onRangeChange={setDateRange}
            data={filteredDate}
          />
        </Box>
      );
    }
    default: {
      return null;
    }
  }
}
