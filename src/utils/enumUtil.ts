import { Frequency } from "../interfaces/FrequencyEnum";

export const enumToValueArray = <T extends Record<string, string>>(enumObj: T): { id: string; value: string }[] => {
    return Object.keys(enumObj).map((key) => ({
      id: key,
      value: enumObj[key],
    }));
};

export const getFrequencyDisplayValue = (frequency: string): string => {
  switch (frequency) {
      case Frequency.OneTime:
          return "One-Time";
      case Frequency.Daily:
          return "Daily";
      case Frequency.Weekly:
          return "Weekly";
      case Frequency.SemiMonthly:
          return "Semi-Monthly";
      case Frequency.Monthly:
          return "Monthly";
      default:
          return "Unknown";
  }
};