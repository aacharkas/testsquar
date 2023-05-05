import { useRouter } from 'next/router';

import Button from '../../../../libs/web/components/Button/Button';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

export default function FourOhFour() {
  const { back } = useRouter();

  return (
    <>
      <div className="flex min-h-full flex-col">
        <main className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
          <p className="text-base font-semibold leading-8 text-indigo-600">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10">
            <Button
              theme="outline"
              onClick={back}
              className="text-sm font-semibold leading-7 text-indigo-600"
            >
              <span aria-hidden="true">&larr;</span> Back to home
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}

const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };
