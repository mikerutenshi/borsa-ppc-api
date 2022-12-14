import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import DeleteUseCase from '../DeleteUseCase';

export default class DeleteType extends DeleteUseCase<Type> {
  constructor(repository: TypeRepository) {
    super(repository, 'type');
  }
}
