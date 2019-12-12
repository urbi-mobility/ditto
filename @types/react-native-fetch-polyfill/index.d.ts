declare module "react-native-fetch-polyfill" {
  interface PolyfilledRequestInit {
    body?: any;
    credentials?: RequestCredentials_;
    headers?: HeadersInit_;
    integrity?: string;
    keepalive?: boolean;
    method?: string;
    mode?: RequestMode_;
    referrer?: string;
    window?: any;
    timeout?: number;
  }

  const fetch: (
    url: Request | string,
    init: PolyfilledRequestInit
  ) => Promise<Response>;

  export default fetch;
}
