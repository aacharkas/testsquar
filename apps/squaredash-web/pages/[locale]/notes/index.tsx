import React from 'react';

import NotesTable from '../../../components/Notes/NoteItemsTable';
import Layout from '../../../components/Layout/Layout';
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic';
import { Can } from '../../../lib/ability';
import { PERMISSIONS,PERMISSION_ACTIONS } from '../../../constants/permissions';

const Notes = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.NOTES}>
        <NotesTable/>
      </Can>
    </Layout>
  );
};

const getStaticProps = makeStaticProps(['notes','buttons']);
export { getStaticPaths, getStaticProps };

export default Notes;
