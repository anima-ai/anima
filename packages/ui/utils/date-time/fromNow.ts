import dayjs from 'dayjs';

export const timeFromNow = (date: string | Date) => dayjs(date).fromNow();
