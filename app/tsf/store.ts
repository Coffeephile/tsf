export class Store<State, Action> {
  state: State;
  private listeners: ((State) => any)[] = [];
  private reducer: (State, Action) => State;
  constructor(initialState, reducer){
    this.state = initialState;
    this.reducer = reducer;
  }
  dispatch(action: Action){
    this.state = this.reducer(this.state, action);
    this.listeners.map((listener) => {
      listener(this.state);
    })
  }
  
  subscribe(cb){
    this.listeners.push(cb);
  }
}

export const createStore = <S, A>(
  initialState: S,
  reducer: (S, A) => S) => {
  return new Store<S, A>(initialState, reducer);
}