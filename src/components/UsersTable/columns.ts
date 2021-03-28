import { formatDuration } from 'date-fns';
import { IUser } from '../../data';

interface IColumn {
  property: string;
  label: string;
  dataScope?: string;
  format?: (data: any) => any;
  align?: 'start' | 'center' | 'end',
}

export const columns: IColumn[] = [
  {
    property: 'name',
    label: 'Name',
    dataScope: 'row',
  },
  {
    property: 'totalTime',
    label: 'Total time',
    align: 'end',
    format: (row: IUser) => formatDuration(row.totalTime) || '-',
  },
  {
    property: 'productiveTime',
    label: 'Productive time',
    align: 'end',
    format: (row: IUser) => formatDuration(row.productiveTime) || '-',
  },
  {
    property: 'unproductiveTime',
    label: 'Unproductive time',
    align: 'end',
    format: (row: IUser) => formatDuration(row.unproductiveTime) || '-',
  },
  {
    property: 'productivityRatio',
    label: 'Productivity ratio',
    align: 'end',
    format: (row: IUser) => row.productivityRatio ? `${row.productivityRatio.toFixed(2)}%` : '-',
  },
];
