export function imageInputHelper(size: string, shape: string) {
  let sizeStyle, shapeStyle;
  switch (size) {
    case 'small':
      sizeStyle = 'h-14 w-14';
      break;
    case 'big':
    default:
      sizeStyle = 'h-24 w-24 sm:h-20 sm:w-20';
  }

  switch (shape) {
    case 'circle':
      shapeStyle = 'rounded-full';
      break;
    case 'rectangle':
    default:
      shapeStyle = 'rounded-md';
  }

  return { sizeStyle, shapeStyle };
}
