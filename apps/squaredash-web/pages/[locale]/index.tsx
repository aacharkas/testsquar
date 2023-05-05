import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {useToken} from '../../../../libs/web/hooks/useToken';
import {ROUTES} from '../../constants/routes';
import {useDefineUserStartPage} from '../../hooks/useDefineUserStartPage';
import {getStaticPaths, makeStaticProps} from '../../lib/getStatic';

function Index() {
  const router = useRouter();
  const token = useToken();
  const {loading: loadRedirect, redirectUserStartPage} =
    useDefineUserStartPage();
  useEffect(() => {
    if (token) {
      redirectUserStartPage();
    } else {
      router.push(ROUTES.SIGNIN);
    }
  }, []);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <img
        className="m-auto"
        alt="logo"
        src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/a8p8sxnntqdmbc8zqq7c"
      />
    </div>
  );
}

export default Index;

const getStaticProps = makeStaticProps();
export {getStaticPaths, getStaticProps};
