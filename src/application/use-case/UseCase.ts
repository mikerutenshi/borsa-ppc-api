export default abstract class UseCase<P, T> {
  abstract execute(param: P, ...args: any[]): Promise<T>;
}
