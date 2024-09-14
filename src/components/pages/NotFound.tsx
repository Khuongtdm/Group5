// project
import { PageContentBlock } from '@/components/elements';

// library
import 'twin.macro';

const Hero = () => {
  return (
    <div>404 Not Found</div>
  );
};

const NotFound = (props: { title: string }) => (
  <PageContentBlock title={props.title}>
    <Hero />
  </PageContentBlock>
);

export default NotFound;
