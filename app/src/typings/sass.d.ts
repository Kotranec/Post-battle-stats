// scss.d.ts
declare module '*.css' {
    const content: { [className: string]: string; };
    export default content;
  }
  declare module '*.sass' {
    const content: { [className: string]: string; };
    export default content;
  }