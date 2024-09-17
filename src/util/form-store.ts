import { makeAutoObservable } from "mobx";

export class FormStore<T extends Record<string, unknown>> {
  private _formState: T;

  private readonly _initialState: T;

  public constructor({ initialState }: { initialState: T }) {
    makeAutoObservable(this);
    this._formState = initialState;
    this._initialState = initialState;
  }

  public reset() {
    this._formState = this._initialState;
  }

  public setFormState(state: T) {
    this._formState = state;
  }

  public setValue(key: keyof T, value: T[typeof key]) {
    this._formState[key] = value;
  }

  public get formState() {
    return this._formState;
  }

  public set formState(state: T) {
    this._formState = state;
  }
}
