export const enumToValueArray = <T extends Record<string, string>>(enumObj: T): { id: string; value: string }[] => {
    return Object.keys(enumObj).map((key) => ({
      id: key,
      value: enumObj[key],
    }));
};