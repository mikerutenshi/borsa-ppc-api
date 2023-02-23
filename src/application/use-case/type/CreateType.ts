import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import CreateiGenericTableUseCase from '../CreateGenericTableUseCase';

export default class CreateType extends CreateiGenericTableUseCase<Type> {
  constructor(repository: TypeRepository) {
    super(repository);
  }
}
