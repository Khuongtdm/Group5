import 'twin.macro';
import { useEffect } from 'react';

const PageContentBlock = (props: { title: string; children: any }) => {
  useEffect(() => {
    document.title = props.title + ' - Blaze' || '';
  }, [props.title]);
  return <div tw="pt-14">{props.children}</div>;
};

export default PageContentBlock;
