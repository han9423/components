export type ShapeType = 'fillet'
	| 'circle'
	| 'rect'
	| 'square';

export type TipsType = 'danger'
	| 'success'
	| 'info'
	| 'warning'
	| 'loading'
	| 'notice';

export type SizeType = 'tiny'
	| 'small'
	| 'normal'
	| 'large'
	| 'title'
	| [number | string, number | string]
	| React.CSSProperties
	| [string]
	| [number];

export type PositionType = 'topLeft'
	| 'top'
	| 'left'
	| 'right'
	| 'bottom'
	| 'topRight'
	| 'bottomRight'
	| 'bottomLeft'
	| [string | number, string | number] | [string | number];

export type effectType = 'click-static'
	| 'click-down'
	| 'click-left'
	| 'click-top'
	| 'click-right'
	| 'click-focus'
	| 'click-static'
	| 'hover-down'
	| 'hover-left'
	| 'hover-right'
	| 'hover-top'
	| 'hover-static';

