/**
 * jest-axe ships no type declarations of its own, and the published @types/jest-axe still
 * describes its 3.x API. Only the two entry points the accessibility tests use are declared
 * here, which keeps the repo free of a types-only dependency.
 */
declare module 'jest-axe' {
  export function axe(element: Element | Document): Promise<unknown>;
  export const toHaveNoViolations: jest.ExpectExtendMap;
}

declare namespace jest {
  interface Matchers<R> {
    /** Asserts that an axe run produced no accessibility violations */
    toHaveNoViolations(): R;
  }
}
