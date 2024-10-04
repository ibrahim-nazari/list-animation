export const setUpdateList = (lists, containerWidth, isModalOpen) => {
  let updatedList = [...lists];
  let xw = 0;
  let yh = 0;
  for (let i = 1; i < lists.length; i++) {
    const { x, y, width } = updatedList[i - 1];
    const currentItemWidth = updatedList[i].width;
    xw = x + width + 10;
    yh = y;

    if (xw + currentItemWidth >= containerWidth && isModalOpen) {
      xw = 0;
      yh += 70;
    }
    updatedList[i] = { ...updatedList[i], x: xw, y: yh, animation: false };
  }

  return updatedList;
};
