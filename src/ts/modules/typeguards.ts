export function isHTMLElement(value: unknown): value is HTMLElement {
    return value instanceof HTMLElement;
};

export function isAnchor(value: unknown): value is HTMLAnchorElement {
    return value instanceof HTMLAnchorElement;
};

export function isInput(value: unknown): value is HTMLInputElement {
    return value instanceof HTMLInputElement;
};

export function isCheckbox(value: unknown): value is HTMLInputElement {
    return value instanceof HTMLInputElement;
};