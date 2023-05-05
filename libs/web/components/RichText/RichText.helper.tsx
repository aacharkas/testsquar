import {
  Editor,
  Element as SlateElement,
  Text,
  Transforms,
} from 'slate';
import { jsx } from 'slate-hyperscript';

import {
  BULLETED_LIST_STYLES,
  ELEMENT_TAGS,
  ELEMENT_TO_TAG,
  LIST_TYPES,
  NUMBERED_LIST_STYLES,
  TEXT_ALIGN_TYPES,
  TEXT_TAGS,
} from './RichText.constants';

export const deserializeHTML = (el) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const { nodeName } = el;
  let parent = el;

  let children = Array.from(parent.childNodes).map(deserializeHTML).flat();

  if (children.length === 0) {
    children = [{ text: '' }];
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    let attrs = ELEMENT_TAGS[nodeName](el);
    if (el.style.textAlign) {
      attrs = {
        ...attrs,
        align: el.style.textAlign,
      };
    }
    return jsx('element', attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => jsx('text', attrs, child));
  }

  return children;
};

export const deserializePlainText = (text) => {
  return text.split('\n').map(line => {
    return {
      type: 'paragraph',
      children: [{ text: line }],
    }
  })
};

export const deserialize = (value) => {
  if (value) {
    const htmlRegex = new RegExp(/<\/?[a-z][\s\S]*>/i);
    const isHTML = htmlRegex.test(value);
    if (isHTML) {
      const document = new DOMParser().parseFromString(value, 'text/html');
      return deserializeHTML(document.body);
    } else {
      return deserializePlainText(value);
    }
  }
};

export const serialize = (node) => {
  if (node) {
    if (Text.isText(node)) {
      let string = node.text;
      if ((node as any).bold) {
        string = `<strong>${string}</strong>`;
      }
      if ((node as any).italic) {
        string = `<i>${string}</i>`;
      }
      if ((node as any).underline) {
        string = `<u>${string}</u>`;
      }
      return string;
    }
    const children = node.children && node.children.map((n) => serialize(n)).join('');
    const tag = ELEMENT_TO_TAG[node.type];  
    let styles = [], styleString = '';
    if (node.align) {
      styles.push(`text-align: ${node.align};`)
    }
    switch (node.type) {
      case 'numbered-list':
        styles.push(NUMBERED_LIST_STYLES);
        break;
      case 'bulleted-list':
        styles.push(BULLETED_LIST_STYLES);
        break;
      case 'heading-one':
        styles.push('font-size: 2em;')
        break;
      case 'heading-two':
        styles.push('font-size: 1.5em;')
        break;
      default:
        break;
    }

    if (styles.length) {
      styleString = ` style="${styles.join('')}"`;
    }

    if (!tag) return children;
    return `<${tag}${styleString || ''}>${children}</${tag}>`
  }
};

export const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as any).type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
