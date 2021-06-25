declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: {
      // for the time being, allow any attribute on jsx element,
      // type libs such as @types/react or similar can also be used for better list of allowed attributes per HTML Element
      [attributeName: string]: string | boolean | number | Object | string[] | null | undefined;
      children?: any;
    };
  }

  interface IntrinsicAttributes {
    /** reference to the rendered HTMLElement will be passed to this function */
    _ref?: Function;
    /** Unique identifier for jsx item in a list */
    _key?: string;
    /** name of the Slot which will be replaced by this element */
    _slot?: string;
  }

  interface ElementChildrenAttribute {
    children: {};
  }
}
