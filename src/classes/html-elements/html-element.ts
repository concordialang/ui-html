export abstract class HtmlElement {
  protected name?: string | undefined
  protected props: { [key: string]: string | number | boolean }

  constructor(props: any, name?: string) {
    this.props = props
    this.name = name
  }

  public abstract toString(): string
}
