import {
  Ability,
  AbilityClass,
  AbilityTuple,
  MongoQuery,
  Subject,
} from '@casl/ability';
import { AnyObject } from '@casl/ability/dist/types/types';
import {
  createContextualCan,
  useAbility as useAbilityContext,
} from '@casl/react';
import { ReactElement, createContext, memo } from 'react';

export type AppAbility = Ability;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export const ability = new Ability();
export const AbilityContext =
  createContext<Ability<AbilityTuple<string, Subject>, MongoQuery<AnyObject>>>(
    null
  );
export const Can = createContextualCan(AbilityContext.Consumer);

export function useAbility() {
  return useAbilityContext(AbilityContext);
}

export const AbilityProvider = memo((info: { children: ReactElement }) => {
  return (
    <AbilityContext.Provider value={ability}>
      {info?.children}
    </AbilityContext.Provider>
  );
});
AbilityProvider.displayName = 'AbilityProvider';
