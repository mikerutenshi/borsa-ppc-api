import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import GetManyUseCase from '../GetManyUseCase';

export default class GetTypes extends GetManyUseCase<Type> {
  constructor(repository: TypeRepository) {
    super(repository);
  }
}
