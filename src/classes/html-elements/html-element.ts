export abstract class HtmlElement {
  protected props: { [key: string]: string | number | boolean }

  constructor(props: any) {
    this.props = props
  }

  public abstract toString(): string
}
