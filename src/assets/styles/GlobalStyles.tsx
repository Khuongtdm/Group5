// react
import { Fragment } from 'react';

// library
import { Global, css } from '@emotion/react';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css({
	html: { ...tw`antialiased bg-body` },
	body: { ...tw`bg-zinc-900` },
});

const GlobalStyles = () => (
	<Fragment>
		<BaseStyles />
		<Global styles={customStyles} />
	</Fragment>
);

export default GlobalStyles;
