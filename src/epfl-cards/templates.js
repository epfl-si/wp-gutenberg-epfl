const TEMPLATE_A_CARD =
    [ 'core/column', {}, [
        [ 'core/image' ],
        [ 'core/paragraph', { placeholder: 'Enter content...' } ],
    ]
];

export const TEMPLATE_ONE_ENTRIES = [ [ 'core/columns', {}, [TEMPLATE_A_CARD] ] ] ;

export const TEMPLATE_TWO_ENTRIES = [ [ 'core/columns', {}, [TEMPLATE_A_CARD, TEMPLATE_A_CARD] ] ] ;

export const TEMPLATE_OPTIONS = [
	{
		title: 'One Cards',
		icon: <svg />,
		template: TEMPLATE_ONE_ENTRIES,
    },
	{
		title: 'Two Cards',
		icon: <svg />,
		template: TEMPLATE_TWO_ENTRIES,
	},
];

export const TEMPLATE = [ [ 'core/columns', {}, [
    [ 'core/column', {}, [
        [ 'core/image' ],
    ] ],
    [ 'core/column', {}, [
        [ 'core/paragraph', { placeholder: 'Enter side content...' } ],
    ] ],
] ] ];