import Table from '../../../model/Table';
import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateType extends CreateUseCase<Type> {
  constructor(repository: TypeRepository, uniqueVal: string) {
    super(repository, new Table('type', 'name', uniqueVal));
  }
}
