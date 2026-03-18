import './sources.css';
import { Source } from '../../../types';

class Sources {
  draw(data: Source[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp')!;

    data.forEach((item: Source) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
      sourceClone.querySelector('.source__item-name')!.textContent = item.name;
      sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id);
      fragment.append(sourceClone);
    });

    document.querySelector('.sources')!.append(fragment);
  }
}

export default Sources;