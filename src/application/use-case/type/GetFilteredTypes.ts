import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import GetFilteredUseCase from '../GetFilteredUseCase';

export default class GetFilteredTypes extends GetFilteredUseCase<Type> {
  constructor(repository: TypeRepository) {
    super(repository);
  }
}
