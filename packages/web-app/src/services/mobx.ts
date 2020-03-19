/* eslint-disable */

import { observer as mobxObserver } from 'mobx-react-lite';

export function observer<P>(props: P): any {
    return mobxObserver(props as any);
}
