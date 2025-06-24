import aboutImage from '@/assets/images/about.jpg';
import { Component } from '@/components/base/component';
import { ABOUT_PAGE_TEXT, PAGE_TITLES } from '@/constants/constants';
import { AboutFeature, TechStack } from '@/types/enums';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export class AboutPage extends Component {
  constructor() {
    super({ tag: 'main', className: 'about' });
    this.render();
  }

  private static createFeaturesList(): HTMLElement {
    const featuresTitle = new ElementBuilder({
      tag: 'h2',
      className: ['about__subtitle'],
      textContent: ABOUT_PAGE_TEXT.featuresTitle,
    }).getElement();

    const featuresList = new ElementBuilder({
      tag: 'ul',
      className: ['about__feature-list'],
    }).getElement();

    for (const feature of Object.values(AboutFeature)) {
      const listItem = new ElementBuilder({
        tag: 'li',
        className: ['about__feature-item'],
        textContent: ABOUT_PAGE_TEXT.features[feature],
      }).getElement();
      featuresList.append(listItem);
    }

    const container = new ElementBuilder({
      tag: 'div',
      className: ['about__features-container'],
    }).getElement();

    container.append(featuresTitle, featuresList);
    return container;
  }

  private static createTechStack(): HTMLElement {
    const stackTitle = new ElementBuilder({
      tag: 'h2',
      className: ['about__subtitle'],
      textContent: ABOUT_PAGE_TEXT.stackTitle,
    }).getElement();

    const stackIconsContainer = new ElementBuilder({
      tag: 'div',
      className: ['about__stack-icons-container'],
    }).getElement();

    for (const tech of Object.values(TechStack)) {
      const iconContainer = new ElementBuilder({
        tag: 'div',
        className: ['about__stack-item'],
      }).getElement();

      const icon = new ImageBuilder({
        tag: 'img',
        className: ['about__stack-icon'],
        source: `./assets/svg/${tech}.svg`,
        alt: `${ABOUT_PAGE_TEXT.techStack[tech]} icon`,
      }).getElement();

      iconContainer.append(icon);
      stackIconsContainer.append(iconContainer);
    }

    const container = new ElementBuilder({
      tag: 'div',
      className: ['about__stack-container'],
    }).getElement();

    container.append(stackTitle, stackIconsContainer);
    return container;
  }

  protected render(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: ['about__title'],
      textContent: PAGE_TITLES.about,
    }).getElement();

    const contentContainer = new ElementBuilder({
      tag: 'div',
      className: ['about__container'],
    }).getElement();

    const heroImage = new ImageBuilder({
      tag: 'img',
      className: ['about__image'],
      source: aboutImage,
      alt: 'Two people chatting behind the PC',
    }).getElement();

    const introductionText = new ElementBuilder({
      tag: 'p',
      className: ['about__introduction'],
      textContent: ABOUT_PAGE_TEXT.introductionText,
    }).getElement();

    contentContainer.append(
      heroImage,
      introductionText,
      AboutPage.createFeaturesList(),
      AboutPage.createTechStack()
    );

    this.container.append(title, contentContainer);
  }
}
