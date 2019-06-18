class Tracker {

	_storage: Storage
	_stack: string[]

	constructor(message: string) {
		this._storage = window.localStorage
		this._stack = []
    }

	public addToStack(message:string) {
		this._stack.push(message)
	}

	public logStack() {
		console.log(this._stack)
	}

    greet() {
        return "Hello, I'm the tracker";
    }
}
