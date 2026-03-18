import AppLoader from './appLoader';
import { NewsResponse, SourcesResponse } from '../../types';

class AppController extends AppLoader {
  getSources(callback: (data: SourcesResponse) => void): void {
    super.getResp(
      { endpoint: 'sources' },
      callback as (data: import('../../types').ApiResponse) => void
    );
  }

  getNews(e: MouseEvent, callback: (data: NewsResponse) => void): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');

        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId ?? '');
          super.getResp(
            {
              endpoint: 'everything',
              options: { sources: sourceId ?? '' },
            },
            callback as (data: import('../../types').ApiResponse) => void
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;