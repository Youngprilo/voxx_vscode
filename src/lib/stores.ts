type Getter<T> = () => T;
type Setter<T> = (val: T) => void;

export class Capsule<T> {
	get value() {
		return this.getter?.();
	}

	set value(val: T) {
		this.setter?.(val);
	}

	constructor(
		private getter: Getter<T>,
		private setter: Setter<T>
	) {}
}
