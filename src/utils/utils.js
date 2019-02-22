import moment from 'moment';
import { getCenter } from 'geolib';

export const shortenText = (text, maxVisible) => {
  if(text.length <= maxVisible) {
    return text;
  }

  return text.substr(0, maxVisible) + '...';
};

export const closeTimeParser = (hours) => {
  let ret;
  if (!hours) {
    ret = null;
  } else {
    const hArray = hours.split(' ');
    const day = new RegExp(`^${moment().format('ddd')}`, 'i');
    const today = hArray.find((item) => day.test(item)) || '';
    if (today.length > 0) {
      const hourStr = today.slice(today.length - 4, today.length - 2);
      const minStr = today.slice(today.length - 2, today.length);
      let hour;
      let ampm;
      if(parseInt(hourStr, 10) < 12) {
        hour = hourStr === '00' ? '12' : hourStr;
        ampm = 'am';
      } else {
        hour = hourStr === '12' ? '12' : `${parseInt(hourStr, 10) - 12}`;
        ampm = 'pm';
      }
      ret = `${hour}:${minStr}${ampm}`;
    } else {
      ret = 'Closed today';
    }
  }

  return ret;
};

export const getAvgPos = (arr) => {
  const result = getCenter(arr.map(({ lat, lon }) => ({ latitude: lat, longitude: lon })));
  return [result.latitude, result.longitude];
};

export const getCurrentPosition = () => {
  if ('geolocation' in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          resolve([success.coords.latitude, success.coords.longitude]);
        },
        (error) => {
          reject();
        }
      );
    });
  }
  return null;
};
