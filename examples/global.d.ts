declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: {
      // for the time being, allow any attribute on jsx element,
      // type libs such as @types/react or similar can also be used for better list of allowed attributes per HTML Element
      [attributeName: string]: string | boolean | number | Object | string[] | null | undefined;
      _ref?: Function;
      _key?: string;
      _slot?: string;
      children?: any;
    };
  }

  interface IntrinsicAttributes {
    _ref?: Function;
    _key?: string;
    _slot?: string;
  }

  interface ElementChildrenAttribute {
    children: {};
  }
}