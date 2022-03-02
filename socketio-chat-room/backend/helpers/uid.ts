const bit = () => {
  const bit = ~~(Math.random() * 0xffffff);
  return bit.toString(16).padEnd(6, "f");
};

export const uid = () => {
  const bits = Array.from({ length: 4 }, () => bit());
  return bits.join("-");
};
