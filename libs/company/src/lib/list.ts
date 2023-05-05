import { List } from '@squaredash/shared/interfaces';

import { CompanyListRow, CompanySearchOptions } from './interfaces';
import * as companyRepository from './repository/company';

export async function list(
  searchOptions: CompanySearchOptions
): Promise<List<CompanyListRow>> {
  return companyRepository.list(searchOptions);
}
