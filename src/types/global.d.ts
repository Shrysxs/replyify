declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

declare module 'react' {
  interface Dispatch<A> {
    (value: A): void;
  }
  
  type SetStateAction<S> = S | ((prevState: S) => S);
  
  interface MutableRefObject<T> {
    current: T;
  }
  
  interface RefObject<T> {
    readonly current: T | null;
  }
  
  function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  function useRef<T>(initialValue: T): MutableRefObject<T>;
  function useRef<T>(initialValue: T | null): RefObject<T>;
  function useRef<T = undefined>(): MutableRefObject<T | undefined>;
  
  interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }
  
  interface SyntheticEvent<T = Element, E = Event> {
    nativeEvent: E;
    currentTarget: T;
    target: EventTarget & T;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    timeStamp: number;
    type: string;
  }
  
  namespace React {
    export { useState, useRef, ChangeEvent, SyntheticEvent, Dispatch, SetStateAction, MutableRefObject, RefObject };
  }
}

declare const process: {
  env: {
    [key: string]: string | undefined;
    NODE_ENV: 'development' | 'production' | 'test';
    GROQ_API_KEY?: string;
    GROQ_KEY?: string;
    GROQ_MODEL?: string;
    GROQ_TIMEOUT_MS?: string;
    GROQ_MAX_TOKENS?: string;
    GROQ_TEMPERATURE?: string;
    GROQ_STOP?: string;
    NEXT_PUBLIC_SITE_URL?: string;
    REPLYIFY_CACHE_TTL_MS?: string;
    ALLOW_ORIGIN?: string;
  };
};
