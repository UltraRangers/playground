
const ValidatorService = () => {
  return {
    baseValidator: {
      greaterThan: (input: string, constraint: number) => {
        return input.length > constraint;
      },
      lessThan: (input: string, constraint: number) => {
        return input.length < constraint;
      },
      isLength: (input: string, constraint: number) => {
        return input.length === constraint;
      },
      isAlphaNumeric: (input: string) => {
        const regex = /^[a-zA-Z\d+]*$/g;
        return regex.test(input);
      }
    },
    complexValidator: {
      isDuplicateOf: (input: string | number, predicate: (args: any) => boolean) => {
        return predicate(input);
      },
      // bdd: (input: string, ...predicates: { (args: keyof predicates): boolean }[]) => {
      //   console.log('predicates', predicates);
      // }
    }
  }
};

const password = 'asdasda1231';
const isPasswordValid = ValidatorService().baseValidator.isAlphaNumeric(password);

console.log('isPasswordValid', isPasswordValid);

const duplicateId = 1;
const existingIds = [1,2,3,4,5];

const hasDuplicate = ValidatorService().complexValidator
  .isDuplicateOf(duplicateId, (id) => {
    return existingIds.indexOf(id) > -1;
  });
console.log('hasDuplicate', hasDuplicate)

// const test = ValidatorService().complexValidator.bdd(password, 
//     ValidatorService().baseValidator.isLength, 
//     ValidatorService().baseValidator.isAlphaNumeric);


