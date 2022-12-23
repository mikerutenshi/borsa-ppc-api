import UseCase from '../UseCase';

export default class DeleteType extends UseCase<number, void> {
  execute(id: number, table: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
