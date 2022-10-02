// Component interface
interface Component {
  add(component: Component): void;
  remove(component: Component): void;
  show(): void;
}

// Leaf
class Part implements Component {
  private type: string;

  constructor(type: string) {
    this.type = type;
  }
  public add(): void {}
  public remove(): void {}
  public show(): void {
    console.log(`Part: ${this.type}`);
  }
}

// Composite
class Combo implements Component {
  private type: string;
  private children: Component[] = [];

  constructor(type: string) {
    this.type = type;
  }
  public add(component: Component): void {
    this.children.push(component);
  }
  public remove(component: Component): void {
    const targetIndex = this.children.indexOf(component);
    this.children.splice(targetIndex, 1);
  }
  public show(): void {
    console.log(`Combo(${this.type}), includes: `);
    for (const child of this.children) {
      child.show();
    }
  }
}

// Client
const battery = new Part("battery");
const controller = new Part("controller");
const bpb250 = new Combo("battery");
bpb250.add(battery);
bpb250.add(controller);
bpb250.show();
/*
  Combo(battery), includes:
  Part: battery
  Part: controller
 */

const hmi = new Part("HMI");
const eTrekking = new Combo("eTrekking");
eTrekking.add(hmi);
eTrekking.add(bpb250);
eTrekking.show();
/**
  Combo(eTrekking), includes:
  Part: HMI
  Combo(battery), includes:
  Part: battery
  Part: controller
 */
