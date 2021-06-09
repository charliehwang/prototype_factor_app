import * as d3 from 'd3';

const randomAroundMean = (mean: number, deviation: number) =>
  mean + boxMullerRandom() * deviation;

const boxMullerRandom = () =>
  Math.sqrt(-2.0 * Math.log(Math.random())) *
  Math.cos(2.0 * Math.PI * Math.random());

const today = new Date();

const formatDate = d3.timeFormat('%m/%d/%Y');

/**
 * Generates X amount of Timeline Data for a specific key
 *
 * @param {number} length Amount of data wanted. Defaults to 100.
 * @param {string} type key to be set in the hash to name the data value set to it.
 * @param {number} mean Randomized data mean. Defaults to 100.
 * @param {number} deviation Randomized data mean deviation. Defaults to 20.
 * @return {Array} Shape of [{ date: ... , key: ... }, { ... }, { ... }...]
 */
export const getTimelineData = (
  length = 100,
  type: string,
  mean?: number,
  deviation?: number
) => {
  mean = mean ?? 100;
  deviation = deviation ?? 20;

  let lastNum = randomAroundMean(mean, deviation);
  const firstNum = d3.timeDay.offset(today, -length);

  return new Array(length).fill(0).map((d, i) => {
    lastNum += randomAroundMean(0, deviation! * 0.01); // 1% randomness around mean
    return {
      date: formatDate(d3.timeDay.offset(firstNum, i)),
      [type]: lastNum,
    };
  });
};
