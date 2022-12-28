import Table from '../../../model/Table';
import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateType extends UpdateUseCase<Type> {
  constructor(repository: TypeRepository, uniqueVal: string) {
    super(repository, new Table('type', 'name', uniqueVal));
  }
}
