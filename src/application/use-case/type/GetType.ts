import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import GetOneUseCase from '../GetOneUseCase';

export default class GetType extends GetOneUseCase<Type> {
  constructor(repository: TypeRepository) {
    super(repository);
  }
}
