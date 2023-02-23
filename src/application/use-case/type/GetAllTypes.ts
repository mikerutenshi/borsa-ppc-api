import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import GetAllGenericTableUseCase from '../GetAllGenericTableUseCase';

export default class GetAllTypes extends GetAllGenericTableUseCase<Type> {
  constructor(repository: TypeRepository) {
    super(repository);
  }
}
