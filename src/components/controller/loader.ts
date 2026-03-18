import { ApiResponse, GetRespOptions, LoaderOptions, RequestOptions } from '../../types';

class Loader {
  protected baseLink: string | undefined;
  protected options: LoaderOptions;

  constructor(baseLink: string | undefined, options: LoaderOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: GetRespOptions,
    callback: (data: ApiResponse) => void = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    return res;
  }

  makeUrl(options: RequestOptions, endpoint: string): string {
    const urlOptions: LoaderOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;
    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });
    return url.slice(0, -1);
  }

  load(
    method: string,
    endpoint: string,
    callback: (data: ApiResponse) => void,
    options: RequestOptions = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: ApiResponse) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;