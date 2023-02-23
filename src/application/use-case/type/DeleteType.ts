import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import DeleteGenericTableUseCase from '../DeleteGenericTableUseCase';

export default class DeleteType extends DeleteGenericTableUseCase<Type> {
  constructor(repository: TypeRepository) {
    super(repository);
  }
}
