import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsProductImagePath implements ValidatorConstraintInterface {
  validate(path: string) {
    const regex = /^product-covers\/\d{13}-[a-zA-Z0-9]+\.(jpg)$/;
    return typeof path === "string" && regex.test(path);
  }

  defaultMessage() {
    return "Path must be in the format: product-covers/{13-digit-number}-{alphanumeric-name}.{jpg}";
  }
}

// Decorator function
export function isProductImagePath(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isProductImagePath",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsProductImagePath,
    });
  };
}
