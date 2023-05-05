import React from 'react';
import Input from '../../../../../libs/web/components/Input/Input';
import Search from '../../../../../libs/web/components/Search/Search';
import Button from '../../../../../libs/web/components/Button/Button';
import Toggle from '../../../../../libs/web/components/Toggle/Toggle';
import Checkbox from '../../../../../libs/web/components/Checkbox/Checkbox';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import SelectMenu from '../../../../../libs/web/components/SelectMenu/SelectMenu';
import Textarea from '../../../../../libs/web/components/Textarea/Textarea';
import SideMenu from '../../../../../libs/web/components/SideMenu/SideMenu';
import Avatar from '../../../../../libs/web/components/Avatar/Avatar';
import CustomLink from '../../../../../libs/web/components/CustomLink/CustomLink';
import { useTranslation } from 'next-i18next';
import { ETextVariant } from '../../../../../libs/web/constants/enums';
import { FolderIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic';

/* eslint-disable-next-line */
export interface UiKitProps {}

const array = [
  {
    id: 1,
    name: 'option 1',
  },
  {
    id: 2,
    name: 'option 2',
  },
  {
    id: 3,
    name: 'option 3',
  },
];

const navigation = [
  { id: 1, name: 'Menu line', icon: HomeIcon, href: '#', current: true },
  { id: 2, name: 'Menu line', icon: UsersIcon, href: '#', current: false },
  { id: 3, name: 'Menu line', icon: FolderIcon, href: '#', current: false },
];

export function UiKit(props: UiKitProps) {
  const { t, ready } = useTranslation('header');
  return (
    <>
      <div>
        <Input
          label="Test input"
          placeholder="Start input"
          onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
            console.log(e.target.value)
          }
        />
        <Button size="small" shape="rectangle" theme="dark">
          {t('learning_materials')}
        </Button>
        <Button size="small" shape="circle" theme="dark">
          Button
        </Button>
        <Button size="small" shape="rectangle" theme="light">
          Button
        </Button>
        <Button size="small" shape="circle" theme="light">
          Button
        </Button>
        <Button size="big" shape="rectangle" theme="dark">
          Button
        </Button>
        <Button size="big" shape="circle" theme="dark">
          Button
        </Button>
        <Button size="big" shape="rectangle" theme="light">
          Button
        </Button>
        <Button size="big" shape="circle" theme="light">
          Button
        </Button>
        <Toggle />
        <Toggle checked />
        <Checkbox />
        <Checkbox checked />
        <Typography variant={ETextVariant.xs}>Text-xs</Typography>
        <Typography variant={ETextVariant.xs} medium>
          Text-xs
        </Typography>
        <Typography variant={ETextVariant.sm}>Text-sm/regular</Typography>
        <Typography variant={ETextVariant.sm} medium>
          Text-sm/medium
        </Typography>
        <Typography variant={ETextVariant.base}>Text-base/regular</Typography>
        <Typography variant={ETextVariant.base} medium>
          Text-base/medium
        </Typography>
        <Typography variant={ETextVariant.lg}>Text-lg</Typography>
        <Typography variant={ETextVariant.xl}>Text-xl</Typography>
        <Typography variant={ETextVariant.xl_2}>Text-2xl</Typography>
        <Typography variant={ETextVariant.xl_3}>Text-3xl</Typography>
        <Typography variant={ETextVariant.xl_4}>Text-4xl</Typography>
        <Typography variant={ETextVariant.xl_5}>Text-5xl</Typography>
        <Typography variant={ETextVariant.xl_6}>Text-6xl</Typography>
        <SelectMenu
          label="SelectMenu"
          options={array}
          placeholder="Options..."
        />
        <Textarea
          label="Textarea"
          name="Textarea"
          placeholder="placeholder..."
        />
        <SideMenu options={navigation} />
        <Avatar initials="AP" size="small" />
        <Avatar initials="AP" size="medium" />
        <Avatar initials="AP" size="big" />
        <CustomLink href="#">Link text</CustomLink>
      </div>
    </>
  );
}

export default UiKit;

const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };
