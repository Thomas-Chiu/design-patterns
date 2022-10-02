// Component interface
abstract class Part {
  protected parent!: Part | null;
  protected type: string;

  constructor(type: string) {
    this.type = type;
  }

  public setParent(parent: Part | null) {
    this.parent = parent;
  }

  public add(component: Part): void {}

  public remove(component: Part): void {}

  public abstract getPartType(): string;
}

// Leaf
class SinglePart extends Part {
  public getPartType(): string {
    return this.type!;
  }
}

// Composite
class ComboPart extends Part {
  protected children: Part[] = [];

  public add(component: Part): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Part): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);
    component.setParent(null);
  }

  public getPartType(): string {
    const results: string[] = [];
    for (const child of this.children) {
      results.push(child.getPartType());
    }
    return `${this.type}(${results.join(" + ")})`;
  }
}

// Client
const whatIsThis = (component: Part) => {
  console.log(`RESULT: ${component.getPartType()}`);
};
const battery = new SinglePart("battery");
const controller = new SinglePart("controller");
const bpb250 = new ComboPart("comboPart");
bpb250.add(battery);
bpb250.add(controller);
whatIsThis(battery); // RESULT: battery
whatIsThis(controller); // RESULT: controller
whatIsThis(bpb250); // RESULT: comboPart(battery + controller)

const hmi = new SinglePart("hmi");
const eTrekking = new ComboPart("Etrekking");
eTrekking.add(bpb250);
eTrekking.add(hmi);
whatIsThis(eTrekking); // RESULT: Etrekking(comboPart(battery + controller) + hmi)
