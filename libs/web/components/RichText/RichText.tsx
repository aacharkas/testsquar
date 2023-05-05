import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Editable, withReact, useSlate, Slate, useFocused } from 'slate-react';
import {
  Transforms,
  createEditor,
  Editor,
} from 'slate';
import { withHistory } from 'slate-history';
import styles from './RichText.module.css';
import classNames from 'classnames';
import { ActionItem, Toolbar } from './components';
import Typography from '../Typography/Typography';
import { ETextVariant } from '../../constants/enums';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import {
  serialize, 
  deserialize, 
  toggleBlock, 
  isBlockActive, 
  toggleMark, 
  isMarkActive,
} from './RichText.helper';
import {TEXT_ALIGN_TYPES} from './RichText.constants';

interface IProps {
  label?: string;
  value?: string;
  error?: boolean;
  errorText?: string;
  className?: string;
  defaultText?: string;
  onChangeText?: (val: React.ChangeEvent<HTMLTextAreaElement> | string) => void;
  Popover?: React.ElementType;
  SideBarContent?: React.ElementType;
  InsertButton?: React.ElementType;
  BackToDefault?: React.ElementType;
  customFields?;
}

const RichText = ({
  label,
  onChangeText,
  value,
  className,
  error,
  errorText,
  Popover,
  SideBarContent,
  BackToDefault,
  defaultText,
  InsertButton,
  customFields,
}: IProps) => {
  const renderElement = useCallback(props => <Element {...props} setIsEditorFocused={setIsEditorFocused} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    if (value) {
      Transforms.insertNodes(
        editor,
        deserialize(value),
        {
          at: [0]
        }
      );
    }
  }, [value]);
  
  const handleInsertField = (field) => {
    Transforms.insertNodes(
      editor,
      {
        text: field,
      }
    );
  };

  const handleBackToDefault = () => {
    const point = { path: [0, 0], offset: 0 }
    editor.selection = { anchor: point, focus: point };
    editor.history = { redos: [], undos: [] }; 
    editor.children = [{
      children: [{ text: '' }]
    }];
    Transforms.insertNodes(editor, 
    {
      children: [{ text: defaultText }],
    },
    {
      at: [0],
    })
  };

  return (
    <div className="flex sm:flex-col items-start w-full">
      <div className={className}>
        {label && (
          <label
            htmlFor="comment"
            className="flex justify-between text-sm font-medium text-gray-700"
          >
            <Typography
              variant={ETextVariant.sm}
              medium
              className="text-gray-700"
            >
              {label}
            </Typography>
          </label>
        )}
        <div className={classNames(
        'mt-1 border rounded-md p-2 shadow-sm',
        {
          'border-gray-300': !error,
          'border-red-300': error,
          'ring-1 ring-indigo-700 border-indigo-700': isEditorFocused,
        }
        )}>
          <Slate
            editor={editor}
            value={[]}
            onChange={value => {
              const isAstChange = editor.operations.some(
                op => 'set_selection' !== op.type
              );
              if (isAstChange) {
                if (value.length === 1 && Editor.isEmpty(editor, { children: value[0]['children']})) {
                  onChangeText('');
                } else {
                  onChangeText(serialize({children: value}));
                }
              }
            }}
          >
            <Toolbar>
              <MarkButton format="bold" icon={<FormatBoldIcon fontSize="small"/>} />
              <MarkButton format="italic" icon={<FormatItalicIcon fontSize="small"/>} />
              <MarkButton format="underline" icon={<FormatUnderlinedIcon fontSize="small"/>} />
              <BlockButton format="heading-one" icon="H1" />
              <BlockButton format="heading-two" icon="H2" />
              <BlockButton format="numbered-list" icon={<FormatListNumberedIcon fontSize="small"/>} />
              <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon fontSize="small"/>} />
              <BlockButton format="left" icon={<FormatAlignLeftIcon fontSize="small"/>} />
              <BlockButton format="center" icon={<FormatAlignCenterIcon fontSize="small"/>} />
              <BlockButton format="right" icon={<FormatAlignRightIcon fontSize="small"/>} />
              <BlockButton format="justify" icon={<FormatAlignJustifyIcon fontSize="small"/>} />
            </Toolbar>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              spellCheck
              className="text-gray-900 min-h-[200px]"
            />
          </Slate>
          <div className="flex justify-end sm:hidden">
            {<Popover customFields={customFields} onClick={handleInsertField} />}
          </div>
          <div className="justify-end hidden sm:flex">
            {<InsertButton onClick={() => setIsModalOpen(!isModalOpen)} />}
          </div>
          <SideBarContent 
            isModalOpen={isModalOpen} 
            closeModal={() => setIsModalOpen(false)} 
            customFields={customFields}
            onClick={handleInsertField}
          />
        </div>
        {!!errorText && error && (
          <p className="mt-2 text-sm text-red-600">{errorText}</p>
        )}
      </div>
      <BackToDefault onClick={handleBackToDefault} />
    </div>
  )
}

const Element = ({ attributes, children, element, setIsEditorFocused }) => {
  const focused = useFocused();
  useEffect(() => {
    setIsEditorFocused(focused);
  }, [focused]);
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'bulleted-list':
      return (
        <ul className={styles.list_bulleted} style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 className={styles.h1} style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 className={styles.h2} style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol className={styles.list_numbered} style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <ActionItem
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </ActionItem>
  );
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <ActionItem
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </ActionItem>
  );
}

export default RichText
