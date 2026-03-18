import Loader from './loader';
import { LoaderOptions } from '../../types';

class AppLoader extends Loader {
  constructor() {
    super(process.env.API_URL, {
      apiKey: process.env.API_KEY,
    } as LoaderOptions);
  }
}

export default AppLoader;
