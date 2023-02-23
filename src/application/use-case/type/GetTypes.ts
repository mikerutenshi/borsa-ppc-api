import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import GetManyGenericTableUseCase from '../GetManyGenericTableUseCase';

export default class GetTypes extends GetManyGenericTableUseCase<Type> {
  constructor(repository: TypeRepository) {
    super(repository);
  }
}
