import React from 'react';

import NoteForm from '../../../../components/Notes/Note/NoteForm';
import Layout from '../../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../constants/permissions';
import { useAbility } from '../../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const Note = () => {
  const ability = useAbility();
  const access = 
    ability.can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.NOTES) ||
    ability.can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.NOTES);
  return <Layout>{access && <NoteForm />}</Layout>;
};

export default Note;

const getStaticProps = makeStaticProps(['common', 'notes', 'buttons']);
export { getStaticPaths, getStaticProps };
