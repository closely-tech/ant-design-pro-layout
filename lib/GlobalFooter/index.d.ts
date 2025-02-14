import './index.less';
import React from 'react';
import { WithFalse } from '../typings';
export interface GlobalFooterProps {
    links?: WithFalse<{
        key?: string;
        title: React.ReactNode;
        href: string;
        blankTarget?: boolean;
    }[]>;
    copyright?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}
declare const _default: ({ className, links, copyright, style }: GlobalFooterProps) => JSX.Element | null;
export default _default;
