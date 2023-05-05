export const ELEMENT_TAGS = {
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  UL: () => ({ type: 'bulleted-list' }),
};

export const ELEMENT_TO_TAG = {
  'paragraph': 'p',
  'heading-one': 'h1',
  'heading-two': 'h2',
  'numbered-list': 'ol',
  'bulleted-list': 'ul',
  'list-item': 'li',
};

export const TEXT_TAGS = {
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

export const NUMBERED_LIST_STYLES = 'list-style: decimal;padding-left: 2.5em;';
export const BULLETED_LIST_STYLES = 'list-style: inside;padding-left: 2.5em;';
