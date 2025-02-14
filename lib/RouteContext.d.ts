/// <reference types="react" />
import { BreadcrumbListReturn } from './utils/getBreadcrumbProps';
import { Settings } from './defaultSettings';
import { MenuDataItem } from './typings';
export interface RouteContextType extends Partial<Settings> {
    breadcrumb?: BreadcrumbListReturn;
    menuData?: MenuDataItem[];
    isMobile?: boolean;
    collapsed?: boolean;
    isChildrenLayout?: boolean;
}
declare const routeContext: React.Context<RouteContextType>;
export default routeContext;
