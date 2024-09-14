import 'twin.macro';
import { useEffect } from 'react';

const PageContentBlock = (props: { title: string; children: any }) => {
  useEffect(() => {
    document.title = props.title + ' - Blaze' || '';
  }, [props.title]);
  return props.children;
};

export default PageContentBlock;
