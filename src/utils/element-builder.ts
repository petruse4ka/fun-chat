import type { ElementParameters } from '@/types/interfaces';

export class ElementBuilder {
  protected element: HTMLElement;

  constructor(parameters: ElementParameters) {
    this.element = document.createElement(parameters.tag);
    this.applyCssClasses(parameters.className);
    this.applyTextContent(parameters.textContent);
    this.applyCallback(parameters.callback, parameters.eventType);
    this.applyAttributes(parameters.attributes);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public removeElement(): void {
    this.element.remove();
  }

  private applyCssClasses(className: ElementParameters['className']): void {
    if (className) {
      if (Array.isArray(className)) {
        this.element.classList.add(...className);
      } else {
        this.element.classList.add(className);
      }
    }
  }

  private applyTextContent(text?: string): void {
    if (text) {
      this.element.textContent = text;
    }
  }

  private applyAttributes(attributes: ElementParameters['attributes']): void {
    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        this.element.setAttribute(key, value);
      }
    }
  }

  private applyCallback(
    callback?: ElementParameters['callback'],
    eventType: ElementParameters['eventType'] = 'click'
  ): void {
    if (callback) {
      this.element.addEventListener(eventType, callback);
    }
  }
}
