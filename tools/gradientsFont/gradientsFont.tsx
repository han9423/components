import React, { CSSProperties } from 'react';
import { CommonInterface, JSXPropsInterface } from '../../interfaces/common.interface';
import { handleSize, JSXProps } from '../../utils/handleJSXProps';
import { typeReplace } from '../../utils/muguetDash';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import './style/gradientsFont.css';
import { SizeType } from '../../interfaces/customTypes';

const customGradientsFontAttrs = [
	'size',
	'gradients',
	'children',
	'style',
	'className'
]

interface GradientsFontProps extends CommonInterface {
	gradients?: string;
}


/**
 *
 * @module gradientsFont
 * @example
 * <GradientsFont
 *      gradients={"DeepBlue"}
 *       size={[]}
 *  ></GradientsFont>
 */

class GradientsFont extends React.Component<GradientsFontProps, any> {

	private static readonly defaultProps = {
		gradients: 'PartyBliss',
		size: 'normal'
	}

	handleExtraProps = (): JSXPropsInterface<GradientsFontProps> => {
		const iconProps = JSXProps<GradientsFontProps>(this.props, customGradientsFontAttrs);
		const { customProps } = iconProps;
		customProps.size = handleSize(customProps.size as SizeType);
		return iconProps;
	}

	handleClassName = (classProps) => {
		const { gradients, size, className } = classProps;
		return classNames({
			[`${className}`]: className,
			['m-gradientsFont-default']: true,
			[`m-gradientsFont-size-${size}`]: size,
			[`m-gradients-${gradients}`]: gradients,
		});
	}

	render() {
		const { nativeProps, customProps } = this.handleExtraProps();
		const className = this.handleClassName(customProps);
		const mergeStyle = {
			...typeReplace(customProps.size as Object, 'Object', {}),
			...typeReplace(customProps.style as Object, 'Object', {})
		}

		return (
			<div
				{...nativeProps}
				className={className}
				style={mergeStyle}
			>{customProps.children}</div>
		)
	}
}
polyfill(GradientsFont);
export default GradientsFont;
