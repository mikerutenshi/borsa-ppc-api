import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import UpdateGenericTableUseCase from '../UpdateGenericTableUseCase';

export default class UpdateType extends UpdateGenericTableUseCase<Type> {
  constructor(repository: TypeRepository) {
    super(repository);
  }
}
