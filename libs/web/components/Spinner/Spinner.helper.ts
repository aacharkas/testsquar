export function spinnerHelper(size: string) {
  let sizeStyle;
  switch (size) {
    case 'xsmall':
      sizeStyle = 'h-6 w-6';
      break;
    case 'small':
      sizeStyle = 'h-8 w-8';
      break;
    case 'big':
      sizeStyle = 'h-16 w-16';
      break;
    case 'medium':
    default:
      sizeStyle = 'h-12 w-12';
  }

  return sizeStyle;
}
