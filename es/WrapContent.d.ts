import React, { CSSProperties } from 'react';
declare class ResizeObserverContent extends React.Component<{
    isChildrenLayout?: boolean;
    className?: string;
    style?: CSSProperties;
    location?: any;
    children: any;
}, {
    contentHeight: number | undefined;
}> {
    state: {
        contentHeight: number | undefined;
    };
    resize: () => any;
    render(): JSX.Element;
}
export default ResizeObserverContent;
