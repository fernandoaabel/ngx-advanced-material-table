import { MatTooltipDefaultOptions } from '@angular/material/tooltip';

/** Custom options the configure the tooltip's default show/hide delays. */
export const customTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 1000,
    hideDelay: 200,
    touchendHideDelay: 100,
    // TODO(Fernando Abel): https://github.com/angular/components/issues/8817
    // touchGestures: 'auto' - Available for Angular 9+
};
