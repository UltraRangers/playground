import "reflect-metadata";

interface IValidator {
  validate(data: any): any
}


function Validator() {
  return function(constructor: Function) {

  }
}

function Validate() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let method = descriptor.value;
    descriptor.value = function () {
      let validations = Reflect.getOwnMetadata('Validation', target, propertyKey);
      for (const validation of validations) {
        validation.validator.validate(arguments[validation.parameterIndex]);
      }
      return method.apply(this, arguments);
    }
  }
}

function Validation(validator: IValidator) {
  return function(target: Object, propertyKey: string, parameterIndex: number) {
    let validations: any[] = Reflect.getOwnMetadata('Validation', target, propertyKey) || [];
    validations.push({ validator, parameterIndex })
    Reflect.defineMetadata('Validation', validations, target, propertyKey);
  }
}

@Validator()
class RequiredValidator implements IValidator {

  public validate(data: any) {
    if (!data) throw new Error('hmm data is required.');
  }
}

@Validator()
class PasswordValidator implements IValidator {

  public validate(data: any) {
    if (!data || data.length < 5) throw new Error('Password length should be greater than 5');
  }
}

class UserService {

  @Validate()
  public create(
    @Validation(new RequiredValidator()) name: string,
    @Validation(new PasswordValidator()) password: string
  ) {
    console.log(`${name} has been created with password: ${password}`);
  }
}

const service = new UserService();
service.create('cedrick', 'password checked');
service.create('cedrick', 'not');
