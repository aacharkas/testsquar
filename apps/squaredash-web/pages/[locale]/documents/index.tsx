import DocumentsTable from '../../../components/Documents/DocumentItemsTable';

import Layout from '../../../components/Layout/Layout';
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic';
import { Can } from '../../../lib/ability';
import { PERMISSIONS,PERMISSION_ACTIONS } from '../../../constants/permissions';

const Documents = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.DOCUMENTS}>
        <DocumentsTable/>
      </Can>
    </Layout>
  );
};

const getStaticProps = makeStaticProps(['documents','buttons']);
export { getStaticPaths, getStaticProps };

export default Documents;
