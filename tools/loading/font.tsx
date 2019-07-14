import React from 'react';
import { CommonInterface, JSXPropsInterface } from '../../interfaces/common.interface';
import { handleSize, JSXProps } from '../../utils/handleJSXProps';
import GradientsFont from '../gradientsFont/gradientsFont';
import { typeReplace } from '../../utils/muguetDash';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';

import './style/loading.css';
import { SizeType } from '../../interfaces/customTypes';


const prefix = 'm-loading';

const customLoadingFontAttrs = [
	'size',
	'children',
	'style',
]

interface FontProps extends CommonInterface { }


class Font extends React.PureComponent<FontProps, any>{

	protected type: string;

	private static readonly defaultProps = {
		size: 'normal'
	}

	handleExtraProps = (): JSXPropsInterface<FontProps> => {
		const iconProps = JSXProps<FontProps>(this.props, customLoadingFontAttrs);
		const { customProps } = iconProps;
		customProps.size = handleSize(customProps.size as SizeType);
		return iconProps;
	}

	handleClassName = (classProps) => {
		const { size, className } = classProps;
		return {
			InnerName: classNames({
				[`${prefix}-type-Font-inner`]: true,
				[`${prefix}-type-Font-inner-${size}`]: true
			}),
			WrapperName: classNames({
				[`${className}`]: className,
				[`${prefix}-type-Font`]: true,
				[`${prefix}-type-Font-${size}`]: typeReplace(size, 'String', false),
			})
		}
	}

	render() {
		const { nativeProps, customProps } = this.handleExtraProps();
		const { InnerName, WrapperName } = this.handleClassName(customProps);
		const mergeStyle = {
			...typeReplace(customProps.size as SizeType, 'Object', {}),
			...typeReplace(customProps.style as Object, 'Object', {})
		}

		return (
			<div
				{...nativeProps}
				className={WrapperName}
				style={mergeStyle}
			>
				<GradientsFont

				>{customProps.children}</GradientsFont>
			</div>
		)
	}
}

polyfill(Font);
export default Font;
