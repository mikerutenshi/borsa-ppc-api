import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import GetOneGenericTableUseCase from '../GetOneGenericTableUseCase';

export default class GetType extends GetOneGenericTableUseCase<Type> {
  constructor(repository: TypeRepository) {
    super(repository);
  }
}
