import { MatTooltipDefaultOptions } from '@angular/material/tooltip';

/** Custom options the configure the tooltip's default show/hide delays. */
export const customTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 1000,
    hideDelay: 200,
    touchendHideDelay: 100,
    touchGestures: 'auto',
};
