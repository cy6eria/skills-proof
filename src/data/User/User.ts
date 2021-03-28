import { Duration as IDuration, areIntervalsOverlapping } from 'date-fns';
import { Duration } from 'luxon';
import { ITimeEntry } from '../TimeEntry';

interface IProps {
  id: string;
  name: string;
  times: ITimeEntry[];
  active: boolean;
}

export interface IUser {
  readonly id: string;
  readonly name: string;
  readonly times: ITimeEntry[];
  readonly totalTime: IDuration;
  readonly productiveTime: IDuration;
  readonly unproductiveTime: IDuration;
  readonly active: boolean;
  readonly productivityRatio?: number;
  filterByRange: (start: Date, end: Date) => IUser;
}

export class User implements IUser {
  readonly id: string;
  readonly name: string;
  readonly times: ITimeEntry[];
  readonly active: boolean;

  constructor(props: IProps) {
    this.id = props.id;
    this.name = props.name;
    this.times = props.times;
    this.active = props.active;
  }

  get totalTime () {
    return this.times.reduce((acc, i) => acc.plus(i.totalTime), Duration.fromObject({})).toObject();
  }

  get productiveTime () {
    return this.times.reduce((acc, i) => acc.plus(i.productiveTime), Duration.fromObject({})).toObject();
  }

  get unproductiveTime () {
    return this.times.reduce((acc, i) => acc.plus(i.unproductiveTime), Duration.fromObject({})).toObject();
  }

  get productivityRatio () {
    if (this.times.length === 0) {
      return undefined;
    }

    const days = Duration.fromObject(this.totalTime).as('days');
    const productiveDays = Duration.fromObject(this.productiveTime).as('days');
    return productiveDays / (days / 100);
  }

  filterByRange (start: Date, end: Date) {
    const range = { start, end };

    return new User({
      id: this.id,
      name: this.name,
      times: this.times.filter((t) => areIntervalsOverlapping(range, { start: t.start, end: t.end })),
      active: this.active,
    });
  }
}
