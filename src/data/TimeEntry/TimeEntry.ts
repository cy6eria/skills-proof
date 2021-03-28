import { Duration as IDuration, intervalToDuration } from 'date-fns';
import { Duration } from 'luxon'

interface IProps {
  id: string;
  start: Date;
  end: Date;
  unproductiveTime: IDuration;
}

export interface ITimeEntry {
  readonly id: string;
  readonly start: Date;
  readonly end: Date;
  readonly totalTime: IDuration;
  readonly productiveTime: IDuration;
  readonly unproductiveTime: IDuration;
}

export class TimeEntry implements ITimeEntry {
  readonly id: string;
  readonly start: Date;
  readonly end: Date;
  readonly unproductiveTime: IDuration;

  constructor(props: IProps) {
    this.id = props.id;
    this.start = props.start;
    this.end = props.end;
    this.unproductiveTime = props.unproductiveTime;
  }

  get totalTime () {
    return intervalToDuration({ start: this.start, end: this.end });
  }

  get productiveTime () {
    return Duration.fromObject(this.totalTime).minus(this.unproductiveTime).normalize().toObject();
  }
}
