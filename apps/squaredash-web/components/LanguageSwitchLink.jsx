import Link from 'next/link';
import { useRouter } from 'next/router';

import languageDetector from '../lib/languageDetector';

const LanguageSwitchLink = ({ locale, ...rest }) => {
  const router = useRouter();

  let href = rest.href || router.asPath;
  let pName = router.pathname;
  Object.keys(router.query).forEach((k) => {
    if (k === 'locale') {
      pName = pName.replace(`[${k}]`, locale);
      return;
    }
    pName = pName.replace(`[${k}]`, router.query[k]);
  });
  if (locale) {
    href = rest.href ? `/${locale}${rest.href}` : pName;
  }

  return (
    <Link type="tab" href={href} onClick={() => languageDetector.cache(locale)}>
      <button style={{ fontSize: 'small' }}>{locale}</button>
    </Link>
  );
};

export default LanguageSwitchLink;
