import React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import { typeReplace } from '../../utils/muguetDash';
import { handleSize, JSXProps } from '../../utils/handleJSXProps';
import { JSXPropsInterface } from '../../interfaces/common.interface';
import { SizeType } from '../../interfaces/customTypes';
import { MessageProps, MsgParams } from './msg';
import Loading from '../../tools/loading/loading';
import computedStyle from 'computed-style';
import Flex from '../../layout/flex/flex';
import Icon from '../../tools/icon/icon';
import { prefix, MSG_ID } from './message';
import './style/message.css';

const customMsgTemplateAttr = [
	'icon',
	'type',
	'content',
	'options',
	'gradients',
	'duration',
	'container'
]

interface MsgTemplateProps extends MessageProps, MsgParams { }

class MessageTemplate extends React.Component<MsgTemplateProps, any> {
	refDiv: React.RefObject<{}>;
	tempSaver: MsgTemplateProps;
	constructor(props) {
		super(props);
		this.refDiv = React.createRef();
	}

	componentDidMount() {
		const msg_container = document.getElementById(MSG_ID) as HTMLElement;
		const width = computedStyle(msg_container, 'width');
		const { options } = this.tempSaver;

		if ('right' === options!.place) {
			msg_container.style.marginRight = '35px';
		} else if ('left' === options!.place) {
			msg_container.style.marginLeft = '35px';
		} else {
			msg_container.style.marginLeft = - parseInt(width) / 2 + 'px';
		}
	}

	handleExtraProps = (): JSXPropsInterface<MsgTemplateProps> => {
		const msgTemplateProps = JSXProps<MsgTemplateProps>(this.props, customMsgTemplateAttr)
		const { customProps } = msgTemplateProps;
		customProps.size = handleSize(customProps.size as SizeType);
		return msgTemplateProps;
	}

	handleClassName = (classProps) => {
		const {
			size,
			gradients,
			className
		} = classProps.options;
		return classNames({
			[`${prefix}-default`]: true,
			[`${classNames(className)}`]: className,
			[`m-gradients-${gradients ? gradients : 'CloudyKnoxville'}`]: true,
			[`${prefix}-size-${size}`]: typeReplace(size as SizeType, 'String', false),
		});
	}

	handleType = (props): React.ReactElement => {
		const { type, options } = props;
		const commonStyle = { marginRight: '6px' };

		if (options.icon) {
			return <Icon
				style={commonStyle}
				src={options.icon}></Icon>;
		} else {
			switch (type) {
				case 'success': return (
					<Icon
						style={commonStyle}
						src={require('../../assets/icons/local/success.svg')}></Icon>
				);
				case 'info': return (
					<Icon
						style={commonStyle}
						src={require('../../assets/icons/local/info.svg')}></Icon>
				);
				case 'warning': return (
					<Icon
						style={commonStyle}
						src={require('../../assets/icons/local/warning.svg')}></Icon>
				);
				case 'danger': return (
					<Icon
						style={commonStyle}
						src={require('../../assets/icons/local/danger.svg')}></Icon>
				);
				case 'loading': return (
					<Loading.Hoop
						size={['25px', '25px']}
					></Loading.Hoop>
				);
				default: return (
					<Icon
						style={commonStyle}
						src={require('../../assets/icons/local/info.svg')}></Icon>
				);
			}
		}
	}

	render() {
		const { nativeProps, customProps } = this.handleExtraProps();
		const className = this.handleClassName(customProps);
		const mergeStyle = {
			...typeReplace(customProps.size as Object, 'Object', {}),
			...typeReplace(customProps.style as Object, 'Object', {})
		}

		this.tempSaver = customProps!;

		return (
			<div
				{...nativeProps}
				className={className}
				style={mergeStyle}
				ref={this.refDiv as React.RefObject<any>}
			>
				<Flex.Avg>
					{this.handleType(customProps)}
					<div
						className='m-message-content'
					>{customProps.content}</div>
				</Flex.Avg>
			</div>
		)
	}
}
polyfill(MessageTemplate);
export default MessageTemplate;
