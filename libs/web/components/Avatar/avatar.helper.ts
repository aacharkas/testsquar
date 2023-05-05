export function avatarHelper(size: string, shape: string) {
  let sizeStyle, shapeStyle;
  switch (size) {
    case 'small':
      sizeStyle = 'h-8 w-8';
      break;
    case 'medium':
      sizeStyle = 'h-10 w-10';
      break;
    case 'big':
      sizeStyle = 'h-12 w-12';
      break;
    case 'huge':
      sizeStyle = 'h-32 w-32';
      break;
    default:
      sizeStyle = 'h-8 w-8';
  }

  switch (shape) {
    case 'circle':
      shapeStyle = 'rounded-full';
      break;
    case 'square':
      shapeStyle = 'rounded-md';
      break;
    default:
      shapeStyle = 'rounded-full';
  }

  return { sizeStyle, shapeStyle };
}
