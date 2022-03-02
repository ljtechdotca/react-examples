export const hex = () => {
  const bit = ~~(Math.random() * 0xffffff);
  return `#${bit.toString(16).padEnd(6, "0")}`;
};
