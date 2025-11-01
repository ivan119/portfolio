declare module 'typewriter-effect/dist/core' {
  interface TypewriterOptions {
    loop?: boolean;
    delay?: number;
    deleteSpeed?: number;
    cursor?: string;
    cursorChar?: string;
    cursorBlinking?: boolean;
    stringSplitter?: (str: string) => string[];
    onCreateTextNode?: (char: string, node: Node) => void;
    onRemoveNode?: (node: Node, emptyChar: string) => void;
    onTypingPaused?: (arrayPos: number, realCharPos: number) => void;
    onTypingResumed?: (arrayPos: number, realCharPos: number) => void;
    onStringTyped?: (arrayPos: number) => void;
    onLastStringBackspaced?: () => void;
    onTypingEnd?: (self: TypewriterInstance) => void;
    onKeydown?: (character: string, event: KeyboardEvent) => void;
    onKeyup?: (character: string, event: KeyboardEvent) => void;
  }

  interface TypewriterInstance {
    typeString(str: string): TypewriterInstance;
    pauseFor(ms: number): TypewriterInstance;
    deleteChars(amount: number): TypewriterInstance;
    deleteAll(speed?: number): TypewriterInstance;
    callFunction(fn: (this: TypewriterInstance) => void, thisArg?: any): TypewriterInstance;
    pauseForRange(min: number, max: number): TypewriterInstance;
    changeDeleteSpeed(speed: number): TypewriterInstance;
    changeDelay(delay: number): TypewriterInstance;
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
  }

  class Typewriter {
    constructor(element: HTMLElement, options?: TypewriterOptions);
    typeString(str: string): TypewriterInstance;
    pauseFor(ms: number): TypewriterInstance;
    deleteChars(amount: number): TypewriterInstance;
    deleteAll(speed?: number): TypewriterInstance;
    callFunction(fn: (this: TypewriterInstance) => void, thisArg?: any): TypewriterInstance;
    pauseForRange(min: number, max: number): TypewriterInstance;
    changeDeleteSpeed(speed: number): TypewriterInstance;
    changeDelay(delay: number): TypewriterInstance;
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
  }

  export default Typewriter;
  export type { TypewriterInstance, TypewriterOptions };
}

